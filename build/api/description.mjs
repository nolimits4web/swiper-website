import { unified } from 'unified';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypePrism from '@mapbox/rehype-prism';
import html from 'rehype-stringify';

const processDescription = (text) => {
  const result = unified()
    .use(parse)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(html, {
      entities: { useNamedReferences: true, useShortestReferences: true },
    })
    .processSync(text)
    .value.replace(/><\/code>/g, `&gt;</code>`)
    .replace(/ >= /g, ` &gt;= `)
    .replace(/ > /g, ` &gt; `)
    .replace(/>></g, `>&gt;<`)
    .replace(/ -->/g, ` --&gt;`)
    .replace(/ -> /g, ' -&gt; ')
    .replace(/'">/g, `'"&gt;`)
    .replace(
      /&lt;div class="swiper-slide">/g,
      '&lt;div class="swiper-slide"&gt;'
    )
    .replace(/&lt;\/([a-z]*)>/g, '&lt;/$1&gt;');

  return result
    .replace(/([{}])/g, (v) => {
      return `{'${v}'}`;
    })
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
        .replace(/&#x26;/g, '&')
        .replace(/&lt;([a-z]*) className="/g, '&lt;$1 class="')
        .replace(/&lt;([a-z]*){' '}className="/g, `&lt;$1{' '}class="`);
      return `<code className="${lang}">${inner}</code>`;
    });
};

export default (typesItem) => {
  const getProps = () => {
    return (
      (!typesItem.comment && typesItem.signatures && typesItem.signatures[0]
        ? typesItem.signatures[0].comment
        : typesItem.comment) ||
      typesItem.type?.declaration?.signatures?.[0]?.comment ||
      {}
    );
  };
  const { shortText, text, tags = [] } = getProps(typesItem);

  const textContent = [shortText, text].filter((el) => !!el).join('\n\n');

  const tagsContent = tags
    .filter((tag) => tag.tag === 'note' || tag.tag === 'example')
    // eslint-disable-next-line
    .map((tag) => {
      if (tag.tag === 'note') {
        return `> ${tag.text}`;
      }

      if (tag.tag === 'example') return tag.text;
    })
    .join('\n\n');

  return processDescription([textContent, tagsContent].join('\n\n'));
};
