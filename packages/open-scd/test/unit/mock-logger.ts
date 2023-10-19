import { LitElement, customElement } from 'lit-element';
import { Historing } from '../../src/Logging.js';

@customElement('mock-logger')
export class MockLogger extends Historing(LitElement) {}
