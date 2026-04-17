import fs from 'fs-extra';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const API_URL = 'https://sponsors.nolimits4web.com/api/sponsors/swiper';
const OUTPUT_PATH = path.resolve(__dirname, '../src/shared/n4-sponsors.json');

const planMap = {
  'Gold Sponsor': 'Silver Sponsor',
  Sponsor: 'Sponsor',
};

(async () => {
  const { default: chalk } = await import('chalk');

  console.log(chalk.blue('Fetching n4 sponsors...'));

  let sponsors = [];
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    sponsors = data.map((item) => ({
      createdAt: item.createdAt,
      title: item.title ?? '',
      link: item.link ?? '',
      plan: planMap[item.plan] ?? 'Sponsor',
      ref: '',
      image: item.image ?? '',
      endDate: '',
      active: true,
    }));
    console.log(chalk.green(`✓ Fetched ${sponsors.length} n4 sponsors`));
  } catch (err) {
    console.warn(
      chalk.yellow(`⚠ Failed to fetch n4 sponsors: ${err.message}. Using existing file if present.`),
    );
    if (fs.existsSync(OUTPUT_PATH)) {
      return;
    }
    console.warn(chalk.yellow('⚠ No existing n4-sponsors.json, writing empty array'));
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sponsors, null, 2) + '\n');
})();
