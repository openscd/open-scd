import { LitElement, customElement } from 'lit-element';
import { Plugging } from '../../src/Plugging.js';
import { Editing } from 'open-scd/src/Editing.js';
import { Historing } from '../../src/Historing.js';

@customElement('mock-compas-plugger')
export class MockCompasPlugger extends Plugging(
  Editing(Historing(LitElement))
) {}
