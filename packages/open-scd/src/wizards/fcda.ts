import { html } from 'lit-element';
import { get } from 'lit-translate';

import {
  createElement,
  find,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { FinderList } from '../finder-list.js';
import {
  dataAttributePicker,
  getDataModelChildren,
} from './foundation/finder.js';

export function newFCDA(parent: Element, path: string[]): Element | undefined {
  const [leafTag, leafId] = path[path.length - 1].split(': ');
  const leaf = find(parent.ownerDocument, leafTag, leafId);
  if (!leaf || getDataModelChildren(leaf).length > 0) return;

  const lnSegment = path.find(segment => segment.startsWith('LN'));
  if (!lnSegment) return;

  const [lnTag, lnId] = lnSegment.split(': ');

  const ln = find(parent.ownerDocument, lnTag, lnId);
  if (!ln) return;

  const ldInst = ln.closest('LDevice')?.getAttribute('inst');
  const prefix = ln.getAttribute('prefix') ?? '';
  const lnClass = ln.getAttribute('lnClass');
  const lnInst =
    ln.getAttribute('inst') && ln.getAttribute('inst') !== ''
      ? ln.getAttribute('inst')
      : null;

  let doName = '';
  let daName = '';
  let fc = '';

  for (const segment of path) {
    const [tagName, id] = segment.split(': ');
    if (!['DO', 'DA', 'SDO', 'BDA'].includes(tagName)) continue;

    const element = find(parent.ownerDocument, tagName, id);

    if (!element) return;

    const name = element.getAttribute('name')!;

    if (tagName === 'DO') doName = name;
    if (tagName === 'SDO') doName = doName + '.' + name;
    if (tagName === 'DA') {
      daName = name;
      fc = element.getAttribute('fc') ?? '';
    }
    if (tagName === 'BDA') daName = daName + '.' + name;
  }

  if (!ldInst || !lnClass || !doName || !daName || !fc) return;

  return createElement(parent.ownerDocument, 'FCDA', {
    ldInst,
    prefix,
    lnClass,
    lnInst,
    doName,
    daName,
    fc,
  });
}

function createFCDAsAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): WizardAction[] => {
    const finder = wizard.shadowRoot!.querySelector<FinderList>('finder-list');
    const paths = finder?.paths ?? [];

    const actions = [];
    for (const path of paths) {
      const element = newFCDA(parent, path);

      if (!element) continue;

      actions.push({
        new: {
          parent,
          element,
          reference: null,
        },
      });
    }

    return actions;
  };
}

export function createFCDAsWizard(parent: Element): Wizard {
  const server = parent.closest('Server');

  return [
    {
      title: get('wizard.title.add', { tagName: 'FCDA' }),
      primary: {
        label: 'add',
        icon: 'add',
        action: createFCDAsAction(parent),
      },
      content: [server ? dataAttributePicker(server) : html``],
    },
  ];
}
