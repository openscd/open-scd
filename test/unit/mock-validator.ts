import { Validating } from '../../src/Validating.js';
import { LitElement, customElement } from 'lit-element';

@customElement('mock-validator')
export class MockValidator extends Validating(LitElement) {}
