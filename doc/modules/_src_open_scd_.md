[@material/progress-indicator](../README.md) › [Globals](../globals.md) › ["src/open-scd"](_src_open_scd_.md)

# Module: "src/open-scd"

## Index

### Namespaces

* [__global](_src_open_scd_.__global.md)

### Classes

* [OpenSCD](../classes/_src_open_scd_.openscd.md)

### Type aliases

* [PendingStateEvent](_src_open_scd_.md#pendingstateevent)

### Variables

* [emptySCD](_src_open_scd_.md#const-emptyscd)

## Type aliases

###  PendingStateEvent

Ƭ **PendingStateEvent**: *CustomEvent‹Promise‹string››*

Defined in src/open-scd.ts:17

## Variables

### `Const` emptySCD

• **emptySCD**: *Document* = document.implementation.createDocument(
  'http://www.iec.ch/61850/2003/SCL',
  'SCL',
  null
)

Defined in src/open-scd.ts:25
