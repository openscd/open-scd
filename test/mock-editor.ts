import { LitElement, customElement } from 'lit-element';
import { Editing } from '../src/editing.js';
import { emptySCD } from './mock-document.js';

@customElement('mock-editor')
export class MockEditor extends Editing(LitElement) {
  doc = emptySCD();
}
