# Wizarding API

This document describes the wizarding API of `open-scd` and how plugin authors can use it call wizards.
It is meant for plugin developers and requires understanding of basic web development.

> *Info:* To find out how to create a wizard see: [How To Create A Wizard Plugin](../how-to/create-a-wizard-plugin.md)

## Purpose

Often plugins need a way to display, edit and create SCD elements.
Wizards plugins enable a uniformed, central and reusable way of of managing SCD elements.
They are available for all plugins through specific events.
Distributers can install differnt set of wizards.
Wizards can manage multiple types of SCD elements and an element can be managed by multiple wizards.

## API Specification

In this section we define the lifecycle of a wizard plugin and describe each step.

### Structure

```txt
┌─────────────────────────────────────────────────┐
│Core                                             │
│   ┌─────────────┐┌─────────────┐┌─────────────┐ │
│   │Editor Plugin││Menu Plugin  ││Wizard Plugin│ │
│   └─────────────┘└─────────────┘└─────────────┘ │
└─────────────────────────────────────────────────┘
```

We separate editors and wizards so that wizards can be used by other editors.
This, of course, could create a coupling between plugins, so a default or
fallback wizard is necessary to handle all elements e.g.: a generic XML editor

#### Lifecycle

```txt
┌─────────────────┐ ┌───────────┐┌─────────────────┐    ┃
│  Editor Plugin  │ │   Core    ││  Wizard Plugin  │    ┃  LEGEND
└─────────────────┘ └───────────┘└─────────────────┘    ┃  ┌───────────┐
         │                │               │             ┃  │  <name>   │   module with lifeline
         │                │               │             ┃  └─────┬─────┘
         │                │◀───register───│             ┃        │
         │───register────▶│               │             ┃        │
         │                │               │             ┃        │
         │   requests a   │               │             ┃        │
         │───wizard for──▶│               │             ┃
         │    a given     │  asks wizard  │             ┃
         │                │───if it can ─▶│             ┃  ──<desc.>  ───▶  Initiated action
         │                │ handle given  │             ┃
         │                │               │             ┃
         │                │◀ ─ ─answer ─ ─│             ┃  ─ <answer>  ─ ▶  Answer to an action
         │                │               │             ┃
         │                │   initiates   │             ┃  ═══<name>═════▶  event
         │                │    wizard     │             ┃
         │                │───with the ──▶│             ┃            ┌─┐
         │                │     given    ┌┴┐            ┃            │ │
         │                │    element   │ │            ┃            │ │    Internal process
         │                │              │ │wizarding   ┃            │ │
         │                │              │ │process     ┃            │ │
         │                │              │ │            ┃            │ │
         │                │              │ │            ┃            └─┘
         │                │              └┬┘            ┃
         │                │               │             ┃
         │                │◀════done══════│             ┃
         │                │               │             ┃
         │                │────close─────▶│             ┃
         │                │               X             ┃
         │                │                             ┃
         │                │                             ┃
         X                X                             ┃
```

#### Registration

Adding a wizard plugin to OpenSCD happens the same way as adding other plugins:
- as a distributor you can add it to you default set of plugins in the [plugin.js](../../public/js/plugin.js) file
- as a user you can add the plugin through the UI

#### Prerequisites

A wizard has two capabilities:
- inspection: view and/or edit an existing element
- creation: create a new element under a parent element

For that Wizards must have two public static functions:
- `canInspect: (tagName: string) => boolean`: to decide if the wizard supports viewing and editing of given elements
- `canCreate: (tagName: string) => boolean`: to decide if the wizard supports the creation of given elements

OpenSCD will call these functions when it tries to figure out which wizard supports
the given element and action.

##### Requests

We request a wizard through events.

For viewing and/or editing purposes we can request an inspection.
The event is called `oscd-wizard-inspection-request` and its details look like this:

```ts
type WizardInspectionRequest = {
  element: Element,
}
```

The other possible request is to create a new element under a parent element.
The event is called `oscd-wizard-creation-request` and its details look like this
```ts
type WizardCreationRequest = {
  parent: Element,
  tagName?: string,
}
```

> **ℹ️ INFO:** you can find the up-to-date definitions here: [wizard-host.ts](../../src//wizard-host.ts)

##### Finding Available Wizards

When OpenSCD receives one of the above mentioned events it will go and ask the
wizards if they can handle the element and action.
It will call:
- `canInspect` if the event is `oscd-wizard-inspection-request`
- `canCreate` if the event is `oscd-wizard-creation-request`.

##### Initiation

In case of inspection the wizard would get the element.
_e.g.:_
```html
<oscd-wizard-type-templates .element={element}></oscd-wizard-type-templates>
```
_e.g.:_
If we want to create a new element it will get the parent element and the new tag name it has to create. Something like this:
```html
<oscd-wizard-type-templates .parentElement={parentElement} .tagName="DO"></oscd-wizard-type-templates>
```

##### Wizarding Process

This part happens entirely in the wizard plugin.
It can modify the XML document or just display it in some user-friendly way.

##### Finishing

The wizard decides when it is finished and informs OpenSCD through an event.

At this point OpenSCD can decide if it wants to close the wizard.

OpenSCD has always the possibility to close the wizard.
For example when clicking on the backdrop of a dialog.

* * *

## Relevant Decisions

⚖️ [ADR-0002: Wizarding API](../adr/0002-wizarding-api.md)

