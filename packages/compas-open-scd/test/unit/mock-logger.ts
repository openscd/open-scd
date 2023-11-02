import { LitElement, customElement } from 'lit-element';
import { Logging } from '../../src/Logging.js';

@customElement('mock-logger')
export class MockLogger extends Logging(LitElement) {}
