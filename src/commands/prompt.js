import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { readRegistry, requireRealm } from '../registry.js';
import { buildPrompt, listDiaries } from '../prompt.js';

export function promptCommand(program) {
  program
    .command('prompt <name>')
    .description('Build and output the realm context prompt')
    .option('--memory', 'Include MEMORY.md if present')
    .option('--diary <date>', 'Include a historical diary (YYYY-MM-DD)')
    .option('--diaries-list', 'List available diary files')
    .option('--copy', 'Copy output to clipboard')
    .option('--out <file>', 'Write output to file')
    .action((name, opts) => {
      const registry = readRegistry();
      const realm = requireRealm(registry, name);

      if (opts.diariesList) {
        const files = listDiaries(realm);
        if (files.length === 0) {
          console.log('No diary archives found.');
        } else {
          files.forEach(f => console.log(f));
        }
        return;
      }

      const output = buildPrompt(realm, {
        memory: opts.memory,
        diary: opts.diary,
      });

      if (opts.out) {
        writeFileSync(opts.out, output, 'utf8');
        console.error(`Written to ${opts.out}`);
        return;
      }

      if (opts.copy) {
        const platform = process.platform;
        let cmd;
        if (platform === 'darwin') cmd = 'pbcopy';
        else if (platform === 'win32') cmd = 'clip';
        else cmd = 'xclip -selection clipboard 2>/dev/null || wl-copy';
        execSync(cmd, { input: output });
        console.error('Copied to clipboard.');
        return;
      }

      process.stdout.write(output);
    });
}
