import { LitElement, customElement } from 'lit-element';
import { Wizarding } from '../src/Wizarding.js';

@customElement('mock-wizard')
export class MockWizard extends Wizarding(LitElement) {}
