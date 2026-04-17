import { existsSync, readFileSync, writeFileSync, appendFileSync, renameSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { readRegistry, requireRealm } from '../registry.js';

function countLines(content) {
  return content.split('\n').length;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function nowStr() {
  const d = new Date();
  return d.toISOString().slice(0, 16).replace('T', ' ');
}

export function diaryCommand(program) {
  program
    .command('diary <name> [message]')
    .description('Append to or open DIARY.md')
    .action((name, message) => {
      const registry = readRegistry();
      const realm = requireRealm(registry, name);
      const diaryPath = join(realm.dir, 'DIARY.md');

      if (!message) {
        // Open in $EDITOR
        const editor = process.env.EDITOR || 'vi';
        if (!existsSync(diaryPath)) {
          writeFileSync(diaryPath, `# Diary — ${name}\n\n`, 'utf8');
        }
        execSync(`${editor} "${diaryPath}"`, { stdio: 'inherit' });
        return;
      }

      // Create if missing
      if (!existsSync(diaryPath)) {
        writeFileSync(diaryPath, `# Diary — ${name}\n\n`, 'utf8');
      }

      const content = readFileSync(diaryPath, 'utf8');

      // Rotate if > 200 lines
      if (countLines(content) > 200) {
        const archivePath = join(realm.dir, 'diaries', `${todayStr()}.md`);
        renameSync(diaryPath, archivePath);
        writeFileSync(diaryPath, `# Diary — ${name}\n\n`, 'utf8');
        console.error(`Diary rotated to diaries/${todayStr()}.md`);
      }

      appendFileSync(diaryPath, `\n## ${nowStr()}\n${message}\n`, 'utf8');
      console.log(`✓ Diary entry added.`);
    });
}
