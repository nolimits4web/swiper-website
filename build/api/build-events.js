const fs = require('fs-extra');
const path = require('path');
const description = require('./description');

const plainDescription = (item) => {
  if (item.comment && item.comment.shortText)
    return item.comment.shortText || '';
  if (
    item.type &&
    item.type.declaration &&
    item.type.declaration.signatures &&
    item.type.declaration.signatures[0] &&
    item.type.declaration.signatures[0].comment &&
    item.type.declaration.signatures[0].comment.shortText
  )
    return item.type.declaration.signatures[0].comment.shortText || '';
  return '';
};

const buildEvents = async (typesName, typesData, ignoreEvents = []) => {
  items =
    (typesData[typesName] || [])
      .filter(
        (item) => !plainDescription(item).toLowerCase().includes('internal')
      )
      .filter((item) => !ignoreEvents.includes(item.name)) || [];

  const type = (item = {}) => {
    const typeObj = item.type || {};
    if (typeObj.type === 'union') {
      const types = [];
      typeObj.types.forEach(({ name, value }) => {
        if (value) types.push(`'${value}'`);
        else types.push(name);
      });
      return types.join(`{' | '}`);
    }
    return typeObj.name || '';
  };

  const args = (item) => {
    if (
      item.type &&
      item.type.declaration &&
      item.type.declaration.signatures
    ) {
      const params = (item.type.declaration.signatures[0].parameters || []).map(
        (param) => param.name
      );
      if (!params.length) return '';
      return `(${params.join(', ')})`;
    }

    return '';
  };

  const content = `
export const ${typesName} = () => {
  return (
    <table className="table-fixed events-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Arguments</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
          <tr className="border-t">
            <td className="w-1/4 font-mono font-semibold">
              ${item.name}
            </td>
            <td className="w-1/4 text-red-700 font-mono font-semibold">
              ${args(item)}
            </td>
            <td className="w-1/2 space-y-2">${description(item, true)}</td>
          </tr>
        `
          )
          .join('')}

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

module.exports = buildEvents;
