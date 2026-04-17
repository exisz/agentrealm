import { readFileSync, existsSync, writeFileSync, renameSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import yaml from 'js-yaml';

const REGISTRY_PATH = join(homedir(), '.realm.yml');

function emptyRegistry() {
  return { version: 1, realms: {} };
}

export function readRegistry() {
  if (!existsSync(REGISTRY_PATH)) return emptyRegistry();
  const content = readFileSync(REGISTRY_PATH, 'utf8');
  return yaml.load(content) || emptyRegistry();
}

export function writeRegistry(data) {
  const tmp = REGISTRY_PATH + '.tmp';
  writeFileSync(tmp, yaml.dump(data, { lineWidth: -1 }), 'utf8');
  renameSync(tmp, REGISTRY_PATH);
}

export function getRealm(registry, name) {
  return registry.realms?.[name] ?? null;
}

export function requireRealm(registry, name) {
  const realm = getRealm(registry, name);
  if (!realm) {
    console.error(`Realm "${name}" not found. Run: realm ls`);
    process.exit(1);
  }
  return realm;
}

export function addRealm(registry, name, data) {
  registry.realms = registry.realms || {};
  registry.realms[name] = data;
  writeRegistry(registry);
}

export function updateRealm(registry, name, updates) {
  registry.realms[name] = { ...registry.realms[name], ...updates };
  writeRegistry(registry);
}

export function removeRealm(registry, name) {
  delete registry.realms[name];
  writeRegistry(registry);
}
