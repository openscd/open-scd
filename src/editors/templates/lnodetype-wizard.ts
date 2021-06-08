import { html } from 'lit-element';
import { get, translate } from 'lit-translate';
import {
  EditorAction,
  getValue,
  identity,
  newActionEvent,
  newWizardEvent,
  patterns,
  selector,
  Wizard,
  WizardActor,
  WizardInput,
} from '../../foundation.js';

function updateLNodeTypeAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const lnClass = getValue(inputs.find(i => i.label === 'lnClass')!)!;

    if (
      id === element.getAttribute('id') &&
      desc === element.getAttribute('desc') &&
      lnClass == element.getAttribute('lnClass')
    )
      return [];

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('id', id);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    newElement.setAttribute('lnClass', lnClass);

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function lNodeTypeWizard(
  lNodeTypeIdentity: string,
  doc: XMLDocument
): Wizard | undefined {
  const lnodetype = doc.querySelector(selector('LNodeType', lNodeTypeIdentity));
  if (!lnodetype) return undefined;

  return [
    {
      title: get('dotype.wizard.title.edit'),
      primary: {
        icon: '',
        label: get('save'),
        action: updateLNodeTypeAction(lnodetype),
      },
      content: [
        html`<mwc-button
          icon="delete"
          trailingIcon
          label="${translate('delete')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: lnodetype.parentElement!,
                  element: lnodetype,
                  reference: lnodetype.nextElementSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        html`<wizard-textfield
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${lnodetype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${lnodetype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="lnClass"
          helper="${translate('scl.lnClass')}"
          .maybeValue=${lnodetype.getAttribute('lnClass')}
          required
          pattern="${patterns.lnClass}"
        ></wizard-textfield>`,
        html` <mwc-button
          slot="graphic"
          icon="playlist_add"
          trailingIcon
          label="${translate('scl.DO')}"
        ></mwc-button>`,
        html`
          <mwc-list style="margin-top: 0px;">
            ${Array.from(lnodetype.querySelectorAll('DO')).map(
              doelement =>
                html`<mwc-list-item
                  twoline
                  tabindex="0"
                  value="${identity(doelement)}"
                  ><span>${doelement.getAttribute('name')}</span
                  ><span slot="secondary"
                    >${'#' + doelement.getAttribute('type')}</span
                  ></mwc-list-item
                >`
            )}
          </mwc-list>
        `,
      ],
    },
  ];
}
