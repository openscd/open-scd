# Wizarding API

Date: 2023-07

## Status

Accepted

## Context

Often plugins need a way to display, edit and create SCD elements.
We want to avoid to put too much effort into implementing the same thing over and over again.
Also we want to speed up plugin development by extracting some common functionalities out of the plugins.


## Decision

We will create a new plugin type, wizard, and provide a wizarding API that enables the followings:
- Editor plugins can call wizards to display, edit or create specific SCD elements
- We can provide wizard plugins for specific SCD elements
- In case there are no wizard plugins installed we will have a simple, generic one


### API Specification

In this section we define the lifecycle of a wizard plugin and describe each step.

#### Structure

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

##### Registration

Registering a wizard plugin happens the same way as registering another plugin by defining
them in the `plugins` attribute of `open-scd`.

We will add the wizard type to our `PluginSet`.
```diff
- export type PluginSet = { menu: Plugin[]; editor: Plugin[] };
+ export type PluginSet = { menu: Plugin[]; editor: Plugin[], wizard: Plugin[] };
```

A wizard has two capabilities:
- inspection: view and/or edit an existing element
- creation: create a new element under a parent element

Wizards must have two public static functions called `canInspect` and `canCreate`.
`Core` will call these functions when it tries to figure out which wizard supports
the given element and action.
```ts
type CanInspect: (tagName: string) => boolean
type CanCreate: (tagName: string) => boolean
```

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

> **ℹ️ INFO:** you can find the up-to-date definitions here: TODO: file link

> **ℹ️ INFO**: More about other alternatives of requests: 
> [Alternatives for Requests](#alternatives-of-requests)

##### Finding Available Wizards

When `Core` receives one of the above mentioned events it will go and ask the
wizards if they can handle the element and action.
It will call:
- `CanInspect` if the event is `oscd-wizard-inspection-request` 
- `CanCreate` if the event is `oscd-wizard-creation-request`.

##### Initiation

In case of inspection the wizard would get the element. 
```html
<oscd-wizard-type-templates .element={element} .stuff={stuff}></oscd-wizard-type-templates>
```

If we want to create a new element it will get the parent element and the new tag name it has to create. Something like this:
```html
<oscd-wizard-type-templates .parentElement={parentElement} tag-name="DO" .stuff={stuff}></oscd-wizard-type-templates>
```


##### Wizarding Process

This part happens entirely in the wizard plugin. 
It can modify the XML document or just display it in some user-friendly way.

##### Finishing

The wizard decides when it is finished and informs `Core` through an event.

At this point `Core` can decide if it wants to close the wizard.

`Core` has always the possibility to close the wizard. 
For example when clicking on the backdrop of a dialog.

----

## Considered Options

### Define handled tag names in the plugin configuration

An alternative to the `CanHandle` static function is to define the
tag names in the plugin description e.g: in a string array called `handledTags`.

```ts
type WizardPlugin = Plugin & {
    handledTags: string[];
}
```

The advantage is that we can enforce their definition,
what we cannot do with a static functions as of now.
The disadvantages is that we cannot define the tags dynamically
Another neutral difference is that the handled tags definition is at
the registration point and not in the plugin's static function.
So it can happen that the plugin changes which tags it can handle
but we forget to change its configuration.


### Alternatives of Requests

#### [wizard-event.ts  ↗](https://github.com/ca-d/open-scd-core/blob/add-wizards/foundation/wizard-event.ts) by Christian Dinkel
In this definition there is only one event (`oscd-wizard-request`)
and two different event details (`CreateRequest` and `EditRequest`).
This way the plugins need to determine themselves which
event they got by examining each request.

With two different events, plugins can listen on one or both events and can be sure
which event they get without examining the event itself.
Additionally, two different actions usually have two different events.
For example `click` and `scroll`.



----

## Prior Art

The following documents influenced this ADR:
- Wizarding API historical overview: https://github.com/openscd/open-scd/discussions/1230
- Finalize wizarding API: https://github.com/openscd/open-scd-wizarding/issues/1
- Wizarding Addon: https://wiki.lfenergy.org/display/SHP/Wizarding+Addon



## Out of Scope

- Handling multiple active wizards

---
## Consequences

- By providing a default or fallback wizard the plugins does not have to know if a wizard is available
- With the wizarding API we need less deep linking between plugins
- We can extract common functionality into smaller plugins
- There will be more plugin that one have to maintain and install
