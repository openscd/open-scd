import { LitElement, customElement } from 'lit-element';
import { Wizarding } from '../src/wizarding/index.js';

@customElement('mock-wizard')
export class MockWizard extends Wizarding(LitElement) {}
