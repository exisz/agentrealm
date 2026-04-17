# Contributing to agentrealm

Thank you for your interest in contributing!

## How to Contribute

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit with conventional commits: `feat: add X` / `fix: Y` / `docs: Z`
6. Open a Pull Request against `main`

## Development Setup

```bash
git clone https://github.com/exisz/agentrealm
cd agentrealm
npm install
npm link    # installs realm globally from local source
```

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning:

- `feat:` → minor version bump
- `fix:` / `docs:` / `chore:` → patch
- `feat!:` / `BREAKING CHANGE:` → major

## Code Style

- Pure ESM (`type: module`)
- Node >= 18
- Minimal dependencies: `commander`, `js-yaml`, `chalk` only
- Atomic file writes for registry operations

## Questions?

Open an issue at https://github.com/exisz/agentrealm/issues
