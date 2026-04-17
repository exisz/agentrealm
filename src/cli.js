import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';

import { newCommand } from './commands/new.js';
import { lsCommand } from './commands/ls.js';
import { cdCommand } from './commands/cd.js';
import { promptCommand } from './commands/prompt.js';
import { sealCommand } from './commands/seal.js';
import { unsealCommand } from './commands/unseal.js';
import { rmCommand } from './commands/rm.js';
import { diaryCommand } from './commands/diary.js';
import { skillCommand } from './commands/skill.js';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

const program = new Command();

program
  .name('realm')
  .description('Agentless sandbox workspaces for AI agents')
  .version(pkg.version);

newCommand(program);
lsCommand(program);
cdCommand(program);
promptCommand(program);
sealCommand(program);
unsealCommand(program);
rmCommand(program);
diaryCommand(program);
skillCommand(program);

program.parse();
