# finder-list

## Properties

| Property    | Attribute   | Modifiers | Type                                 | Default                                          |
|-------------|-------------|-----------|--------------------------------------|--------------------------------------------------|
| `container` |             |           | `Element`                            |                                                  |
| `depth`     | `depth`     | readonly  | `number`                             |                                                  |
| `loaded`    |             |           | `Promise<void>`                      | "Promise.resolve()"                              |
| `multi`     | `multi`     |           | `boolean`                            | false                                            |
| `path`      | `path`      |           | `Path`                               |                                                  |
| `paths`     | `paths`     |           | `Path[]`                             |                                                  |
| `read`      |             |           | `(path: Path) => Promise<Directory>` | "async path => {\n    return {\n      path,\n      header: html`<h2>${'/' + path.join('/')}</h2>`,\n      entries: [],\n    };\n  }" |
| `selection` | `selection` |           | `Selection`                          | {}                                               |

## Methods

| Method             | Type                                             |
|--------------------|--------------------------------------------------|
| `getDisplayString` | `(entry: string, path: string[]): string`        |
| `getTitle`         | `(path: string[]): string`                       |
| `multiSelect`      | `(event: SingleSelectedEvent, path: Path, clicked: string): void` |
| `renderColumn`     | `(column: number): Promise<TemplateResult>`      |
| `renderDirectory`  | `(path: Path, entries: string[]): TemplateResult` |
| `select`           | `(event: SingleSelectedEvent, path: Path): Promise<void>` |
| `singleSelect`     | `(event: SingleSelectedEvent, path: Path, clicked: string): void` |
