[open-scd](../README.md) › [Globals](../globals.md) › ["plugin"](_plugin_.md)

# Module: "plugin"

## Index

### Variables

* [plugin](_plugin_.md#const-plugin)
* [resolved](_plugin_.md#const-resolved)

## Variables

### `Const` plugin

• **plugin**: *(Anonymous function)* = directive(
  (src: string, value: unknown) => (part: NodePart) => {
    if (!resolved.has(part)) {
      const event = new CustomEvent('pending-state', {
        composed: true,
        bubbles: true,
        detail: import(src).then(() => resolved.add(part)),
      });
      part.startNode.parentNode!.dispatchEvent(event);
    }

    part.setValue(value);
  }
)

Defined in src/plugin.ts:5

___

### `Const` resolved

• **resolved**: *WeakSet‹object›* = new WeakSet()

Defined in src/plugin.ts:3
