# blitz

A Blood Bowl toolkit for coaches: build and manage your teams, run leagues and
tournaments, and look anything up in a searchable codex.

## What it does

- **Team management** — draft a roster within the rules and your budget, then
  carry it through a season: SPP, advancements, lasting injuries, and team value.
- **League & tournament management** — set up a competition, schedule fixtures,
  record results, and track standings and progression.
- **Codex** — a clean, searchable reference for the rules, teams, skills, star
  players, and inducements, with in-app tooltips.

Targets **Blood Bowl: Third Season Edition (2025)**.

## Layout

- `packages/schema` — the data model (teams, players, skills, star players,
  inducements, league entities).
- `packages/data` — curated Blood Bowl reference data.
- `packages/resolver` — roster legality and budget validation.
- `packages/dsl` — the roster text format.
- `packages/engine` — a small odds helper (block / armour / injury) for tooltips.
- `apps/api` — the read + persistence API (teams and leagues).
- `apps/web` — the codex, team builder, and league/tournament manager.

## Toolchain

Bun + Turborepo, TypeScript strict, ESM only. See `CLAUDE.md` for conventions.

```sh
bun install
bun run typecheck
bun test
bun run lint
bun run build
```
