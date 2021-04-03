import { Wizarding } from '../src/Wizarding.js';
import { Editing } from '../src/Editing.js';
import { LitElement, customElement } from 'lit-element';

@customElement('mock-wizard-editor')
export class MockWizardEditor extends Wizarding(Editing(LitElement)) {}
