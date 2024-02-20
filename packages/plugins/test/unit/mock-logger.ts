import { LitElement, customElement } from 'lit-element';
import { Historing } from '@openscd/open-scd/src/Historing.js';

@customElement('mock-logger')
export class MockLogger extends Historing(LitElement) {}
