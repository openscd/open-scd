import { LitElement, customElement } from 'lit-element';
import { Historing } from '../../src/Historing.js';

@customElement('mock-history')
export class MockHistory extends Historing(LitElement) {}
