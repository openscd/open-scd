import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import { isPublic, Wizard } from '@openscd/open-scd/src/foundation.js';

function render(
  name: string | null,
  pathName: string | null,
  reservedNames: string[]
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get('connectivitynode.wizard.nameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
      readonly
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="pathName"
      .maybeValue=${pathName}
      helper="${get('connectivitynode.wizard.pathNameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      readonly
    ></wizard-textfield>`,
  ];
}

export function editConnectivityNodeWizard(element: Element): Wizard {
  const reservedNames = Array.from(
    element.parentNode!.querySelectorAll('ConnectivityNode')
  )
    .filter(isPublic)
    .map(cNode => cNode.getAttribute('name') ?? '')
    .filter(name => name !== element.getAttribute('name'));

  return [
    {
      title: get('connectivitynode.wizard.title.edit'),
      element,
      content: render(
        element.getAttribute('name'),
        element.getAttribute('pathName'),
        reservedNames
      ),
    },
  ];
}
