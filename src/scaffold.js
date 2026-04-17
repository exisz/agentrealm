import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', 'templates');

function readTemplate(name) {
  return readFileSync(join(TEMPLATES_DIR, name), 'utf8');
}

function renderTemplate(content, vars) {
  return content
    .replace(/\{\{name\}\}/g, vars.name)
    .replace(/\{\{created\}\}/g, vars.created)
    .replace(/\{\{status\}\}/g, vars.status || 'active')
    .replace(/\{\{dir\}\}/g, vars.dir);
}

export function scaffoldRealm(name, dir, withDiary) {
  mkdirSync(dir, { recursive: true });
  mkdirSync(join(dir, 'diaries'), { recursive: true });

  const now = new Date().toISOString();
  const vars = { name, created: now, status: 'active', dir };

  writeFileSync(join(dir, 'INDEX.md'), renderTemplate(readTemplate('INDEX.md'), vars), 'utf8');
  writeFileSync(join(dir, 'REALM.md'), renderTemplate(readTemplate('REALM.md'), vars), 'utf8');
  writeFileSync(join(dir, 'TOOLS.md'), renderTemplate(readTemplate('TOOLS.md'), vars), 'utf8');

  if (withDiary) {
    writeFileSync(join(dir, 'DIARY.md'), renderTemplate(readTemplate('DIARY.md'), vars), 'utf8');
  }

  // gitkeep for diaries
  writeFileSync(join(dir, 'diaries', '.gitkeep'), '', 'utf8');
}
