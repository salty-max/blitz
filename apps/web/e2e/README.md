# End-to-end flows (Playwright)

Browser flows covering the critical codex paths, so the manual click-throughs
done during development are caught as regressions. Every selector is a
`data-testid`, which survives copy and EN/FR locale changes.

## Run

```sh
bun run test:e2e        # from the repo root: builds the web app, then runs the flows
```

`test:e2e` builds `@blitz/web`, and Playwright's `webServer` serves the build on
`http://localhost:4173`. The browser is installed once with:

```sh
bun run --cwd apps/web e2e:install
```

## Flows

- `landing` — the landing hero CTA opens the codex.
- `codex-nav` — category cards route to their pages; the masthead marks the
  active section (`data-status`) and the breadcrumb tracks the location.
- `ref-drawer` — open the reference drawer, push a nested entry onto the
  back-stack, pop it, close.
- `chips` — skill and special-rule chips both open the drawer.
- `team-chips` — a team chip navigates to that team's roster.
- `stars` — the "hireable by" team filter and the name/skill search.
- `teams` — the tier filter.
