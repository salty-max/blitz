# blitz

A Blood Bowl toolkit: an exact dice-odds engine, a roster DSL, and a web UI.

> Know what a play is really worth before you commit the block.

## Why

Blood Bowl is a game of dice — blocks, dodges, rushes, passes, armour and injury,
all bent by skills and re-rolls. `blitz` computes the **exact** probabilities of
those plays (closed-form distributions, never simulation), so the odds on screen
are the real odds.

## Layout

- `packages/engine` — exact probability primitives + Blood Bowl dice (zero deps).
- `packages/schema` — the normalised data model (teams, positions, skills, rosters).
- `packages/dsl` — the roster text language.
- `packages/data` — curated Blood Bowl reference data.
- `packages/resolver` — binds a roster to its players, costs and legality.
- `apps/api` — read API over the data.
- `apps/web` — the web UI.

## Toolchain

Bun + Turborepo, TypeScript strict, ESM only.

```sh
bun install
bun run typecheck
bun test
bun run lint
bun run build
```
