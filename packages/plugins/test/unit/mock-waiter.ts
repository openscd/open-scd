import { Waiting } from '@openscd/open-scd/src/Waiting.js';
import { LitElement, customElement } from 'lit-element';

@customElement('mock-waiter')
export class MockWaiter extends Waiting(LitElement) {}
