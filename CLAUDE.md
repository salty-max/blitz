# CLAUDE.md

Internal conventions for AI agents working on this repo. The README is the
human-facing entry point and must never reference this file.

## What this is

A Blood Bowl toolkit for coaches: **team management**, **league/tournament
management**, and a **codex** (rules + teams + skills reference). Monolith with
package boundaries — see the README for the layout. The spine is the data model
(`packages/schema` + `packages/data`), the API, and the web app; `packages/engine`
is only a small odds helper for tooltips (Blood Bowl's per-roll odds are trivial
and the real depth is positional, so it is not the centrepiece). Sister project to
`auspex` (the 40k combat-math toolkit), reusing its stack on a self-contained game.

## Toolchain

- **Bun** is the package manager, test runner, and bundler (version pinned in
  `packageManager`). **Turborepo** orchestrates tasks across workspaces.
- **TypeScript 6, strict**, shared base config in `tsconfig.base.json`. ESM only.
- **ESLint** (type-checked rules + JSDoc on `src`, lighter ruleset on `tests`) and
  **Prettier** (no semicolons, single quotes). Exported declarations carry prose doc
  comments — `@param`/`@returns` tags are not used.
- The flat ESLint config is **shared at the root**; package-specific rules (e.g.
  React for `apps/web`) are glob blocks in the root config. The root config and
  `.prettierrc` are turbo inputs of the `lint` task so editing them busts the cache.
- **Husky** hooks: pre-commit runs typecheck + lint-staged + tests; commit-msg runs
  commitlint.

```sh
bun install
bun run typecheck   # tsc over src AND tests in every package
bun test            # bun:test across all packages
bun run lint        # per-package via turbo, zero warnings (lint:fix to autofix)
bun run build       # bundles + emits declarations
bun run format      # prettier over the whole repo
```

Run typecheck, test, lint and build locally before every push — CI is the safety
net, not the iteration loop.

## Rules accuracy (the project's core invariant)

The codex, data and engine must match the **real** Blood Bowl rules, not
remembered approximations.

- `docs/rules/` is the project's working rules reference (Third Season Edition):
  mechanics summarised concisely with the factual data, plus an
  implementation-status note per file. It is the single source the codex, data
  and engine are built against.
- Before implementing or changing any game mechanic: check `docs/rules/`; if it
  isn't documented there yet, add it in the same PR, then build against it.
- Source code describes what it does ("a re-roll fires only on a failed first
  attempt"), not rule citations.

## Engine conventions (`packages/engine`)

- **Zero runtime dependencies**, isomorphic, browser-first ESM. No module-level
  state. Do NOT add `sideEffects: false` to package.json: bun's bundler
  tree-shakes a pure re-export entry (like `index.ts`) down to an empty export
  stub under that flag — the build exits 0 and CI stays green while `dist` is
  hollow.
- Everything is **exact probability**, never Monte Carlo: results are deterministic
  distributions (`Distribution` = probability mass over non-negative integers,
  index = value) or closed-form probabilities. New mechanics compose as
  distribution transformations.
- Rule mechanics live in `rules.ts` as small pure functions testable in isolation;
  `sequence.ts` only composes them (e.g. a Blitz = rush → block → armour → injury).
- `tsconfig.json` builds `src` (declaration emit needs `rootDir: src`);
  `tsconfig.test.json` typechecks `src` + `tests`. The `typecheck` script points at
  the test config so tests stay typechecked — Bun strips types without checking them.

## Testing

- `bun:test`, files in `tests/*.test.ts` mirroring `src/` module names.
- Assert against **hand-computed probabilities** (e.g. breaking AV10 needs 11+ on
  2d6 = 3/36) with the derivation as a comment; verify distributions sum to 1 and
  edge cases collapse to point masses.

## Git & PRs

- Conventional commits, in English, **scope required** (enforced by commitlint).
  Workspace scopes are auto-generated from `packages/` and `apps/` directories;
  `deps`, `tooling`, `ci`, `docs` and `meta` are hand-listed for everything else.
  Pick the type by what changed: `feat`/`fix` for engine behavior, `docs`, `test`,
  `ci`, `build`, `refactor` for the rest.
- No AI attribution: no `Co-Authored-By: Claude`, no "Generated with" footers, in
  commits or PR descriptions.
- Use `Closes #N` / `Fixes #N` in PR descriptions so issues auto-close.
- **Every PR gets a self-review before it is opened**, run as a loop: all four
  gates green → read every changed file line by line → check the conventions in
  this file → hygiene (no dead code, no leftover debug output). Fix everything
  found, then re-run the **whole** pass. Only stop when a complete pass returns
  LGTM — zero findings. Green CI is the entry ticket to the review, never the
  review itself.
