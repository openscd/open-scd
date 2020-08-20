import { Logging } from '../src/logging.js';
import { LitElement, customElement } from 'lit-element';

@customElement('mock-logger')
export class MockLogger extends Logging(LitElement) {}
