import { LitElement, customElement } from 'lit-element';
import { Editing } from '@openscd/open-scd/src/Editing.js';

@customElement('mock-editor')
export class MockEditor extends Editing(LitElement) {}
