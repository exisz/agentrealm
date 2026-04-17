import { readRegistry, requireRealm } from '../registry.js';

export function cdCommand(program) {
  program
    .command('cd <name>')
    .description('Print realm directory path (use: cd $(realm cd <name>))')
    .action((name) => {
      const registry = readRegistry();
      const realm = requireRealm(registry, name);
      process.stdout.write(realm.dir + '\n');
    });
}
