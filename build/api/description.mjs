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

export default (typesItem, isEvent = false) => {
  const getProps = () => {
    return (
      (!typesItem.comment && typesItem.signatures && typesItem.signatures[0]
        ? typesItem.signatures[0].comment
        : typesItem.comment) ||
      typesItem.type?.declaration?.signatures?.[0]?.comment ||
      {}
    );
  };
  const comment = getProps(typesItem);

  let textContent = '';
  let tagsContent = '';

  if (comment.summary && Array.isArray(comment.summary)) {
    textContent = comment.summary
      .map((item) => {
        if (item.kind === 'text' || item.kind === 'code') {
          return item.text || '';
        }
        return '';
      })
      .filter(Boolean)
      .join('');
  } else if (comment.shortText || comment.text) {
    textContent = [comment.shortText, comment.text].filter((el) => !!el).join('\n\n');
  }

  // Handle blockTags
  const blockTags = comment.blockTags || [];
  const legacyTags = comment.tags || [];

  tagsContent = [...blockTags, ...legacyTags]
    .filter((tag) => {
      // Extract tag name and remove @ symbol
      const rawTag = tag.tag || tag.tagName || '';
      const tagName = rawTag.replace(/^@/, '');
      return tagName === 'note' || tagName === 'example';
    })
    .map((tag) => {
      // Extract tag name and remove @ symbol
      const rawTag = tag.tag || tag.tagName || '';
      const tagName = rawTag.replace(/^@/, '');
      let content = '';

      if (tag.content && Array.isArray(tag.content)) {
        content = tag.content
          .map((item) => (item.kind === 'text' || item.kind === 'code' ? item.text : ''))
          .filter(Boolean)
          .join('');
      } else if (tag.text) {
        content = tag.text;
      }

      if (tagName === 'note') {
        return `> ${content}`;
      }

      if (tagName === 'example') return content;
    })
    .filter(Boolean)
    .join('\n\n');

  return processDescription([textContent, tagsContent].filter(Boolean).join('\n\n'));
};
