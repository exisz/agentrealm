#!/usr/bin/env node
// Test the realm CLI end-to-end
import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const BIN = new URL('../bin/agentrealm.js', import.meta.url).pathname;
const TEST_DIR = '/tmp/realm-e2e-test';
const REALM_NAME = 'test-realm';

function run(args) {
  return execSync(`node ${BIN} ${args}`, { encoding: 'utf8' });
}

// Clean up
if (existsSync(join(TEST_DIR, REALM_NAME))) {
  rmSync(join(TEST_DIR, REALM_NAME), { recursive: true, force: true });
}

// Create realm
const created = run(`new ${REALM_NAME} --dir ${join(TEST_DIR, REALM_NAME)}`);
console.log(created.trim());

// Build prompt
const prompt = run(`prompt ${REALM_NAME}`);
console.log('\n--- PROMPT OUTPUT ---\n');
console.log(prompt);

// Verify
const checks = ['=== INDEX.md ===', '=== REALM.md ===', '=== TOOLS.md ==='];
for (const check of checks) {
  if (!prompt.includes(check)) {
    console.error(`FAIL: missing ${check}`);
    process.exit(1);
  }
}
console.log('✓ All sections present in prompt output');

// ls
const list = run('ls');
console.log('\n--- REALM LIST ---\n');
console.log(list);

// Clean up
run(`rm ${REALM_NAME} --yes`);
rmSync(join(TEST_DIR, REALM_NAME), { recursive: true, force: true });
console.log('✓ E2E test passed');
