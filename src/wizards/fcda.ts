import { html } from 'lit-element';
import { get, translate } from 'lit-translate';

import '../finder-list.js';
import {
  createElement,
  identity,
  selector,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { getChildren } from './foundation/functions.js';
import { Directory, FinderList } from '../finder-list.js';

function newFCDA(parent: Element, path: string[]): Element | undefined {
  const [leafTag, leafId] = path[path.length - 1].split(': ');
  const leaf = parent.ownerDocument.querySelector(selector(leafTag, leafId));
  if (!leaf || getChildren(leaf).length > 0) return;

  const lnSegment = path.find(segment => segment.startsWith('LN'));
  if (!lnSegment) return;

  const [lnTag, lnId] = lnSegment.split(': ');

  const ln = parent.ownerDocument.querySelector(selector(lnTag, lnId));
  if (!ln) return;

  const ldInst = ln.closest('LDevice')?.getAttribute('inst');
  const prefix = ln.getAttribute('prefix') ?? '';
  const lnClass = ln.getAttribute('lnClass');
  const lnInst =
    (ln.getAttribute('inst') && ln.getAttribute('inst') !== '')
      ? ln.getAttribute('inst')
      : null;

  let doName = '';
  let daName = '';
  let fc = '';

  for (const segment of path) {
    const [tagName, id] = segment.split(': ');
    if (!['DO', 'DA', 'SDO', 'BDA'].includes(tagName)) continue;

    const element = parent.ownerDocument.querySelector(selector(tagName, id));

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
  return (inputs: WizardInput[], wizard: Element): WizardAction[] => {
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

function getDisplayString(entry: string): string {
  return entry.replace(/^.*>/, '').trim();
}

function getReader(server: Element): (path: string[]) => Promise<Directory> {
  return async (path: string[]) => {
    const [tagName, id] = path[path.length - 1]?.split(': ', 2);
    const element = server.ownerDocument.querySelector(selector(tagName, id));

    if (!element)
      return { path, header: html`<p>${translate('error')}</p>`, entries: [] };

    return {
      path,
      header: undefined,
      entries: getChildren(element).map(
        child => `${child.tagName}: ${identity(child)}`
      ),
    };
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
      content: [
        server
          ? html`<finder-list
              multi
              .paths=${[['Server: ' + identity(server)]]}
              .read=${getReader(server)}
              .getDisplayString=${getDisplayString}
              .getTitle=${(path: string[]) => path[path.length - 1]}
            ></finder-list>`
          : html``,
      ],
    },
  ];
}
