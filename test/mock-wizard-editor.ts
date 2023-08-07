import { Wizarding } from '../src/wizarding/index.js';
import { Editing } from '../src/Editing.js';
import { LitElement, customElement } from 'lit-element';

@customElement('mock-wizard-editor')
export class MockWizardEditor extends Wizarding(Editing(LitElement)) {}
