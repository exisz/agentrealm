import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

function section(filename, content) {
  return `=== ${filename} ===\n\n${content}\n\n`;
}

export function buildPrompt(realm, options = {}) {
  const dir = realm.dir;
  const parts = [];

  for (const file of ['INDEX.md', 'REALM.md', 'TOOLS.md']) {
    const p = join(dir, file);
    if (existsSync(p)) {
      parts.push(section(file, readFileSync(p, 'utf8')));
    }
  }

  // DIARY.md — always include if exists (unless --diary flag overrides)
  const diaryPath = join(dir, 'DIARY.md');
  if (!options.diary && existsSync(diaryPath)) {
    parts.push(section('DIARY.md', readFileSync(diaryPath, 'utf8')));
  }

  if (options.memory) {
    const memPath = join(dir, 'MEMORY.md');
    if (existsSync(memPath)) {
      parts.push(section('MEMORY.md', readFileSync(memPath, 'utf8')));
    }
  }

  if (options.diary) {
    const histPath = join(dir, 'diaries', `${options.diary}.md`);
    if (existsSync(histPath)) {
      parts.push(section(`diaries/${options.diary}.md`, readFileSync(histPath, 'utf8')));
    } else {
      console.error(`Diary file not found: diaries/${options.diary}.md`);
    }
  }

  return parts.join('');
}

export function listDiaries(realm) {
  const dirPath = join(realm.dir, 'diaries');
  if (!existsSync(dirPath)) return [];
  return readdirSync(dirPath)
    .filter(f => f.endsWith('.md') && f !== '.gitkeep')
    .sort();
}
