import { ListItem } from '@material/mwc-list/mwc-list-item';
import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { get, translate } from 'lit-translate';

import {
  EditorAction,
  isEqual,
  isSame,
  newWizardEvent,
  SimpleAction,
  Wizard,
  WizardAction,
} from './foundation.js';

interface MergeOptions {
  title?: string;
}

type Diff<T> =
  | { ours: T; theirs: null }
  | { ours: null; theirs: T }
  | { ours: T; theirs: T };

function describe(element: Element): string {
  if (element.id) return element.id;
  if (
    element.tagName !== 'LDevice' &&
    element.hasAttribute('name') &&
    element.parentElement
  )
    return describe(element.parentElement) + ' ' + element.getAttribute('name');
  if (element.tagName === 'SCL') return '';

  return element.tagName;
}

function mergeWizardAction(
  attrDiffs: [string, Diff<string>][],
  childDiffs: Diff<Element>[],
  sink: Element,
  source: Element,
  options?: MergeOptions
): WizardAction {
  return (_, wizard: Element): EditorAction[] => {
    const actions: SimpleAction[] = [];
    const checkList = wizard.shadowRoot!.querySelector('mwc-list')!;

    const selectedAttrDiffs = (<ListItem[]>checkList.selected)
      .filter(item => item.classList.contains('attr'))
      .map(item => attrDiffs[(item.value as unknown) as number]);
    if (selectedAttrDiffs.length) {
      const newSink = <Element>sink.cloneNode(false);
      for (const [name, diff] of selectedAttrDiffs)
        if (diff.theirs === null) newSink.removeAttribute(name);
        else newSink.setAttribute(name, diff.theirs);
      actions.push({ old: { element: sink }, new: { element: newSink } });
    }

    const selectedChildDiffs = (<ListItem[]>checkList.selected)
      .filter(item => item.classList.contains('child'))
      .map(item => childDiffs[(item.value as unknown) as number]);
    if (selectedChildDiffs.length) {
      for (const diff of selectedChildDiffs)
        if (!diff.ours)
          actions.push({
            new: { parent: sink, element: diff.theirs, reference: null },
          });
        else if (!diff.theirs)
          actions.push({
            old: {
              parent: sink,
              element: diff.ours,
              reference: diff.ours.nextElementSibling,
            },
          });
        else
          wizard.dispatchEvent(
            newWizardEvent(
              mergeWizard(diff.ours, diff.theirs, {
                ...options,
                title: undefined,
              })
            )
          );
    }

    if (actions.length === 0) wizard.dispatchEvent(newWizardEvent());

    return [
      {
        actions,
        title: get('merge.log', {
          sink: describe(sink),
          source: describe(source),
          tag: sink.tagName,
        }),
      },
    ];
  };
}

export function mergeWizard(
  sink: Element,
  source: Element,
  options?: MergeOptions
): Wizard {
  const attrDiffs: [string, Diff<string>][] = [];
  const attributeNames = new Set(
    source.getAttributeNames().concat(sink.getAttributeNames())
  );

  for (const name of attributeNames)
    if (source.getAttribute(name) !== sink.getAttribute(name))
      attrDiffs.push([
        name,
        <Diff<string>>{
          theirs: source.getAttribute(name),
          ours: sink.getAttribute(name),
        },
      ]);

  const childDiffs: Diff<Element>[] = [];
  const ourChildren = Array.from(sink.children);
  const theirChildren = Array.from(source.children);

  theirChildren.forEach(theirs => {
    const twinIndex = ourChildren.findIndex(ourChild =>
      isSame(theirs, ourChild)
    );
    const ours = twinIndex > -1 ? ourChildren[twinIndex] : null;

    if (ours) ourChildren.splice(twinIndex, 1);
    if (ours && isEqual(theirs, ours)) return;

    if (!ours || !isEqual(theirs, ours)) childDiffs.push({ theirs, ours });
  });

  ourChildren.forEach(ours => childDiffs.push({ theirs: null, ours }));

  return [
    {
      title:
        options?.title ??
        get('merge.defaultTitle', {
          sink: describe(sink),
          source: describe(source),
          tag: sink.tagName,
        }),
      primary: {
        label: get('merge.action'),
        icon: 'merge_type',
        action: mergeWizardAction(attrDiffs, childDiffs, sink, source, options),
      },
      content: [
        html`
          <mwc-list multi>
            ${repeat(
              attrDiffs,
              e => e,
              ([name, diff], index) =>
                html`<mwc-check-list-item
                  value=${index}
                  class="attr"
                  twoline
                  left
                  hasMeta
                  style="--mdc-checkbox-checked-color: var(--mdc-theme-${diff.ours
                    ? diff.theirs
                      ? 'secondary'
                      : 'error'
                    : 'primary'});"
                >
                  <span>${name}</span>
                  <span slot="secondary"
                    >${diff.ours ?? ''}
                    ${diff.ours && diff.theirs ? html`&cularr;` : ' '}
                    ${diff.theirs ?? ''}</span
                  >
                  <mwc-icon slot="meta"
                    >${diff.ours
                      ? diff.theirs
                        ? 'edit'
                        : 'delete'
                      : 'add'}</mwc-icon
                  >
                </mwc-check-list-item>`
            )}
            ${childDiffs.length
              ? html`<mwc-list-item noninteractive
                    >${translate('merge.children')}</mwc-list-item
                  >
                  <li padded divider role="separator"></li>`
              : ''}
            ${repeat(
              childDiffs,
              e => e,
              (diff, index) =>
                html`<mwc-check-list-item
                  value=${index}
                  class="child"
                  twoline
                  left
                  hasMeta
                  style="--mdc-checkbox-checked-color: var(--mdc-theme-${diff.ours
                    ? diff.theirs
                      ? 'secondary'
                      : 'error'
                    : 'primary'});"
                >
                  <span
                    >${diff.ours?.tagName ?? ''}
                    ${diff.ours && diff.theirs ? html`&cularr;` : ' '}
                    ${diff.theirs?.tagName ?? ''}</span
                  >
                  <span slot="secondary"
                    >${diff.ours ? describe(diff.ours) : ''}
                    ${diff.ours && diff.theirs ? html`&cularr;` : ' '}
                    ${diff.theirs ? describe(diff.theirs) : ''}</span
                  >
                  <mwc-icon slot="meta"
                    >${diff.ours
                      ? diff.theirs
                        ? 'merge_type'
                        : 'delete'
                      : 'add'}</mwc-icon
                  >
                </mwc-check-list-item>`
            )}
          </mwc-list>
        `,
      ],
    },
  ];
}
