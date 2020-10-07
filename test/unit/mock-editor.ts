import { LitElement, customElement } from 'lit-element';
import { Editing } from '../../src/Editing.js';

@customElement('mock-editor')
export class MockEditor extends Editing(LitElement) {}
