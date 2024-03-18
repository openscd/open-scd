import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import { isPublic, Wizard } from '@openscd/open-scd/src/foundation.js';

function render(
  name: string | null,
  connectivityNode: string | null,
  cNodeName: string | null,
  reservedNames: string[]
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get('terminal.wizard.nameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
      readonly
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="connectivityNode"
      .maybeValue=${connectivityNode}
      helper="${get('terminal.wizard.connectivityNodeHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      readonly
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="cNodeName"
      .maybeValue=${cNodeName}
      helper="${get('terminal.wizard.cNodeNameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      readonly
    ></wizard-textfield>`,
  ];
}

export function editTerminalWizard(element: Element): Wizard {
  const reservedNames = Array.from(
    element.parentNode!.querySelectorAll('ConnectivityNode')
  )
    .filter(isPublic)
    .map(cNode => cNode.getAttribute('name') ?? '')
    .filter(name => name !== element.getAttribute('name'));

  return [
    {
      title: get('terminal.wizard.title.edit'),
      element,
      content: render(
        element.getAttribute('name'),
        element.getAttribute('connectivityNode'),
        element.getAttribute('cNodeName'),
        reservedNames
      ),
    },
  ];
}
