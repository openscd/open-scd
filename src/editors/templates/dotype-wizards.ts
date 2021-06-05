import { html } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  identity,
  newActionEvent,
  newWizardEvent,
  patterns,
  selector,
  Wizard,
} from '../../foundation.js';

import { updateIDNamingAction } from './foundation.js';

export function dOTypeWizard(
  dOTypeIdentity: string,
  doc: XMLDocument
): Wizard | undefined {
  const dotype = doc.querySelector(selector('DOType', dOTypeIdentity));
  if (!dotype) return undefined;

  return [
    {
      title: get('dotype.wizard.title.edit'),
      primary: {
        icon: '',
        label: get('save'),
        action: updateIDNamingAction(dotype),
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
                  parent: dotype.parentElement!,
                  element: dotype,
                  reference: dotype.nextElementSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        html`<wizard-textfield
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${dotype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${dotype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="CDC"
          helper="${translate('scl.CDC')}"
          .maybeValue=${dotype.getAttribute('cdc')}
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<section>
          <mwc-button
            slot="graphic"
            icon="playlist_add"
            trailingIcon
            label="${translate('scl.DO')}"
          ></mwc-button>
          <mwc-button
            slot="graphic"
            icon="playlist_add"
            trailingIcon
            label="${translate('scl.DA')}"
          ></mwc-button>
        </section>`,
        html`
          <mwc-list style="margin-top: 0px;">
            ${Array.from(dotype.querySelectorAll('SDO, DA')).map(
              daorsdo =>
                html`<mwc-list-item
                  twoline
                  tabindex="0"
                  value="${identity(daorsdo)}"
                  ><span>${daorsdo.getAttribute('name')}</span
                  ><span slot="secondary"
                    >${daorsdo.getAttribute('bType') === 'Enum' ||
                    daorsdo.getAttribute('bType') === 'Struct'
                      ? '#' + daorsdo.getAttribute('type')
                      : daorsdo.getAttribute('bType')}</span
                  ></mwc-list-item
                >`
            )}
          </mwc-list>
        `,
      ],
    },
  ];
}
