import { LitElement, customElement } from 'lit-element';
import { Plugging } from '@openscd/open-scd/src/Plugging.js';
import { Editing } from '@openscd/open-scd/src/Editing.js';
import { Historing } from '@openscd/open-scd/src/Historing.js';

@customElement('mock-plugger')
export class MockPlugger extends Plugging(Editing(Historing(LitElement))) {}
