import fs from 'fs-extra';
import path from 'path';
import description from './description.mjs';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

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
  const items =
    (typesData[typesName] || [])
      .filter(
        (item) => !plainDescription(item).toLowerCase().includes('internal')
      )
      .filter((item) => !ignoreEvents.includes(item.name)) || [];

  const type = (item = {}) => {
    const typeObj = item.type || {};
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
    <table className="events-table">
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
          <tr className="table-border-t">
            <td className="w-1/4 font-mono font-semibold text-black dark:text-white">
              <a href="#event-${item.name}" id="event-${item.name}">${
              item.name
            }</a>
            </td>
            <td className="w-1/4 text-red-700 dark:text-red-500 font-mono font-semibold">
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

export default buildEvents;
