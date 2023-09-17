# How To Create a Wizard Plugin

A wizard plugin:
- must be a default-exported custom element class that extends `HTMLElement` 
- it needs the following public static functions:
  - `canInspect: (tagName: string) => boolean`: to decide if the wizard supports viewing and editing of given elements
  - `canCreate: (tagName: string) => boolean`: to decide if the wizard supports the creation of given elements


- An inspector wizard must accept the `element: Element` property
- A creator wizard must accept the `parent: Element` and `tagName: string` properties
- A wizard can be a creator and an inspector wizard at the same time

