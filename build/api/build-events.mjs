import fs from 'fs-extra';
import path from 'path';
import * as url from 'url';
import description from './description.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const plainDescription = (item) => {
  const data =
    (!item.comment && item.signatures && item.signatures[0]
      ? item.signatures[0].comment
      : item.comment) ||
    item.type?.declaration?.signatures?.[0]?.comment ||
    {};

  if (data.summary && Array.isArray(data.summary)) {
    return data.summary
      .map((item) => {
        if (item.kind === 'text' || item.kind === 'code') {
          return item.text || '';
        }
        return '';
      })
      .filter(Boolean)
      .join('');
  }

  // Fallback to old format
  const { shortText, text } = data;
  return [shortText || '', text || ''].join('');
};

const buildEvents = async (typesName, typesData, ignoreEvents = []) => {
  const items =
    (typesData[typesName] || [])
      .filter(
        (item) => !plainDescription(item).toLowerCase().includes('internal')
      )
      .filter((item) => !ignoreEvents.includes(item.name)) || [];
  items.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });



  const args = (item) => {
    // Events can have signatures in two places:
    // 1. Directly: item.signatures (for methods)
    // 2. In type declaration: item.type.declaration.signatures (for event properties with function types)
    let signatures = null;

    if (item.signatures && item.signatures.length > 0) {
      signatures = item.signatures;
    } else if (item.type && item.type.declaration && item.type.declaration.signatures && item.type.declaration.signatures.length > 0) {
      signatures = item.type.declaration.signatures;
    }

    if (signatures && signatures[0] && signatures[0].parameters) {
      const params = signatures[0].parameters.map((param) => param.name);
      if (!params.length) return '';
      return `(${params.join(', ')})`;
    }

    return '';
  };

  const content = `
export const ${typesName} = () => {
  return (
    <div className="table-wrap">
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
            <td className="w-1/4 text-primary font-mono">
              <a href="#event-${item.name}" id="event-${item.name}">${
              item.name
            }</a>
            </td>
            <td className="w-1/4 text-orange font-mono">
              ${args(item)}
            </td>
            <td className="w-1/2 space-y-2">${description(item, true)}</td>
          </tr>
        `
          )
          .join('')}

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

export default buildEvents;
