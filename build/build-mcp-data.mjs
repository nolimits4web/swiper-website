import fs from 'fs-extra';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

(async () => {
  const { default: chalk } = await import('chalk');

  console.log(chalk.blue('Building MCP data files...'));

  // Read source JSON files
  const typesPath = path.join(__dirname, '../src/types.json');
  const demosPath = path.join(__dirname, '../src/demos.json');

  if (!fs.existsSync(typesPath)) {
    console.error(chalk.red('Error: types.json not found. Run build-api first.'));
    process.exit(1);
  }

  if (!fs.existsSync(demosPath)) {
    console.error(chalk.red('Error: demos.json not found. Run build-demos first.'));
    process.exit(1);
  }

  const typesData = JSON.parse(fs.readFileSync(typesPath, 'utf-8'));
  const demosData = JSON.parse(fs.readFileSync(demosPath, 'utf-8'));

  // Create data directory
  const dataDir = path.join(__dirname, '../src/worker/mcp/data');
  fs.ensureDirSync(dataDir);

  // Generate types.ts
  const typesOutput = `// Auto-generated file - do not edit manually
// Generated from src/types.json

export const typesData = ${JSON.stringify(typesData, null, 2)} as const;
`;
  fs.writeFileSync(path.join(dataDir, 'types.ts'), typesOutput);

  // Generate demos.ts
  const demosOutput = `// Auto-generated file - do not edit manually
// Generated from src/demos.json

export const demosData = ${JSON.stringify(demosData, null, 2)} as const;
`;
  fs.writeFileSync(path.join(dataDir, 'demos.ts'), demosOutput);

  console.log(chalk.green('✓ MCP data files generated successfully'));
})();
