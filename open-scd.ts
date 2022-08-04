import { LitElement } from 'lit';
import { Editing } from './mixins/Editing.js';

window.customElements.define('open-scd', Editing(LitElement));
