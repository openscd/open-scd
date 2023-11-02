import { html } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';
import { List } from '@material/mwc-list';

import '../filtered-list.js';
import {
  createElement,
  EditorAction,
  findControlBlocks,
  identity,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

import { inputIcon } from '../icons/icons.js';
import {
  getSourceReferences,
  openCommunicationMappingWizard,
} from './commmap-wizards.js';

function findIEDNameTarget(iedName: Element): Element | null {
  const name = iedName.textContent ?? '';
  const [apRef, ldInst, prefix, lnClass, lnInst] = [
    'apRef',
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
  ].map(name => iedName.getAttribute(name));
  const ied = iedName.ownerDocument.querySelector(`:root > IED[name=${name}]`);
  if (!ied) return null;

  const apRefSelector = apRef ? `AccessPoint[name="${apRef}"]` : '``';
  const ldInstSeletor = ldInst ? `LDevice[inst="${ldInst}"]` : '';
  const lnClassSelector = lnClass
    ? lnClass === 'LLN0'
      ? `LN0`
      : `LN[lnClass="${lnClass}"]`
    : '';
  const prefixSelector = prefix ? `[prefix="${prefix}"]` : '';
  const lnInstSelector = lnInst ? `[inst="${lnInst}"]` : '';

  const selector = ` ${apRefSelector} ${ldInstSeletor} ${lnClassSelector}${prefixSelector}${lnInstSelector}`;

  return ied.querySelector(selector);
}

function disconnectExtRefs(extRefs: Element[]): EditorAction[] {
  const actions = <EditorAction[]>[];
  extRefs.forEach(extRef => {
    const [intAddr, desc, serviceType, pServT, pLN, pDO, pDA] = [
      'intAddr',
      'desc',
      'serviceType',
      'pServT',
      'pLN',
      'pDO',
      'pDA',
    ].map(name => extRef.getAttribute(name));

    if (intAddr) {
      // cannot delete extRef but only DAPath attributes
      const newExtRef = createElement(extRef.ownerDocument, 'ExtRef', {
        intAddr,
        desc,
        serviceType,
        pServT,
        pLN,
        pDO,
        pDA,
      });

      actions.push({
        new: {
          element: newExtRef,
        },
        old: {
          element: extRef,
        },
      });
    } else {
      actions.push({
        old: {
          parent: extRef.parentElement!,
          element: extRef,
          reference: extRef.nextElementSibling,
        },
      });
    }
  });

  // cbConnectionWizard shows connections sources in ONE controlBlock
  const sinkReference: Set<Element> = new Set();
  extRefs.forEach(extRef => {
    findControlBlocks(extRef).forEach(cb => {
      const ied = extRef.closest('IED')?.getAttribute('name');
      const ld = extRef.closest('LDevice')?.getAttribute('inst');
      const ap = extRef.closest('AccessPoint')?.getAttribute('name');
      const ln = extRef.closest('LN0') || extRef.closest('LN');
      const [prefix, lnClass, inst] = ['prefix', 'lnClass', 'inst'].map(name =>
        ln?.getAttribute(name)
      );
      const iedNames = Array.from(cb.getElementsByTagName('IEDName')).filter(
        iedName =>
          iedName.textContent === ied &&
          (iedName.getAttribute('apRef') || ap) === ap &&
          (iedName.getAttribute('ldInst') || ld) === ld &&
          (iedName.getAttribute('prefix') || prefix) === prefix &&
          (iedName.getAttribute('lnClass') || lnClass) === lnClass &&
          (iedName.getAttribute('lnInst') || inst) === inst
      );

      iedNames.forEach(iedName => {
        sinkReference.add(iedName);
      });
    });
  });

  const sourceReferences: Set<Element> = new Set();
  sinkReference.forEach(iedName => {
    sourceReferences.clear();

    const target = findIEDNameTarget(iedName);

    if (target)
      getSourceReferences(target).forEach(sourceReference =>
        sourceReferences.add(sourceReference)
      );

    extRefs.forEach(extRef => sourceReferences.delete(extRef));
    if (sourceReferences.size === 0)
      actions.push({
        old: {
          parent: iedName.parentElement!,
          element: iedName,
          reference: iedName.nextElementSibling,
        },
      });
  });

  return actions;
}

function disconnect(extRef: Element[]): WizardActor {
  return (
    inputs: WizardInputElement[],
    wizard: Element,
    list?: List | null
  ): WizardAction[] => {
    const items = <Set<number>>list!.index;
    const selectedExtRefs = Array.from(items).map(index => extRef[index]);

    const actions: WizardAction[] = [];
    disconnectExtRefs(selectedExtRefs).forEach(action => actions.push(action));

    return actions;
  };
}

export function selectExtRefsWizard(
  sinkExtRefs: Element[],
  sourceControlBlock: Element | null | undefined,
  root: XMLDocument | Element
): Wizard | undefined {
  if (!sourceControlBlock) return undefined;

  const iedName = sinkExtRefs[0].closest('IED')?.getAttribute('name');
  const cbId = identity(sourceControlBlock);

  return [
    {
      title: cbId + ' - ' + iedName,
      primary: {
        icon: 'delete',
        label: get('disconnect'),
        action: disconnect(sinkExtRefs),
      },
      secondary: {
        icon: '',
        label: get('back'),
        action: openCommunicationMappingWizard(root),
      },
      content: [
        html`<filtered-list multi
          >${sinkExtRefs.map(extRef => {
            const reference =
              (extRef.getAttribute('prefix') ?? '') +
              extRef.getAttribute('lnClass') +
              (extRef.getAttribute('lnInst') ?? '') +
              '>' +
              extRef.getAttribute('doName') +
              '.' +
              (extRef.getAttribute('daName') ?? '');

            return html`<mwc-check-list-item graphic="icon" twoline>
              <span>${reference}</span>
              <span slot="secondary"
                >${extRef.getAttribute('ldInst') ?? ''}</span
              >
              <mwc-icon slot="graphic">${inputIcon}</mwc-icon>
            </mwc-check-list-item> `;
          })}</filtered-list
        >`,
      ],
    },
  ];
}
