import { LitElement, customElement } from 'lit-element';
import { Wizarding } from '@openscd/open-scd/src/Wizarding.js';

@customElement('mock-wizard')
export class MockWizard extends Wizarding(LitElement) {}
