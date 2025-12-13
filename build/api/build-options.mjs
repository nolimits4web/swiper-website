import fs from 'fs-extra';
import path from 'path';
import * as url from 'url';
import description from './description.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const buildOptions = async (
  typesName,
  typesData,
  ignoreOptions = [],
  ignoreTypes = [],
  parentTypesData
) => {
  const items =
    (typesData[typesName] || [])
      .filter((item) => {
        if (item.comment) {
          if (item.comment.summary && Array.isArray(item.comment.summary)) {
            const text = item.comment.summary
              .map((s) => (s.kind === 'text' || s.kind === 'code' ? s.text : ''))
              .join('');
            if (text.toLowerCase().includes('internal')) return false;
          } else if (item.comment.shortText) {
            // Old format fallback
            if (item.comment.shortText.toLowerCase().includes('internal')) return false;
          }
        }
        return true;
      })
      .filter((item) => !ignoreOptions.includes(item.name))
      // Note: We don't filter by ignoreTypes here because we want to show
      // top-level parameters that reference module types (like navigation, grid, etc.)
      // even if we don't show their nested properties. The ignoreTypes is only used
      // to prevent nested property rendering when parentTypesData is provided.
      || [];
  items.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  const type = (item = {}) => {
    const typeObj = item.type || {};
    if (typeObj.type === 'array' && typeObj.elementType) {
      const elementName = typeObj.elementType.name || (typeObj.elementType.target?.qualifiedName) || '';
      return `${elementName}[]`;
    }
    if (typeObj.type === 'union') {
      const types = [];
      typeObj.types.forEach((typeItem) => {
        const typeName = typeItem.name || (typeItem.target?.qualifiedName) || '';
        const elementType = typeItem.elementType;
        const value = typeItem.value;
        const itemType = typeItem.type;

        if (elementType) {
          const elementName = elementType.name || (elementType.target?.qualifiedName) || '';
          types.push(`${elementName}${itemType === 'array' ? '[]' : ''}`);
        } else if (value !== undefined) {
          if (value === null) types.push(`null`);
          else types.push(`'${value}'`);
        } else if (typeName) {
          types.push(typeName);
        }
      });
      return types.join(`{' | '}`);
    }
    if (typeObj.type === 'reflection' || (!item.type && item.signatures)) {
      // Check for signatures in multiple locations
      let signatures = null;

      // 1. Direct signatures (for methods)
      if (item.signatures && item.signatures.length > 0) {
        signatures = item.signatures;
      }
      // 2. Signatures in type declaration (for function type properties)
      else if (typeObj.declaration && typeObj.declaration.signatures && typeObj.declaration.signatures.length > 0) {
        signatures = typeObj.declaration.signatures;
      }

      if (signatures && signatures[0] && signatures[0].parameters) {
        const args = signatures[0].parameters
          .map((param) => {
            // Get parameter type name (not the parameter name, but the type)
            const paramType = param.type;
            const typeName = paramType?.name || (paramType?.target?.qualifiedName) || param.name || 'any';
            return typeName;
          })
          .join(', ');
        return `function(${args || ''})`;
      }
      return `object`;
    }

    if (typeObj.type === 'array') {
      const elementType = typeObj.elementType;
      if (elementType) {
        const elementName = elementType.name || (elementType.target?.qualifiedName) || '';
        if (elementName) {
          return `<span className="text-primary">${elementName}[]</span>`;
        }
      }
    }

    // Handle reference types
    if (typeObj.type === 'reference') {
      return typeObj.name || (typeObj.target?.qualifiedName) || '';
    }

    if (item.name === 'onAny') {
      return 'function';
    }
    return typeObj.name || '';
  };

  const defaultValue = (item) => {
    if (!item.default_value) return '';
    let value = item.default_value;

    // Check if the type is a string
    const typeObj = item.type || {};
    const isStringType =
      typeObj.type === 'intrinsic' && typeObj.name === 'string' ||
      typeObj.type === 'union' && typeObj.types?.some(t => (t.name || t.target?.qualifiedName) === 'string');

    // Add quotes around string default values if not already quoted
    if (isStringType && value && !value.startsWith("'") && !value.startsWith('"')) {
      value = `'${value}'`;
    }

    // Escape JSX brackets
    value = value.replace(/[{}]/g, (bracket) => `{'${bracket}'}`);
    return value;
  };
  let parentType;
  if (parentTypesData) {
    // look for typesName in parent
    parentTypesData.forEach((item) => {
      if (item.type) {
        // Check direct type name
        const typeName = item.type.name || (item.type.target?.qualifiedName) || '';
        if (typeName === typesName) {
          parentType = item;
        } else if (item.type.type === 'union' && item.type.types) {
          // Check union types
          item.type.types.forEach((type) => {
            const unionTypeName = type.name || (type.target?.qualifiedName) || '';
            if (unionTypeName === typesName) {
              parentType = item;
            }
          });
        }
      }
    });
  }

  const content = `
export const ${typesName} = () => {
  return (
    <div className="table-wrap">
    <table className="params-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${
          parentType
            ? `
          <tr className="table-border-t">
            <td className="w-1/6 text-primary font-mono">
              <a href="#param-${parentType.name}" id="param-${
                parentType.name
              }">${parentType.name}</a>
            </td>
            <td className="w-1/6 text-green font-mono">
              ${type(parentType)}
            </td>
            <td className="w-1/6 text-orange font-mono">
              ${defaultValue(parentType)}
            </td>
            <td className="w-3/6 space-y-2">${description(parentType)}</td>
          </tr>
          <tr className="params-table-nested-open">
            <td colSpan="4">{'{'}</td>
          </tr>
        `
            : ''
        }
        ${items
          .map(
            (item) => `
          <tr className="table-border-t ${
            parentType ? 'params-table-nested-row' : ''
          }">
            <td className="w-1/6 text-primary font-mono">
              <a href="#param-${parentType ? `${parentType.name}-` : ''}${
              item.name
            }" id="param-${parentType ? `${parentType.name}-` : ''}${
              item.name
            }">${item.name}</a>
            </td>
            <td className="w-1/6 text-green font-mono">
              ${type(item)}
            </td>
            <td className="w-1/6 text-orange font-mono">
              ${defaultValue(item)}
            </td>
            <td className="w-3/6 space-y-2">${description(item)}</td>
          </tr>
        `
          )
          .join('')}
          ${
            parentType
              ? `
            <tr className="params-table-nested-close">
              <td colSpan="4">{'}'}</td>
            </tr>
          `
              : ''
          }
      </tbody>
    </table>
    </div>
  )
}
`;
  await fs.writeFile(
    path.join(__dirname, `../../src/components/api/${typesName}.js`),
    content
  );
};

export default buildOptions;
