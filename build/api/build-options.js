const fs = require('fs-extra');
const path = require('path');
const description = require('./description');

const buildOptions = async (
  typesName,
  typesData,
  ignoreOptions = [],
  ignoreTypes = [],
  parentTypesData
) => {
  items =
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

  const type = (item = {}) => {
    const typeObj = item.type || {};
    if (typeObj.type === 'array' && typeObj.elementType) {
      return `${typeObj.elementType.name}[]`;
    }
    if (typeObj.type === 'union') {
      const types = [];
      typeObj.types.forEach(({ name, value, type, elementType }) => {
        if (value) types.push(`'${value}'`);
        else if (name) types.push(name);
        else if (type === 'array' && elementType)
          types.push(`${elementType.name}[]`);
      });
      return types.join(`{' | '}`);
    }
    if (typeObj.type === 'reflection') {
      if (typeObj && typeObj.declaration && typeObj.declaration.signatures) {
        const args = (typeObj.declaration.signatures[0].parameters || [])
          .map((param) => `<span className="text-red-700">${param.name}</span>`)
          .join(', ');
        return `function(${args || ''})`;
      }
      return `object`;
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
    <table className="table-fixed params-table">
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
          <tr className="border-t">
            <td className="w-1/6 text-red-700 font-mono font-semibold">
              ${parentType.name}
            </td>
            <td className="w-1/6 text-green-700 font-mono font-semibold">
              ${type(parentType)}
            </td>
            <td className="w-1/6 text-red-700 font-mono font-semibold">
              ${defaultValue(parentType)}
            </td>
            <td className="w-3/6 space-y-2">${description(parentType)}</td>
          </tr>
          <tr className="params-table-nested-open">
            <td colSpan="4" className="font-semibold">{'{'}</td>
          </tr>
        `
            : ''
        }
        ${items
          .map(
            (item) => `
          <tr className="border-t ${
            parentType ? 'params-table-nested-row' : ''
          }">
            <td className="w-1/6 text-red-700 font-mono font-semibold">
              ${item.name}
            </td>
            <td className="w-1/6 text-green-700 font-mono font-semibold">
              ${type(item)}
            </td>
            <td className="w-1/6 text-red-700 font-mono font-semibold">
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
              <td colSpan="4" className="font-semibold">{'}'}</td>
            </tr>
          `
              : ''
          }
      </tbody>
    </table>
  )
}
`;
  await fs.writeFile(
    path.join(__dirname, `../../src/components/api/${typesName}.js`),
    content
  );
};

module.exports = buildOptions;
