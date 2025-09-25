# Wizarding in OpenSCD

## OpenSCD

The current wizarding functionality in OpenSCD consists of these key components:

1. **`<oscd-wizards>`** (`packages/openscd/src/addons/Wizards.ts`)
   - Central wizard queue manager
   - Listens for `wizard` events on the host element
   - Manages FIFO workflow of wizard factories

2. **`<wizard-dialog>`** (`packages/openscd/src/wizard-dialog.ts`)
   - Renders wizard pages and handles user interactions
   - Dispatches editor actions when wizard completes

3. **Host Integration** (`packages/openscd/src/open-scd.ts`)
   ```typescript
   render(): TemplateResult {
     return html`<oscd-waiter>
       <oscd-settings .host=${this}>
         <oscd-wizards .host=${this}>
           <oscd-history .host=${this}>
             <!-- ... rest of the app -->
   ```

**How it works:**

1. **Wizard creation**: plugins create wizard definitions
   ```typescript
   // Example from ied-container.ts
   private openEditWizard(): void {
     const wizard = wizards['IED'].edit(this.element);
     if (wizard) this.dispatchEvent(newWizardEvent(wizard));
   }
   ```

2. **Event dispatching**: wizards are triggered by dispatching `wizard` events
   ```typescript
   // From foundation.ts
   export function newWizardEvent(
     wizardOrFactory?: Wizard | WizardFactory,
     eventInitDict?: CustomEventInit<Partial<WizardDetail>>
   ): WizardEvent
   
   // Usage examples:
   this.dispatchEvent(newWizardEvent(wizardFactory));  // Open wizard
   this.dispatchEvent(newWizardEvent());               // Close wizard
   this.dispatchEvent(newWizardEvent(subWizard, { detail: { subwizard: true } })); // Subwizard
   ```

3. **Central processing**: The `<oscd-wizards>` component catches all wizard events
   ```typescript
   // From Wizards.ts
   private onWizard(we: WizardEvent) {
     const wizard = we.detail.wizard;
     if (wizard === null) this.workflow.shift();
     else if (we.detail.subwizard) this.workflow.unshift(wizard);
     else this.workflow.push(wizard);
   }
   ```

4. **Dialog rendering**: The central `<wizard-dialog>` renders the current wizard

## scl-wizarding plugin

The [scl-wizarding plugin](https://github.com/OpenEnergyTools/scl-wizarding) is an alternative wizarding system designed specifically for SCL operations with simplified events.

**Key differences from OpenSCD:**

- **Simplified Events**: Uses element-focused events instead of wizard factories
   ```typescript
   // scl-wizarding events:
   this.dispatchEvent(newEditWizardEvent(element));           // Edit element
   this.dispatchEvent(newCreateWizardEvent(parent, tagName)); // Create element
   
   // vs OpenSCD events:
   this.dispatchEvent(newWizardEvent(wizardFactory));
   ```

- **Pre-built wizard registry**: SCL element types with ready-made wizards
   ```typescript
   // Comprehensive wizard coverage for SCL elements:
   // Substation, VoltageLevel, Bay, ConductingEquipment, PowerTransformer,
   // IED, LDevice, LNode, ConnectedAP, LNodeType, DOType, DAType, etc.
   ```


**Usage:**
```typescript
// Edit existing SCL element
private editElement(): void {
  this.dispatchEvent(newEditWizardEvent(this.element));
}

// Create new SCL element
private createElement(): void {
  this.dispatchEvent(newCreateWizardEvent(parentElement, 'ConductingEquipment'));
}
```

## Moving away from centralised wizarding

Both the OpenSCD centralised wizarding and the scl-wizarding plugin represent centralised approaches that should be migrated away from in favour of plugin-based solutions.

### Migration strategy

**Step 1: Identify current usage**
```typescript
// Look for these patterns in your plugins:

// OpenSCD centralised:
this.dispatchEvent(newWizardEvent(wizard));

// scl-wizarding:
this.dispatchEvent(newEditWizardEvent(element));
this.dispatchEvent(newCreateWizardEvent(parent, tagName));
```

**Step 2: Replace with direct dialog management**

Instead of dispatching events to a central wizard system, manage dialog state directly in your plugin component:

```typescript
// BEFORE: Centralized approach - events go to external wizard system
export class MyPlugin extends LitElement {
  private openEditWizard(): void {
    // Event gets handled by <oscd-wizards> or scl-wizarding
    this.dispatchEvent(newWizardEvent(wizard));           // OpenSCD
    // OR
    this.dispatchEvent(newEditWizardEvent(this.element)); // scl-wizarding
  }
  
  render() {
    return html`
      <mwc-icon-button icon="edit" @click=${this.openEditWizard}></mwc-icon-button>
      <!-- No dialog here - it's handled by external system -->
    `;
  }
}

// AFTER: Direct management - plugin controls its own dialogs
export class MyPlugin extends LitElement {
  @state() private showEditDialog = false;
  @state() private currentElement: Element | null = null;

  private openEditor(element: Element): void {
    // No events dispatched - just update local state
    this.currentElement = element;
    this.showEditDialog = true;
  }
  
  render() {
    return html`
      <mwc-icon-button icon="edit" @click=${() => this.openEditor(element)}></mwc-icon-button>
      
      <!-- Plugin renders its own dialog directly -->
      ${this.showEditDialog ? html`
        <my-edit-dialog 
          .element=${this.currentElement}
          @close=${() => this.showEditDialog = false}
        ></my-edit-dialog>
      ` : nothing}
    `;
  }
}
```

**Key difference:** Instead of sending events to external systems, your plugin directly controls when dialogs open/close using its own state.

**Step 3: Implement plugin-specific dialogs**

Here are minimal examples showing the modern approach with `newEditEvent`:

**Edit dialog example:**
```typescript
// simple-edit-dialog.ts
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { newEditEvent } from '@openscd/open-scd-core';

@customElement('simple-edit-dialog')
export class SimpleEditDialog extends LitElement {
  @property({ attribute: false }) element!: Element;
  @property() open = false;

  private onSave() {
    const name = this.shadowRoot?.querySelector('#name')?.value;
    if (!name) return;

    const update = {
      element: this.element,
      attributes: { name }
    };
    this.dispatchEvent(newEditEvent(update));
    this.close();
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  render() {
    return html`
      <mwc-dialog .open=${this.open} @closed=${this.close}>
        <input 
          id="name" 
          placeholder="Name" 
          .value=${this.element.getAttribute('name') ?? ''}
        />
        <mwc-button slot="secondaryAction" @click=${this.close}>Cancel</mwc-button>
        <mwc-button slot="primaryAction" @click=${this.onSave}>Save</mwc-button>
      </mwc-dialog>
    `;
  }
}
```

**Create dialog example:**
```typescript
// simple-create-dialog.ts
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { newEditEvent, Insert } from '@openscd/open-scd-core';

@customElement('simple-create-dialog')
export class SimpleCreateDialog extends LitElement {
  @property({ attribute: false }) parent!: Element;
  @property() tagName!: string;
  @property() open = false;

  private onCreate() {
    const name = this.shadowRoot?.querySelector('#name')?.value;
    if (!name) return;

    const doc = this.parent.ownerDocument!;
    const newElement = doc.createElement(this.tagName);
    newElement.setAttribute('name', name);
    
    const insert: Insert = {
      parent: this.parent,
      node: newElement,
      reference: null
    };
    this.dispatchEvent(newEditEvent(insert));
    this.close();
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  render() {
    return html`
      <mwc-dialog .open=${this.open} @closed=${this.close}>
        <input id="name" placeholder="Name" />
        <mwc-button slot="secondaryAction" @click=${this.close}>Cancel</mwc-button>
        <mwc-button slot="primaryAction" @click=${this.onCreate}>Create</mwc-button>
      </mwc-dialog>
    `;
  }
}
```

**Usage in plugin:**
```typescript
// In your plugin component
@state() private showEditDialog = false;
@state() private showCreateDialog = false;
@state() private editElement?: Element;

private openEditor(element: Element) {
  this.editElement = element;
  this.showEditDialog = true;
}

private openCreator() {
  this.showCreateDialog = true;
}

render() {
  return html`
    <mwc-icon-button icon="edit" @click=${() => this.openEditor(element)}></mwc-icon-button>
    <mwc-icon-button icon="add" @click=${() => this.openCreator()}></mwc-icon-button>
    
    <simple-edit-dialog
      .element=${this.editElement}
      .open=${this.showEditDialog}
      @close=${() => this.showEditDialog = false}
    ></simple-edit-dialog>
    
    <simple-create-dialog
      .parent=${this.parentElement}
      tagName="Function"
      .open=${this.showCreateDialog}
      @close=${() => this.showCreateDialog = false}
    ></simple-create-dialog>
  `;
}
```