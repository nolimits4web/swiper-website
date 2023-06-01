const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');

const build = async () => {
  const { default: fetch } = await import('node-fetch');
  const demos = await fetch(
    'https://uiinitiative.com/api/list?tech=Swiper'
  ).then((res) => res.json());
  fs.writeFileSync(
    path.resolve(__dirname, '../src/uiinitiative-demos.json'),
    JSON.stringify(demos)
  );
};

build();
