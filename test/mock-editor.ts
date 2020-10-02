import { LitElement, customElement, TemplateResult } from 'lit-element';
import { Editing } from '../src/editing.js';
import { emptySCD } from './mock-document.js';

@customElement('mock-editor')
export class MockEditor extends Editing(LitElement) {
  doc = emptySCD();
  render(): TemplateResult {
    return super.render();
  }
}
