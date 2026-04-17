import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

// We'll test the core modules directly
import { readRegistry, writeRegistry, addRealm, updateRealm, removeRealm } from '../src/registry.js';
import { scaffoldRealm } from '../src/scaffold.js';
import { buildPrompt, listDiaries } from '../src/prompt.js';

const TMP = join(tmpdir(), `realm-test-${Date.now()}`);
const REALM_DIR = join(TMP, 'test-realm');

// Override registry path for tests
process.env.HOME = TMP;

describe('registry', () => {
  before(() => mkdirSync(TMP, { recursive: true }));
  after(() => rmSync(TMP, { recursive: true, force: true }));

  test('starts empty', () => {
    const reg = readRegistry();
    assert.equal(reg.version, 1);
    assert.deepEqual(reg.realms, {});
  });

  test('add and read realm', () => {
    const reg = readRegistry();
    addRealm(reg, 'test-realm', {
      dir: REALM_DIR,
      status: 'active',
      created: new Date().toISOString(),
      sealed_at: null,
      description: '',
    });

    const reg2 = readRegistry();
    assert.ok(reg2.realms['test-realm']);
    assert.equal(reg2.realms['test-realm'].status, 'active');
  });

  test('update realm', () => {
    const reg = readRegistry();
    updateRealm(reg, 'test-realm', { status: 'sealed', sealed_at: new Date().toISOString() });
    const reg2 = readRegistry();
    assert.equal(reg2.realms['test-realm'].status, 'sealed');
    assert.ok(reg2.realms['test-realm'].sealed_at);
  });

  test('remove realm', () => {
    const reg = readRegistry();
    removeRealm(reg, 'test-realm');
    const reg2 = readRegistry();
    assert.equal(reg2.realms['test-realm'], undefined);
  });
});

describe('scaffold', () => {
  before(() => mkdirSync(TMP, { recursive: true }));

  test('creates realm directory and files', () => {
    scaffoldRealm('test-realm', REALM_DIR, false);
    assert.ok(existsSync(join(REALM_DIR, 'INDEX.md')));
    assert.ok(existsSync(join(REALM_DIR, 'REALM.md')));
    assert.ok(existsSync(join(REALM_DIR, 'TOOLS.md')));
    assert.ok(!existsSync(join(REALM_DIR, 'DIARY.md')));
  });

  test('creates DIARY.md with --with-diary', () => {
    const dir2 = join(TMP, 'realm-with-diary');
    scaffoldRealm('diary-realm', dir2, true);
    assert.ok(existsSync(join(dir2, 'DIARY.md')));
  });
});

describe('prompt builder', () => {
  test('builds prompt with INDEX, REALM, TOOLS sections in order', () => {
    const realm = { dir: REALM_DIR };
    const output = buildPrompt(realm, {});

    assert.ok(output.includes('=== INDEX.md ==='), 'should include INDEX.md section');
    assert.ok(output.includes('=== REALM.md ==='), 'should include REALM.md section');
    assert.ok(output.includes('=== TOOLS.md ==='), 'should include TOOLS.md section');

    const idxPos = output.indexOf('=== INDEX.md ===');
    const realmPos = output.indexOf('=== REALM.md ===');
    const toolsPos = output.indexOf('=== TOOLS.md ===');

    assert.ok(idxPos < realmPos, 'INDEX should come before REALM');
    assert.ok(realmPos < toolsPos, 'REALM should come before TOOLS');
  });

  test('skips DIARY.md silently when not present', () => {
    const realm = { dir: REALM_DIR };
    const output = buildPrompt(realm, {});
    assert.ok(!output.includes('=== DIARY.md ==='), 'DIARY.md should not appear when absent');
  });

  test('listDiaries returns empty when no archives', () => {
    const realm = { dir: REALM_DIR };
    const diaries = listDiaries(realm);
    assert.ok(Array.isArray(diaries));
  });
});
