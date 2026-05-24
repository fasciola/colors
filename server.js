import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compiledServerPath = path.join(__dirname, 'dist', 'server.cjs');

if (fs.existsSync(compiledServerPath)) {
  import('./dist/server.cjs');
} else {
  console.error("Compiled server bundle not found at dist/server.cjs.");
  console.error("Please run 'npm run build' first to generate the production bundle.");
  process.exit(1);
}
