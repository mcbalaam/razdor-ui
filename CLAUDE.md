# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install                  # Install dependencies
bun run storybook            # Start Storybook dev server (port 6006)
bun run build                # Build library to dist/
bun run build-storybook      # Build static Storybook
```

The build runs two steps: `bun build` (bundles ESM to `dist/`) then `tsc --project tsconfig.build.json` (emits `.d.ts` declaration files only).

## Architecture

This is a React component library published to GitHub Packages as `@mcbalaam/razdor-ui`.

- **Entry point**: `src/index.ts` — all public exports go here
- **Components**: `src/components/<ComponentName>/` — each has `index.tsx`, `styles.css`, and optionally `ComponentName.stories.tsx`
- **Build output**: `dist/` — ESM bundle + TypeScript declarations; `react` and `react-dom` are external peer deps

### Component pattern

```typescript
export default function ComponentName({
  children,
  prop = defaultValue,
}: PropsWithChildren<{ prop?: Type }>) { ... }
```

- CSS classes are concatenated manually with template literals (no CSS modules, no classnames utility)
- FontAwesome icons are passed as props typed as `typeof faIcons`
- `@fortawesome/fontawesome-svg-core` is a runtime dependency; `react-fontawesome` and icon sets are devDependencies

### TypeScript

- `"moduleResolution": "bundler"` + `"verbatimModuleSyntax": true` — use `import type` for type-only imports
- `tsconfig.build.json` extends the base but disables `verbatimModuleSyntax` and enables declaration emit for the npm build

### Storybook

Stories live alongside components and are excluded from the library build. Story title convention: `"COMPONENTS/ComponentName"`.
