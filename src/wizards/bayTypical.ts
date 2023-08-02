import { html, TemplateResult } from 'lit-html';
import { get } from 'lit-translate';
import { getBayTypicals } from '../editors/sitipe/sitipe-service.js';
import { Wizard } from '../foundation.js';

function render(): TemplateResult {
  getBayTypicals().then(res => {
    console.log('res', res);
  });
  return html`<span>Test</span>`;
}
export function bayTypicalWizard(): Wizard {
  return [
    {
      title: get('voltagelevel.wizard.title.edit'),
      content: [render()],
    },
  ];
}
