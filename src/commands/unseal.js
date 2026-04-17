import { readRegistry, requireRealm, updateRealm } from '../registry.js';

export function unsealCommand(program) {
  program
    .command('unseal <name>')
    .description('Unseal a realm (reactivate)')
    .action((name) => {
      const registry = readRegistry();
      requireRealm(registry, name);
      updateRealm(registry, name, {
        status: 'active',
        sealed_at: null,
      });
      console.log(`✓ Realm "${name}" unsealed.`);
    });
}
