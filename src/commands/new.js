import { homedir } from 'os';
import { join } from 'path';
import { readRegistry, addRealm } from '../registry.js';
import { scaffoldRealm } from '../scaffold.js';

export function newCommand(program) {
  program
    .command('new <name>')
    .description('Create a new realm')
    .option('--dir <path>', 'Custom directory (default: ~/realms/<name>)')
    .option('--with-diary', 'Include a DIARY.md in the realm')
    .action((name, opts) => {
      const dir = opts.dir || join(homedir(), 'realms', name);
      const registry = readRegistry();

      if (registry.realms?.[name]) {
        console.error(`Realm "${name}" already exists.`);
        process.exit(1);
      }

      scaffoldRealm(name, dir, opts.withDiary || false);

      addRealm(registry, name, {
        dir,
        created: new Date().toISOString(),
        description: '',
      });

      console.log(`✓ Realm "${name}" created at ${dir}`);
    });
}
