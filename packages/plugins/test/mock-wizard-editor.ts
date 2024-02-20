import { Wizarding } from '@openscd/open-scd/src/Wizarding.js';
import { Editing } from '@openscd/open-scd/src/Editing.js';
import { LitElement, customElement } from 'lit-element';

@customElement('mock-wizard-editor')
export class MockWizardEditor extends Wizarding(Editing(LitElement)) {}
