# OpenSCD Contributing Guide

Hi! We're really excited that you're interested in contributing to OpenSCD! Before submitting your contribution, please read through the following guide.

The easiest way to get in touch is to join us on the [↗ Zulip Chat](https://openscd.zulipchat.com/join/k3cyur3wx526tvafkjwubhjn/). 
If you say "hi" there we will be more than happy to help you find your way around this project.

## Repo Setup

To develop locally, fork the Vite repository and clone it in your local machine. The Vite repo is a [↗ monorepo](https://en.wikipedia.org/wiki/Monorepo) using pnpm workspaces. The package manager used to install and link dependencies must be [↗ npm](https://docs.npmjs.com/cli/using-npm/workspaces).

To find out more about the development of each packages, such as the base distribution or the plugins, please refer to their respective READMEs:
- [open-scd](packages/openscd/README.md): provides the base distribution available on [openscd.github.io](https://openscd.github.io)
- [core](packages/core/README.md): provides the agreed api of OpenSCD Core


To develop, follow these steps :

1. Install [↗ Node.js](https://nodejs.org/en/download/package-manager)

> [!IMPORTANT]  
> `Node.js` version should be set to `20.x.x` as there are incompatibilities with higher version

2. Run `npm ci` in OpenSCD's root folder.

3. Run `npm run build` in OpenSCD's root folder.

4. Run `npm start` in OpenSCD's root folder.

> [!NOTE]
> If you run in the following error :
> `Lerna (powered by Nx)   Daemon process terminated and closed the connection`
> Rerun `npm start` and it should work as expected

To test, follow these steps :

1. Install a compatible compatible [↗ playright](https://playwright.dev/docs/browsers#introduction) browser 
2. Run `npx playwright install` in OpenSCD's root folder, to install a compatible `playright` browser libraries

> [!NOTE]
> If you are using `chromium`, you might need to add :
> `CHROME_PATH=path-to-your-chromium-app` in your .env file in OpenSCD's root folder, see `.env.example`.

## Pull Request Guidelines

- Checkout a topic branch from a base branch (e.g. `main`), and merge back against that branch.

- If adding a new feature:

  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first, and have it approved before working on it.

- If fixing a bug:

  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log (e.g. `fix: update entities encoding/decoding (fix #3899)`).
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

- It's OK to have multiple small commits as you work on the PR. GitHub can automatically squash them before merging.

- Make sure tests pass!

## Maintenance Guidelines

> The following section is mostly for maintainers who have commit access, but it's helpful to go through if you intend to make non-trivial contributions to the codebase.

## Notes on Dependencies

OpenSCD aims to be lightweight, and this includes being aware of the number of npm dependencies and their size.

### Think Before Adding a Dependency

Most deps should be added to `devDependencies` even if they are needed at runtime. Some exceptions are:

- Type packages. Example: `@types/*`.
- Deps that cannot be properly bundled due to binary files. Example: `esbuild`.
- Deps that ship their own types that are used in Vite's own public types. Example: `rollup`.

Avoid deps with large transitive dependencies that result in bloated size compared to the functionality it provides. For example, `http-proxy` itself plus `@types/http-proxy` is a little over 1MB in size, but `http-proxy-middleware` pulls in a ton of dependencies that make it 7MB(!) when a minimal custom middleware on top of `http-proxy` only requires a couple of lines of code.

### Ensure Type Support

OpenSCD `core` aims to be fully usable as a dependency in a TypeScript project. This means technically a dependency whose types are exposed needs to be part of `dependencies` instead of `devDependencies`. However, this also means we won't be able to bundle it.

## License

This contributing guide is derived from the one used by the [↗ ViteJS](https://github.com/vitejs/vite/blob/main/CONTRIBUTING.md) project, which is under the MIT License.