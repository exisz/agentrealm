import chalk from 'chalk';
import { readRegistry } from '../registry.js';

export function lsCommand(program) {
  program
    .command('ls')
    .description('List realms')
    .option('--all', 'Include sealed realms')
    .action((opts) => {
      const registry = readRegistry();
      const realms = Object.entries(registry.realms || {});

      const filtered = opts.all
        ? realms
        : realms.filter(([, r]) => r.status !== 'sealed');

      if (filtered.length === 0) {
        console.log('No realms found. Create one with: realm new <name>');
        return;
      }

      const col1 = Math.max(4, ...filtered.map(([n]) => n.length));
      const col2 = 8;
      const col3 = Math.max(3, ...filtered.map(([, r]) => r.dir.length));

      const header =
        chalk.bold('NAME'.padEnd(col1)) + '  ' +
        chalk.bold('STATUS'.padEnd(col2)) + '  ' +
        chalk.bold('DIR');
      console.log(header);
      console.log('─'.repeat(col1 + col2 + col3 + 4));

      for (const [name, realm] of filtered) {
        const statusColor = realm.status === 'sealed' ? chalk.gray : chalk.green;
        console.log(
          name.padEnd(col1) + '  ' +
          statusColor(realm.status.padEnd(col2)) + '  ' +
          chalk.dim(realm.dir)
        );
      }
    });
}
