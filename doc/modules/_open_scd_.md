[open-scd](../README.md) › [Globals](../globals.md) › ["open-scd"](_open_scd_.md)

# Module: "open-scd"

## Index

### Namespaces

* [__global](_open_scd_.__global.md)

### Classes

* [OpenSCD](../classes/_open_scd_.openscd.md)

### Interfaces

* [LogEntry](../interfaces/_open_scd_.logentry.md)

### Type aliases

* [PendingStateEvent](_open_scd_.md#pendingstateevent)

### Variables

* [emptySCD](_open_scd_.md#const-emptyscd)

## Type aliases

###  PendingStateEvent

Ƭ **PendingStateEvent**: *CustomEvent‹Promise‹string››*

Defined in src/open-scd.ts:23

## Variables

### `Const` emptySCD

• **emptySCD**: *Document* = document.implementation.createDocument(
  'http://www.iec.ch/61850/2003/SCL',
  'SCL',
  null
)

Defined in src/open-scd.ts:37
