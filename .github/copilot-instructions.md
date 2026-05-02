# Workspace Copilot Instructions

> These instructions apply to the entire monorepo.
> Each app may define its own additional rules — see the paths below.

---

## Project structure

```
/
├── apps/
│   ├── web/        # Angular frontend
│   └── api/        # Backend / API
├── libs/       # openapi generation
└── .github/
    └── copilot-instructions.md   ← you are here
```

---

## Global rules (apply everywhere)

- Language: **TypeScript** strict mode across all apps and packages
- Do not generate JavaScript files — always `.ts`
- Use **ESLint** and **Prettier** with project config (do not override)
- Do not add console.log in production code
- All code comments must be written in **English**
- Respect the folder structure of each app — do not move or rename existing folders

---

## Rules per app

### `/apps/web` — Angular frontend

> Full rules: `apps/web/.github/copilot-instructions.md`
>
> **When editing any file inside `/apps/web/**`, apply those rules with priority.\*\*

Key rules summary (copied here for guaranteed context):

- Framework: **Angular** (latest version in the project)
- Use **standalone components** — no NgModules unless already present
- File naming: `feature-name.component.ts` / `.html` / `.scss`
- Always use **OnPush** change detection strategy
- Use **signals** for local state where possible
- Do not use `any` type — always type explicitly
- Styles: **SCSS** scoped to each component
- Do not use jQuery or direct DOM manipulation
- Routing: use `loadComponent` (lazy loading) — never eager imports in routes
- HTTP calls must go through a **service** — never directly in a component
- Use cdk components for accessibility and consistency where possible
- Use /apps/web/src/style for shared styles and design tokens always — do not hardcode values in components

---

### `/apps/api` — Backend / API

> Full rules: `apps/api/.github/copilot-instructions.md` (if it exists)
>
> **When editing any file inside `/apps/api/**`, apply those rules with priority.\*\*

Key rules summary:

- Runtime: **Node.js** with TypeScript
- Follow **REST** conventions for endpoint naming
- Validate all inputs at the controller layer
- Never expose internal errors to the client response
- Use environment variables for secrets — never hardcode them

---

## How Copilot should resolve rule conflicts

1. **App-level rules take priority** over global rules when working inside `/apps/web` or `/apps/api`
2. **Global rules apply** to shared packages and root-level files
3. When in doubt, follow the rule that is **more specific** to the file being edited

---

## What Copilot should NOT do

- Do not generate `.js` or `.jsx` files anywhere in this project
- Do not suggest installing packages without asking first
- Do not reformat files outside the scope of the current task
- Do not generate placeholder comments like `// TODO: implement this`
