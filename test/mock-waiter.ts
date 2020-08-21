import { Waiting } from '../src/waiting.js';
import { LitElement, customElement } from 'lit-element';

@customElement('mock-waiter')
export class MockWaiter extends Waiting(LitElement) {}
