import { rmSync, existsSync } from 'fs';
import { createInterface } from 'readline';
import { readRegistry, requireRealm, removeRealm } from '../registry.js';

function confirm(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stderr });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

export function rmCommand(program) {
  program
    .command('rm <name>')
    .description('Remove a realm from registry')
    .option('--purge', 'Also delete the realm directory')
    .option('--yes', 'Skip confirmation')
    .action(async (name, opts) => {
      const registry = readRegistry();
      const realm = requireRealm(registry, name);

      if (opts.purge && !opts.yes) {
        const ok = await confirm(`This will delete ${realm.dir}. Continue? [y/N] `);
        if (!ok) {
          console.log('Aborted.');
          process.exit(0);
        }
      }

      removeRealm(registry, name);

      if (opts.purge && existsSync(realm.dir)) {
        rmSync(realm.dir, { recursive: true, force: true });
        console.log(`✓ Realm "${name}" removed from registry and directory deleted.`);
      } else {
        console.log(`✓ Realm "${name}" removed from registry.`);
      }
    });
}
