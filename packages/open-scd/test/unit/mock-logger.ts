import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Historing } from '../../src/Historing.js';

@customElement('mock-logger')
export class MockLogger extends Historing(LitElement) {}
