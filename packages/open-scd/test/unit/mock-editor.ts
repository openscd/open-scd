import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Editing } from '../../src/Editing.js';

@customElement('mock-editor')
export class MockEditor extends Editing(LitElement) {}
