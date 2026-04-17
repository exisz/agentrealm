import { readRegistry, requireRealm, updateRealm } from '../registry.js';

export function sealCommand(program) {
  program
    .command('seal <name>')
    .description('Seal a realm (mark as done)')
    .action((name) => {
      const registry = readRegistry();
      requireRealm(registry, name);
      updateRealm(registry, name, {
        status: 'sealed',
        sealed_at: new Date().toISOString(),
      });
      console.log(`✓ Realm "${name}" sealed.`);
    });
}
