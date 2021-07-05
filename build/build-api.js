const fs = require('fs-extra');
const path = require('path');
const elapsed = require('elapsed-time-logger');
const chalk = require('chalk');
const { promise: exec } = require('exec-sh');

const buildOptions = require('./api/build-options');
const buildEvents = require('./api/build-events');
const buildMethods = require('./api/build-methods');

const components = [
  'A11y',
  'Autoplay',
  'Controller',
  'CoverflowEffect',
  'CubeEffect',
  'FadeEffect',
  'FlipEffect',
  'HashNavigation',
  'History',
  'Keyboard',
  'Lazy',
  'Mousewheel',
  'Navigation',
  'Pagination',
  'Parallax',
  'Scrollbar',
  'Thumbs',
  'Virtual',
  'Zoom',
];

(async () => {
  elapsed.start('Typedoc');
  fs.writeFileSync(
    './tsconfig.json',
    fs.readFileSync('./tsconfig.json.typedoc', 'utf-8')
  );
  await exec(`npx typedoc --json ./src/types.json`);
  elapsed.end('Typedoc');
  elapsed.start('Generate all types');
  const typesPath = path.join(__dirname, '../src/types.json');
  const { children } = await fs.readJSON(typesPath);
  const types = {};

  children.forEach(async ({ name, children, flags, originalName }) => {
    const _name = name.replace(/^\"(.*).d\"$/, '$1');
    if (
      _name === 'public-api' ||
      _name.includes('public-api') ||
      _name === 'shared' ||
      _name.includes('shared')
    ) {
      return;
    }
    children.forEach((v) => {
      if (!v.children) return;
      types[v.name] = v.children.map((prop) => {
        let default_value =
          prop.comment &&
          prop.comment.tags &&
          prop.comment.tags.find((tag) => tag.tag === 'default');

        const defaultValueIsNoteOrExample =
          prop.comment && prop.comment.tags
            ? prop.comment.tags.find(
                (tag) =>
                  (tag.tag === 'note' || tag.tag === 'example') &&
                  tag.text === default_value
              )
            : false;
        if (defaultValueIsNoteOrExample) default_value = '';

        return {
          name: prop.name,
          default_value: default_value
            ? default_value.text.replace('\n', '')
            : null,
          type: prop.type,
          comment: prop.comment,
          signatures: prop.signatures,
        };
      });
    });
  });

  if (types.default) {
    types.Swiper = types.default;
  }

  const componentsEventsList = [];
  const componentsOptionsList = [];

  components.forEach((component) => {
    buildOptions(`${component}Options`, types, [], [], types.SwiperOptions);
    buildEvents(`${component}Events`, types);
    buildMethods(`${component}Methods`, types);
    const eventsList = (types[`${component}Events`] || []).map(
      (item) => item.name
    );
    componentsEventsList.push(...eventsList);
    componentsOptionsList.push(`${component}Options`);
  });

  await buildOptions('SwiperOptions', types, [], componentsOptionsList);
  await buildEvents('SwiperEvents', types, componentsEventsList);
  await buildMethods(
    'Swiper',
    types,
    [
      'modules',
      'currentBreakpoint',
      'destroyed',
      'rtlTranslate',
      'constructor',
      'isHorizontal',
      'setBreakpoint',
      'getBreakpoint',
    ],
    [...components.map((c) => `${c}Methods`), 'ParallaxMethods']
  );

  await fs.writeFile(typesPath, `${JSON.stringify(types, null, 4)}`);
  elapsed.end('Generate all types');
  console.log(chalk.green(`Types generation finished`));
  fs.unlinkSync('./tsconfig.json');
})();
