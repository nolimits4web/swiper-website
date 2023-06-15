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
      .filter((item) =>
        item.comment && item.comment.shortText
          ? !item.comment.shortText.toLowerCase().includes('internal')
          : true
      )
      .filter((item) => !ignoreOptions.includes(item.name))
      .filter((item) => {
        if (item.type && item.type.name && ignoreTypes.includes(item.type.name))
          return false;
        if (item.type && item.type.types) {
          let inIgnored = false;
          item.type.types.forEach((type) => {
            if (ignoreTypes.includes(type.name)) inIgnored = true;
          });
          if (inIgnored) return false;
        }
        return true;
      }) || [];
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
      return `${typeObj.elementType.name}[]`;
    }
    if (typeObj.type === 'union') {
      const types = [];
      typeObj.types.forEach(({ elementType, name, type, value }) => {
        if (elementType)
          types.push(`${elementType.name}${type === 'array' ? '[]' : ''}`);
        else if (value) types.push(`'${value}'`);
        else if (value === null) types.push(`null`);
        else types.push(name);
      });
      return types.join(`{' | '}`);
    }
    if (typeObj.type === 'reflection' || (!item.type && item.signatures)) {
      const signatures = item.signatures;
      if (signatures) {
        const args = (signatures[0].parameters || [])
          .map((param) => `<span className="text-primary">${param.name}</span>`)
          .join(', ');
        return `function(${args || ''})`;
      }
      return `object`;
    }

    if (typeObj.type === 'array') {
      if (typeObj && typeObj.elementType && typeObj.elementType.name) {
        return `<span className="text-primary">${typeObj.elementType.name}[]</span>`;
      }
    }
    if (item.name === 'onAny') {
      return 'function';
    }
    return typeObj.name || '';
  };

  const defaultValue = (item) => {
    return (item.default_value || '').replace(
      /[{}]/g,
      (bracket) => `{'${bracket}'}`
    );
  };
  let parentType;
  if (parentTypesData) {
    // look for typesName in parent
    parentTypesData.forEach((item) => {
      if (item.type && item.type.name === typesName) {
        parentType = item;
      } else if (item.type && item.type.types) {
        item.type.types.forEach((type) => {
          if (type.name === typesName) parentType = item;
        });
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
