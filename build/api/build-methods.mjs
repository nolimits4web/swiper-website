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

  const { shortText, text } = data;
  return [shortText || '', text || ''].join('');
};

const buildMethods = async (
  typesName,
  typesData,
  ignoreOptions = [],
  ignoreTypes = []
) => {
  const items =
    (typesData[typesName] || [])
      .filter(
        (item) => !plainDescription(item).toLowerCase().includes('internal')
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
    if (typeObj.type === 'reflection') {
      if (typeObj && typeObj.declaration && typeObj.declaration.signatures) {
        const args = (typeObj.declaration.signatures[0].parameters || [])
          .map((param) => `<span className="text-orange">${param.name}</span>`)
          .join(', ');
        return `function(${args || ''})`;
      }
      return `object`;
    }

    if (typeObj.type === 'array') {
      if (typeObj && typeObj.elementType && typeObj.elementType.name) {
        return `<span className="text-green">${typeObj.elementType.name}[]</span>`;
      }
    }

    return typeObj.name || '';
  };

  const methodDescription = (item) => {
    if (item.signatures && item.signatures[0].parameters) {
      const params = [];
      item.signatures[0].parameters.forEach((param) => {
        const { comment } = param;
        if (comment && comment.text) params.push(param);
      });
      if (!params.length) return '';
      return `
        <ul>
          ${params
            .map(
              (param) => `
          <li><span className="text-orange font-mono">${
            param.name
          }</span> - <span className="text-green font-mono">${type(
                param
              )}</span> - ${param.comment.text || ''}</li>
          `
            )
            .join('')}

        </ul>
      `;
    }
    return '';
  };

  const methodId = (methodName) => {
    return methodName.split('(')[0].replace(/\./g, '-');
  };

  let parentProp = '';
  typesData.Swiper.forEach((item) => {
    if (item.type && item.type.name === typesName) parentProp = item.name;
  });

  const name = (item) => {
    const isMethod = !!item.signatures;
    let args = '';
    if (isMethod) {
      args = (item.signatures[0].parameters || [])
        .map((param) => `<span className="text-orange">${param.name}</span>`)
        .join(', ');
      args = `(${args})`;
    }

    if (parentProp) return `swiper.${parentProp}.${item.name}${args}`;
    return `swiper.${item.name}${args}`;
  };

  const props = (items || []).filter((item) => !item.signatures);
  const methods = (items || []).filter((item) => !!item.signatures);

  const content = `
export const ${typesName} = () => {
  return (
    <div className="table-wrap">
    <table className="methods-table">
      <tbody>
        ${
          props.length
            ? `
          <tr className="table-border-t methods-table-title-row">
            <th colSpan="3" className="p-4 bg-surface-1">Properties</th>
          </tr>
        `
            : ''
        }
        ${props
          .map(
            (item) => `
          <tr className="table-border-t">
            <td className="w-1/6 font-mono text-primary">
              <a href="#prop-${methodId(name(item))}" id="prop-${methodId(
              name(item)
            )}">${name(item)}</a>
            </td>
            <td className="w-1/6 text-green font-mono">
              ${type(item)}
            </td>

            <td className="w-3/6 space-y-2">${description(item)}</td>
          </tr>
        `
          )
          .join('')}

          ${
            methods.length
              ? `
            <tr className="table-border-t methods-table-title-row">
              <th colSpan="3" className="p-4 bg-surface-1">Methods</th>
            </tr>
            `
              : ''
          }

          ${methods
            .map(
              (item) => `
            <tr className="table-border-t">
              <td className="w-1/6 font-mono text-primary" colSpan="2">
                <a href="#method-${methodId(name(item))}" id="method-${methodId(
                name(item)
              )}">${name(item)}</a>
              </td>

              <td className="w-3/6 space-y-2">
                ${description(item.signatures[0])}
                ${methodDescription(item)}
              </td>
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

export default buildMethods;
