import chalk from 'chalk';
import { readRegistry } from '../registry.js';

export function lsCommand(program) {
  program
    .command('ls')
    .description('List realms')
    .action(() => {
      const registry = readRegistry();
      const realms = Object.entries(registry.realms || {});

      if (realms.length === 0) {
        console.log('No realms found. Create one with: realm new <name>');
        return;
      }

      const col1 = Math.max(4, ...realms.map(([n]) => n.length));
      const col2 = Math.max(3, ...realms.map(([, r]) => r.dir.length));

      const header =
        chalk.bold('NAME'.padEnd(col1)) + '  ' +
        chalk.bold('DIR');
      console.log(header);
      console.log('─'.repeat(col1 + col2 + 2));

      for (const [name, realm] of realms) {
        console.log(
          name.padEnd(col1) + '  ' +
          chalk.dim(realm.dir)
        );
      }
    });
}
