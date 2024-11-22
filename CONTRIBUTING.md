# OpenSCD Contributing Guide

Hi! We're really excited that you're interested in contributing to OpenSCD! Before submitting your contribution, please read through the following guide.

The easiest way to get in touch is to join us on the [↗ Zulip Chat](https://openscd.zulipchat.com/join/k3cyur3wx526tvafkjwubhjn/). 
If you say "hi" there we will be more than happy to help you find your way around this project.

## Non-Code Contributions

You don't need to be a software developer to contribute to this effort!
Apart from contributions in the form of code we are also very thankful for
- [bug reports](https://github.com/openscd/open-scd/issues?q=is%3Aopen+type%3ABug)
  alerting us of errors in the `open-scd` component or its `foundation` library
  functions,
- [ideas for enhancements](https://github.com/openscd/open-scd/issues?q=is%3Aopen+type%3AFeature)
  to `open-scd` or its `foundation` library,
- [improvements to our wiki](https://github.com/openscd/open-scd/wiki)
  which contains knowledge about how to use both OpenSCD and SCL in general.

## Code Contributions

> [!NOTE]
> The following is a set of guidelines for contributing to [OpenSCD](https://github.com/openscd/open-scd#readme), not a list of strict rules.
> Use your best judgment and feel free to propose changes to this document in a pull request.

### Repo Setup

To develop locally, fork the OpenSCD repository and clone it in your local machine. The OpenSCD repo is a [↗ monorepo](https://en.wikipedia.org/wiki/Monorepo) using pnpm workspaces. The package manager used to install and link dependencies must be [↗ npm](https://docs.npmjs.com/cli/using-npm/workspaces).

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

### Commit Messages

* Use the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
  format for commit messages.
	
	> [!NOTE]
  > A commit should contain only one single change, so you should always be able to find a fitting type.
* Use the present tense ("feat: add feature" not "feat: added feature")
* Use the imperative mood ("fix: move cursor to..." not "fix: moves cursor
  to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Contributing Workflow and Branching Strategy

We like to receive code contributions through the [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow), which means every contributor maintains their own independent fork and sends pull requests directly from their own copy of the repo. This enables contributors to work as independently as possible, with the only point of coordination happening when a maintainer merges the incoming pull request.

A pull request should generally only ever contain at most one `fix` or `feat` commit, and never both. If you have several different bugs to fix or features to introduce, please create a separate pull request for each one. If a single bug fix or feature took you several commits to achieve, please squash those commits into one using an interactive rebase (see the great tutorial linked under "Forking Workflow" above) before submitting your pull request.

Please make sure that all CI checks are passing before marking your pull request "Ready for review".

### Filenames

If a file defines a custom element, it should always be named after its tag name (e.g. `my-component.ts`). Otherwise, files should generally be named after the most important symbol they export (e.g. `MyClass.ts`).

### Code Style and Linting

We use eslint and prettier for formatting and linting. We recommend you use your editor's or IED's eslint and prettier plugins for continuous formatting and linting while writing the code in order to avoid any surprises.

Apart from the rules the linter and formatter enforce, we adopt the following guidelines taken from the terse but broad [Deno Style Guide](https://deno.land/manual/contributing/style_guide) with some minor adjustments:

#### TODO Comments

In general, don't commit TODO or FIXME comments. Their significance tends to get lost in the mists of time and they cause more confusion than anything else.

If you are tempted to write a FIXME comment, please consider fixing the code immediately instead. If this is absolutely not possible, create a bug issue referencing your pull request which introduces the bug.

If you are tempted to write a TODO comment, please consider opening an issue describing the changes to be made instead.

If you still find it helpful to introduce a TODO comment, please include an issue or at least the author's github username in parentheses. Example:

```ts
// TODO(ry): Add tests.
// TODO(#123): Support Windows.
// FIXME(#349): Sometimes panics.
```
#### Exported functions: max 2 args, put the rest into an options object.

When designing function interfaces, stick to the following rules.

1. A function that is part of the public API takes 0-2 required arguments, plus (if necessary) an options object (so max 3 total).

2. Optional parameters should generally go into the options object.

	An optional parameter that's not in an options object might be acceptable if there is only one, and it seems inconceivable that we would add more optional parameters in the future.

3. The 'options' argument is the only argument that is a regular 'Object'.

	Other arguments can be objects, but they must be distinguishable from a 'plain' Object runtime, by having either:

	- a distinguishing prototype (e.g. `Array`, `Map`, `Date`, `class MyThing`).
	- a well-known symbol property (e.g. an iterable with `Symbol.iterator`).

	This allows the API to evolve in a backwards compatible way, even when the position of the options object changes.

```ts, ignore
// BAD: optional parameters not part of options object. (#2)
export function resolve(
  hostname: string,
  family?: "ipv4" | "ipv6",
  timeout?: number,
): IPAddress[] {}
```

```ts, ignore
// GOOD.
export interface ResolveOptions {
  family?: "ipv4" | "ipv6";
  timeout?: number;
}
export function resolve(
  hostname: string,
  options: ResolveOptions = {},
): IPAddress[] {}
```

```ts, ignore
export interface Environment {
  [key: string]: string;
}

// BAD: `env` could be a regular Object and is therefore indistinguishable
// from an options object. (#3)
export function runShellWithEnv(cmdline: string, env: Environment): string {}

// GOOD.
export interface RunShellOptions {
  env: Environment;
}
export function runShellWithEnv(
  cmdline: string,
  options: RunShellOptions,
): string {}
```

```ts
// BAD: more than 3 arguments (#1), multiple optional parameters (#2).
export function renameSync(
  oldname: string,
  newname: string,
  replaceExisting?: boolean,
  followLinks?: boolean,
) {}
```

```ts
// GOOD.
interface RenameOptions {
  replaceExisting?: boolean;
  followLinks?: boolean;
}
export function renameSync(
  oldname: string,
  newname: string,
  options: RenameOptions = {},
) {}
```

```ts
// BAD: too many arguments. (#1)
export function pwrite(
  fd: number,
  buffer: ArrayBuffer,
  offset: number,
  length: number,
  position: number,
) {}
```

```ts
// BETTER.
export interface PWrite {
  fd: number;
  buffer: ArrayBuffer;
  offset: number;
  length: number;
  position: number;
}
export function pwrite(options: PWrite) {}
```
#### Export all interfaces that are used as parameters to an exported member

Whenever you are using interfaces that are included in the parameters or return type of an exported member, you should export the interface that is used. Here is an example:

```ts, ignore
// my-file.ts
export interface Person {
  name: string;
  age: number;
}

export function createPerson(name: string, age: number): Person {
  return { name, age };
}

// mod.ts
export { createPerson } from "./my-file.js";
export type { Person } from "./my-file.js";
```
#### Minimize dependencies; do not make circular imports.

Try not to introduce external dependencies if you can avoid doing so.
In particular, be careful not to introduce circular imports.

#### If a filename starts with an underscore: `_foo.ts`, do not link to it.

There may be situations where an internal module is necessary but its API is not meant to be stable or linked to. In this case prefix it with an underscore. By convention, only files in its own directory should import it.

#### Use JSDoc for exported symbols.

We strive for complete documentation. Every exported symbol ideally should have a documentation line.

If possible, use a single line for the JSDoc. Example:

```ts
/** foo does bar. */
export function foo() {
  // ...
}
```

It is important that documentation is easily human-readable, but there is also a need to provide additional styling information to ensure generated documentation is more rich text. Therefore JSDoc should generally follow markdown markup to enrich the text.

While markdown supports HTML tags, it is forbidden in JSDoc blocks.

Code string literals should be braced with the back-tick (\`) instead of quotes.
For example:

```ts
/** Import something from the `foundation` module. */
```

Do not document function arguments unless they are non-obvious of their intent (though if they are non-obvious intent, the API should be considered anyways).
Therefore `@param` should generally not be used. If `@param` is used, it should not include the `type` as TypeScript is already strongly-typed.

```ts
/**
 * Function with non-obvious param.
 * @param foo Description of non-obvious parameter.
 */
```

Vertical spacing should be minimized whenever possible. Therefore, single-line comments should be written as:

```ts
/** This is a good single-line JSDoc. */
```

And not:

```ts
/**
 * This is a bad single-line JSDoc.
 */
```

Code examples should utilize markdown format, like so:

````ts
/** A straightforward comment and an example:
 * ```ts
 * import { foo } from "foundation.js";
 * foo("bar");
 * ```
 */
````

Code examples should not contain additional comments and must not be indented.
It is already inside a comment. If it needs further comments, it is not a good example.

#### Resolve linting problems using directives

Currently, the building process uses `eslint` to lint the code. If the task requires code that is non-conformant to linter use `eslint-disable-next-line<code>` directive to suppress the warning.

```typescript
/** Constructor type for defining `LitElement` mixins. */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type LitElementConstructor = new (...args: any[]) => LitElement;
```

This ensures the continuous integration process doesn't fail due to linting problems, but it should be used scarcely.

#### Each module should come with a test module.

Every module with public functionality `foo.ts` should come with a test module `foo.spec.ts`. This file should be a sibling to the tested module.

#### Top-level functions should not use arrow syntax.

Top-level functions should use the `function` keyword. Arrow syntax should be limited to closures.

Bad:

```ts
export const foo = (): string => {
  return "bar";
};
```

Good:

```ts
export function foo(): string {
  return "bar";
}
```
#### Prefer `#` over `private`

We prefer the private fields (`#`) syntax over `private` keyword of TypeScript in the standard modules codebase. The private fields make the properties and methods private even at runtime. On the other hand, `private` keyword of TypeScript guarantee it private only at compile time and the fields are publicly
accessible at runtime.

Good:

```ts
class MyClass {
  #foo = 1;
  #bar() {}
}
```

Bad:

```ts
class MyClass {
  private foo = 1;
  private bar() {}
}
```