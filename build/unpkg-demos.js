const fs = require('fs');

fs.readdirSync('public/demos')
  .filter((fileName) => fileName.includes('.html'))
  .forEach((fileName) => {
    const content = fs
      .readFileSync(`public/demos/${fileName}`, 'utf-8')
      .replace(/..\/package\//g, 'https://unpkg.com/swiper/');
    fs.writeFileSync(`public/demos/${fileName}`, content);
  });
