const unified = require('unified');
const parse = require('remark-parse');
const remark2rehype = require('remark-rehype');
const rehypePrism = require('@mapbox/rehype-prism');
const html = require('rehype-stringify');

const processDescription = (text) => {
  const result = unified()
    .use(parse)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(html)
    .processSync(text).contents;
  return result
    .replace(/>\{</g, `>{'{'}<`)
    .replace(/>\}</g, `>{'}'}<`)
    .replace(/ class="/g, ' className="')
    .replace(/<code className="([a-z-]*)">([^№]*)<\/code>/g, (...args) => {
      const lang = args[1];
      const inner = args[2]
        .replace(/>([^№^<^>]*)</g, (...args) => {
          return `>${args[1].replace(
            /[ ]{1,}/g,
            (spaces) => `{'${spaces}'}`
          )}<`;
        })
        .replace(/\n/g, '{`\n`}')
        .replace(/&#x3C;([a-z]*) className="/g, '&#x3C;$1 class="')
        .replace(/&#x3C;([a-z]*){' '}className="/g, `&#x3C;$1{' '}class="`);
      return `<code className="${lang}">${inner}</code>`;
    });
};

module.exports = (typesItem, isEvent) => {
  const getProps = (item) => {
    if (isEvent) {
      return typesItem.type.declaration.signatures[0].comment || {};
    }
    return !typesItem.comment && typesItem.signatures && typesItem.signatures[0]
      ? typesItem.signatures[0].comment || {}
      : typesItem.comment || {};
  };
  const { shortText, text, tags = [] } = getProps(typesItem);

  const textContent = [shortText, text].filter((el) => !!el).join('\n\n');

  const tagsContent = tags
    .filter((tag) => tag.tag === 'note' || tag.tag === 'example')
    .map((tag) => {
      if (tag.tag === 'note') {
        return `> ${tag.text}`;
      }

      if (tag.tag === 'example') return tag.text;
    })
    .join('\n\n');

  return processDescription([textContent, tagsContent].join('\n\n'));
};
