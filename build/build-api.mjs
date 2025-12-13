import fs from 'fs-extra';
import path from 'path';
import elapsed from 'elapsed-time-logger';

import exec from 'exec-sh';

import * as url from 'url';
import buildOptions from './api/build-options.mjs';
import buildEvents from './api/build-events.mjs';
import buildMethods from './api/build-methods.mjs';
import { patchSwiperVue } from './patch-swiper-vue.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const components = [
  'A11y',
  'Autoplay',
  'Controller',
  'CoverflowEffect',
  'CubeEffect',
  'FadeEffect',
  'FlipEffect',
  'CardsEffect',
  'CreativeEffect',
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
  'FreeMode',
  'Grid',
  'Manipulation',
];

(async () => {
  elapsed.start('Typedoc');
  const { default: chalk } = await import('chalk');
  const originalTsconfig = fs.readFileSync('./tsconfig.json', 'utf-8');

  fs.writeFileSync(
    './tsconfig.json',
    fs.readFileSync('./tsconfig.json.typedoc', 'utf-8')
  );

  // Temporarily patch swiper-vue.d.ts to work around TypeDoc bug
  const restoreSwiperVue = patchSwiperVue();

  let typedocSuccess = false;
  try {
    await exec.promise(`npx typedoc --json ./src/types.json`);
    typedocSuccess = true;
  } catch (error) {
    console.error('TypeDoc failed:', error);
  } finally {
    fs.writeFileSync('./tsconfig.json', originalTsconfig);
    restoreSwiperVue();
  }

  if (!typedocSuccess) {
    console.error('TypeDoc generation failed, exiting');
    process.exit(1);
  }

  elapsed.end('Typedoc');
  elapsed.start('Generate all types');
  const typesPath = path.join(__dirname, '../src/types.json');

  if (!fs.existsSync(typesPath)) {
    console.error('TypeDoc failed to generate types.json');
    process.exit(1);
  }

  const typesJson = JSON.parse(fs.readFileSync(typesPath, 'utf-8'));
  const types = {};

  // Helper function to find a type by name across all modules
  const findTypeByName = (typeName, symbolIdMap) => {
    if (!typesJson.children) return null;

    for (const module of typesJson.children) {
      if (!module.children) continue;
      for (const childRef of module.children) {
        const child = childRef.variant === 'reference'
          ? symbolIdMap?.[childRef.target]
          : childRef;
        if (child && child.name === typeName && child.children) {
          return child;
        }
      }
    }
    return null;
  };

  // Helper function to resolve a reflection (handle references)
  const resolveReflection = (ref, symbolIdMap) => {
    if (!ref) return null;
    // If it's a reference, look up the target
    if (ref.variant === 'reference' && ref.target) {
      const target = symbolIdMap?.[ref.target];
      // If target is just a package reference (external), find the actual definition
      if (target && target.qualifiedName && !target.children) {
        const actual = findTypeByName(target.qualifiedName, symbolIdMap);
        if (actual) return actual;
      }
      return target || null;
    }
    return ref;
  };

  // Helper function to extract properties from a reflection
  const extractProperties = (reflection, symbolIdMap) => {
    if (!reflection || !reflection.children) return [];

    return reflection.children.map((child) => {
      const prop = resolveReflection(child, symbolIdMap);
      if (!prop) return null;

      // Extract default value from comment
      let default_value = null;
      if (prop.comment) {
        // Check blockTags (new format)
        if (prop.comment.blockTags && Array.isArray(prop.comment.blockTags)) {
          const defaultTag = prop.comment.blockTags.find(
            (tag) => tag.tag === '@default' || tag.tag === 'default'
          );
          if (defaultTag && defaultTag.content && Array.isArray(defaultTag.content)) {
            // Extract text from content array
            let defaultText = defaultTag.content
              .map((item) => {
                if (item.kind === 'text' || item.kind === 'code') {
                  return item.text || '';
                }
                return '';
              })
              .filter(Boolean)
              .join('');
            // Remove markdown code blocks if present (handles ```ts\n'value'\n``` format)
            // Match ``` followed by optional language, optional newline, then content, then optional newline and ```
            defaultText = defaultText.replace(/^```[\w]*\s*\n?/g, '').replace(/\n?\s*```$/g, '').trim();
            // Remove surrounding quotes if present (string literals)
            if ((defaultText.startsWith("'") && defaultText.endsWith("'")) ||
                (defaultText.startsWith('"') && defaultText.endsWith('"'))) {
              defaultText = defaultText.slice(1, -1);
            }
            if (defaultText) default_value = defaultText;
          }
        }
        // Fallback to old format (tags)
        if (!default_value && prop.comment.tags) {
          const defaultTag = prop.comment.tags.find((tag) => tag.tag === 'default');
          if (defaultTag && defaultTag.text) {
            default_value = defaultTag.text.replace('\n', '');
          }
        }
      }

      // Check if default value is actually a note or example (should be ignored)
      const defaultValueIsNoteOrExample =
        prop.comment &&
        ((prop.comment.blockTags &&
          prop.comment.blockTags.some(
            (tag) =>
              (tag.tag === '@note' || tag.tag === '@example' || tag.tag === 'note' || tag.tag === 'example') &&
              tag.content &&
              tag.content.some((item) => item.text === default_value)
          )) ||
          (prop.comment.tags &&
            prop.comment.tags.find(
              (tag) =>
                (tag.tag === 'note' || tag.tag === 'example') &&
                tag.text === default_value
            )));
      if (defaultValueIsNoteOrExample) default_value = null;

      return {
        name: prop.name,
        default_value: default_value,
        type: prop.type,
        comment: prop.comment,
        signatures: prop.signatures,
      };
    }).filter(Boolean);
  };

  if (typesJson.children && Array.isArray(typesJson.children)) {
    // eslint-disable-next-line
    for (const moduleReflection of typesJson.children) {
      if (!moduleReflection || !moduleReflection.children) continue;

      // Check if this is a module/file entry
      const name = moduleReflection.name || '';
      const _name = name.replace(/^\"(.*).d\"$/, '$1');

      if (
        _name === 'public-api' ||
        _name.includes('public-api') ||
        _name === 'shared' ||
        _name.includes('shared')
      ) {
        continue;
      }

      // Process children of this module (types/interfaces)
      for (const childRef of moduleReflection.children) {
        // Use the original reference name (e.g., "default", "Swiper")
        const typeName = childRef.name;
        if (!typeName) continue;

        // Resolve the reference to get the actual reflection
        const actualReflection = childRef.variant === 'reference'
          ? resolveReflection(childRef, typesJson.symbolIdMap)
          : childRef;

        if (actualReflection && actualReflection.children) {
          types[typeName] = extractProperties(actualReflection, typesJson.symbolIdMap);
        } else if (actualReflection && !actualReflection.children && actualReflection.kind) {
          // Some types might not have children (e.g., type aliases, primitives)
          // Store them anyway for reference
          types[typeName] = [];
        }
      }
    }
  } else if (typesJson.files && typesJson.files.entries) {
    const entries = typesJson.files.entries;
    const reflections = typesJson.files.reflections || {};

    for (const entryId of Object.keys(entries)) {
      const entryReflectionId = entries[entryId];
      const entryReflection = reflections[entryReflectionId] || typesJson.symbolIdMap?.[entryReflectionId];

      if (!entryReflection) continue;

      const name = entryReflection.name || '';
      const _name = name.replace(/^\"(.*).d\"$/, '$1');

      if (
        _name === 'public-api' ||
        _name.includes('public-api') ||
        _name === 'shared' ||
        _name.includes('shared')
      ) {
        continue;
      }

      if (entryReflection.children && Array.isArray(entryReflection.children)) {
        for (const childId of entryReflection.children) {
          const child = reflections[childId] || typesJson.symbolIdMap?.[childId];
          if (!child || !child.children) continue;

          types[child.name] = extractProperties(child, typesJson.symbolIdMap);
        }
      }
    }
  } else if (typesJson.children && Array.isArray(typesJson.children) && typesJson.children.length > 0 && typeof typesJson.children[0] === 'object' && !typesJson.children[0].id) {
    // Fallback to old TypeDoc structure (pre-0.28) - children are simple objects with name/children properties
    const { children } = typesJson;
    // eslint-disable-next-line
    for (const { name, children: moduleChildren, flags, originalName } of children) {
      // eslint-disable-next-line
      const _name = name.replace(/^\"(.*).d\"$/, '$1');
      if (
        _name === 'public-api' ||
        _name.includes('public-api') ||
        _name === 'shared' ||
        _name.includes('shared')
      ) {
        continue;
      }
      if (!moduleChildren) continue;
      moduleChildren.forEach((v) => {
        if (!v.children) return;
        types[v.name] = v.children.map((prop) => {
          // Extract default value from comment (old format fallback)
          let default_value = null;
          if (prop.comment) {
            // Check blockTags (new format)
            if (prop.comment.blockTags && Array.isArray(prop.comment.blockTags)) {
              const defaultTag = prop.comment.blockTags.find(
                (tag) => tag.tag === '@default' || tag.tag === 'default'
              );
              if (defaultTag && defaultTag.content && Array.isArray(defaultTag.content)) {
              let defaultText = defaultTag.content
                .map((item) => {
                  if (item.kind === 'text' || item.kind === 'code') {
                    return item.text || '';
                  }
                  return '';
                })
                .filter(Boolean)
                .join('');
              // Remove markdown code blocks if present
              defaultText = defaultText.replace(/^```[\w]*\s*\n?/g, '').replace(/\n?\s*```$/g, '').trim();
              // Remove surrounding quotes if present (string literals)
              if ((defaultText.startsWith("'") && defaultText.endsWith("'")) ||
                  (defaultText.startsWith('"') && defaultText.endsWith('"'))) {
                defaultText = defaultText.slice(1, -1);
              }
              if (defaultText) default_value = defaultText;
              }
            }
            // Fallback to old format (tags)
            if (!default_value && prop.comment.tags) {
              const defaultTag = prop.comment.tags.find((tag) => tag.tag === 'default');
              if (defaultTag && defaultTag.text) {
                default_value = defaultTag.text.replace('\n', '');
              }
            }
          }

          // Check if default value is actually a note or example
          const defaultValueIsNoteOrExample =
            prop.comment &&
            ((prop.comment.blockTags &&
              prop.comment.blockTags.some(
                (tag) =>
                  (tag.tag === '@note' || tag.tag === '@example' || tag.tag === 'note' || tag.tag === 'example') &&
                  tag.content &&
                  tag.content.some((item) => item.text === default_value)
              )) ||
              (prop.comment.tags &&
                prop.comment.tags.find(
                  (tag) =>
                    (tag.tag === 'note' || tag.tag === 'example') &&
                    tag.text === default_value
                )));
          if (defaultValueIsNoteOrExample) default_value = null;

          return {
            name: prop.name,
            default_value: default_value,
            type: prop.type,
            comment: prop.comment,
            signatures: prop.signatures,
          };
        });
      });
    }
  } else {
    console.error('Invalid TypeDoc output: unsupported structure');
    process.exit(1);
  }

  // Map default export to Swiper
  if (types.default && Array.isArray(types.default) && types.default.length > 0) {
    types.Swiper = types.default;
  } else if (types.Swiper && Array.isArray(types.Swiper) && types.Swiper.length > 0) {
    // Swiper might be extracted directly (not as default) and has items
    // This is fine, keep it as is
  } else {
    // Try to find Swiper in the types - it might be under a different name
    // Check if there's a SwiperClass or similar that we can use
    if (types.SwiperClass && Array.isArray(types.SwiperClass) && types.SwiperClass.length > 0) {
      // Use SwiperClass as fallback if Swiper doesn't exist or is empty
      types.Swiper = types.SwiperClass;
    } else {
      console.warn('Warning: types.Swiper not found, using empty array');
      types.Swiper = [];
    }
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
      'currentBreakpoint',
      'destroyed',
      'rtlTranslate',
      'constructor',
      'isHorizontal',
      'setBreakpoint',
      'getBreakpoint',
      'addSlide',
      'appendSlide',
      'prependSlide',
      'removeAllSlides',
      'removeSlide',
    ],
    [...components.map((c) => `${c}Methods`), 'ParallaxMethods']
  );

  await fs.writeFile(typesPath, `${JSON.stringify(types, null, 4)}`);
  elapsed.end('Generate all types');
  console.log(chalk.green(`Types generation finished`));
})();
