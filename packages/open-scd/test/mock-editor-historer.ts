import { LitElement, customElement } from 'lit-element';

import { Historing } from '../src/Historing.js';
import { Editing } from '../src/Editing.js';

@customElement('mock-editor-historer')
export class MockEditorHistorer extends Historing(Editing(LitElement)) {}
