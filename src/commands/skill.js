import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_PATH = join(__dirname, '..', '..', 'skill', 'SKILL.md');

export function skillCommand(program) {
  program
    .command('skill')
    .description('Print path to bundled SKILL.md')
    .action(() => {
      console.log(SKILL_PATH);
    });
}
