import { LitElement, TemplateResult } from 'lit-element';
import { directive, Part } from 'lit-html';

import { Select } from '@material/mwc-select';

import { WizardTextField } from './wizard-textfield.js';

export type SimpleAction = Create | Update | Delete | Move;
export type ComplexAction = {
  actions: SimpleAction[];
  title: string;
  derived?: boolean;
};
/** Represents an intended or committed change to some `Element`. */
export type EditorAction = SimpleAction | ComplexAction;
/** Inserts `new.element` to `new.parent` before `new.reference`. */
export interface Create {
  new: { parent: Element; element: Element; reference: Element | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Removes `old.element` from `old.parent` before `old.reference`. */
export interface Delete {
  old: { parent: Element; element: Element; reference: Element | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Reparents of `old.element` to `new.parent` before `new.reference`. */
export interface Move {
  old: { parent: Element; element: Element; reference: Element | null };
  new: { parent: Element; reference: Element | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Replaces `old.element` with `new.element`, keeping element children. */
export interface Update {
  old: { element: Element };
  new: { element: Element };
  derived?: boolean;
  checkValidity?: () => boolean;
}

export function isCreate(action: EditorAction): action is Create {
  return (
    (action as Update).old === undefined &&
    (action as Create).new?.parent !== undefined &&
    (action as Create).new?.element !== undefined &&
    (action as Create).new?.reference !== undefined
  );
}
export function isDelete(action: EditorAction): action is Delete {
  return (
    (action as Delete).old?.parent !== undefined &&
    (action as Delete).old?.element !== undefined &&
    (action as Delete).old?.reference !== undefined &&
    (action as Update).new === undefined
  );
}
export function isMove(action: EditorAction): action is Move {
  return (
    (action as Move).old?.parent !== undefined &&
    (action as Move).old?.element !== undefined &&
    (action as Move).old?.reference !== undefined &&
    (action as Move).new?.parent !== undefined &&
    (action as Update).new?.element == undefined &&
    (action as Move).new?.reference !== undefined
  );
}
export function isUpdate(action: EditorAction): action is Update {
  return (
    (action as Move).old?.parent === undefined &&
    (action as Update).old?.element !== undefined &&
    (action as Move).new?.parent === undefined &&
    (action as Update).new?.element !== undefined
  );
}
export function isSimple(action: EditorAction): action is SimpleAction {
  return !((<ComplexAction>action).actions instanceof Array);
}

/** @returns an [[`EditorAction`]] with opposite effect of `action`. */
export function invert(action: EditorAction): EditorAction {
  if (!isSimple(action)) {
    const inverse: ComplexAction = {
      title: action.title,
      derived: action.derived,
      actions: [],
    };
    action.actions.forEach(element =>
      inverse.actions.unshift(<SimpleAction>invert(element))
    );
    return inverse;
  }

  const metaData = {
    derived: action.derived,
    checkValidity: action.checkValidity,
  };
  if (isCreate(action)) return { old: action.new, ...metaData };
  else if (isDelete(action)) return { new: action.old, ...metaData };
  else if (isMove(action))
    return {
      old: {
        parent: action.new.parent,
        element: action.old.element,
        reference: action.new.reference,
      },
      new: { parent: action.old.parent, reference: action.old.reference },
      ...metaData,
    };
  else if (isUpdate(action))
    return { new: action.old, old: action.new, ...metaData };
  else return unreachable('Unknown EditorAction type in invert.');
}

/** Represents some intended modification of a `Document` being edited. */
export interface EditorActionDetail<T extends EditorAction> {
  action: T;
}
export type EditorActionEvent<T extends EditorAction> = CustomEvent<
  EditorActionDetail<T>
>;
export function newActionEvent<T extends EditorAction>(
  action: T,
  eventInitDict?: CustomEventInit<Partial<EditorActionDetail<T>>>
): EditorActionEvent<T> {
  return new CustomEvent<EditorActionDetail<T>>('editor-action', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { action, ...eventInitDict?.detail },
  });
}

export const wizardInputSelector = 'wizard-textfield, mwc-select';
export type WizardInput = WizardTextField | Select;

export type WizardAction = EditorAction | (() => Wizard);

/** @returns [[`EditorAction`]]s to dispatch on [[`WizardDialog`]] commit. */
export type WizardActor = (
  inputs: WizardInput[],
  wizard: Element
) => WizardAction[];

export function isWizard(
  wizardAction: WizardAction
): wizardAction is () => Wizard {
  return typeof wizardAction === 'function';
}

/** @returns the `value` or `maybeValue` of `input` depending on type. */
export function getValue(input: WizardInput): string | null {
  if (input instanceof WizardTextField) return input.maybeValue;
  else return input.value;
}

/** @returns the `multiplier` of `input` if available. */
export function getMultiplier(input: WizardInput): string | null {
  if (input instanceof WizardTextField) return input.multiplier;
  else return null;
}

/** Represents a page of a wizard dialog */
export interface WizardPage {
  title: string;
  content?: TemplateResult[];
  primary?: {
    icon: string;
    label: string;
    action: WizardActor;
  };
  secondary?: {
    icon: string;
    label: string;
    action: WizardActor;
  };
}
export type Wizard = WizardPage[];

/** If `wizard === null`, close the current wizard, else queue `wizard`. */
export interface WizardDetail {
  wizard: Wizard | null;
  subwizard?: boolean;
}
export type WizardEvent = CustomEvent<WizardDetail>;
export function newWizardEvent(
  wizard: Wizard | null = null,
  eventInitDict?: CustomEventInit<Partial<WizardDetail>>
): WizardEvent {
  return new CustomEvent<WizardDetail>('wizard', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { wizard, ...eventInitDict?.detail },
  });
}

type InfoEntryKind = 'info' | 'warning' | 'error';

export type LogEntryType = 'info' | 'warning' | 'error' | 'action';

/** The basic information contained in each [[`LogEntry`]]. */
interface LogDetailBase {
  title: string;
  message?: string;
}
/** The [[`LogEntry`]] for a committed [[`EditorAction`]]. */
export interface CommitDetail extends LogDetailBase {
  kind: 'action';
  action: EditorAction;
}
/** A [[`LogEntry`]] for notifying the user. */
export interface InfoDetail extends LogDetailBase {
  kind: InfoEntryKind;
  cause?: LogEntry;
}

export type LogDetail = InfoDetail | CommitDetail;
export type LogEvent = CustomEvent<LogDetail>;
export function newLogEvent(
  detail: LogDetail,
  eventInitDict?: CustomEventInit<LogDetail>
): LogEvent {
  return new CustomEvent<LogDetail>('log', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { ...detail, ...eventInitDict?.detail },
  });
}

/** [[`LogEntry`]]s are timestamped upon being committed to the `history`. */
interface Timestamped {
  time: Date;
}

export type CommitEntry = Timestamped & CommitDetail;
export type InfoEntry = Timestamped & InfoDetail;

export type LogEntry = InfoEntry | CommitEntry;

/** Represents some work pending completion, upon which `promise` resolves. */
export interface PendingStateDetail {
  promise: Promise<void>;
}
export type PendingStateEvent = CustomEvent<PendingStateDetail>;
export function newPendingStateEvent(
  promise: Promise<void>,
  eventInitDict?: CustomEventInit<Partial<PendingStateDetail>>
): PendingStateEvent {
  return new CustomEvent<PendingStateDetail>('pending-state', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { promise, ...eventInitDict?.detail },
  });
}

/** @returns a reference to `element` with segments delimited by '/'. */
// TODO(c-dinkel): replace with identity (FIXME)
export function referencePath(element: Element): string {
  let path = '';
  let nextParent: Element | null = element.parentElement;
  while (nextParent?.getAttribute('name')) {
    path = '/' + nextParent.getAttribute('name') + path;
    nextParent = nextParent.parentElement;
  }
  return path;
}

export function pathParts(identity: string): [string, string] {
  const path = identity.split('>');
  const end = path.pop() ?? '';
  const start = path.join('>');
  return [start, end];
}

function hitemIdentity(e: Element): string {
  return `${e.getAttribute('version')}\t${e.getAttribute('revision')}`;
}

function hitemSelector(tagName: string, identity: string): string {
  const [version, revision] = identity.split('\t');
  return `${tagName}[version="${version}"][revision="${revision}"]`;
}

function terminalIdentity(e: Element): string {
  return identity(e.parentElement) + '>' + e.getAttribute('connectivityNode');
}

function terminalSelector(tagName: string, identity: string): string {
  const [parentIdentity, connectivityNode] = pathParts(identity);

  const parentSelectors = tEquipment.flatMap(parentTag =>
    selector(parentTag, parentIdentity).split(',')
  );

  return crossProduct(
    parentSelectors,
    ['>'],
    [`${tagName}[connectivityNode="${connectivityNode}"]`]
  )
    .map(strings => strings.join(''))
    .join(',');
}

function lNodeIdentity(e: Element): string {
  const [iedName, ldInst, prefix, lnClass, lnInst, lnType] = [
    'iedName',
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
    'lnType',
  ].map(name => e.getAttribute(name));
  if (iedName === 'None')
    return `${identity(e.parentElement)}>(${lnClass} ${lnType})`;
  return `${iedName} ${ldInst || '(Client)'}/${prefix ?? ''} ${lnClass} ${
    lnInst ?? ''
  }`;
}

function lNodeSelector(tagName: string, identity: string): string {
  if (identity.endsWith(')')) {
    const [parentIdentity, myIdentity] = pathParts(identity);
    const [lnClass, lnType] = myIdentity
      .substring(1, identity.length - 2)
      .split(' ');
    return tLNodeContainer
      .map(
        parentTag =>
          `${selector(
            parentTag,
            parentIdentity
          )}>${tagName}[iedName="None"][lnClass="${lnClass}"][lnType="${lnType}"]`
      )
      .join(',');
  }

  const [iedName, ldInst, prefix, lnClass, lnInst] = identity.split(/[ /]/);

  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  ] = [
    [`[iedName="${iedName}"]`],
    ldInst === '(Client)'
      ? [':not([ldInst])', '[ldInst=""]']
      : [`[ldInst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [':not([prefix])', '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [':not([lnInst])', '[lnInst=""]'],
  ];

  return crossProduct(
    [tagName],
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function kDCIdentity(e: Element): string {
  return `${identity(e.parentElement)}>${e.getAttribute(
    'iedName'
  )} ${e.getAttribute('apName')}`;
}

function kDCSelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);
  const [iedName, apName] = myIdentity.split(' ');
  return `${selector(
    'IED',
    parentIdentity
  )}>${tagName}[iedName="${iedName}"][apName="${apName}"]`;
}

function associationIdentity(e: Element): string {
  return `${identity(e.parentElement)}>${e.getAttribute('associationID')}`;
}

function associationSelector(tagName: string, identity: string): string {
  const [parentIdentity, associationID] = pathParts(identity);
  return `${selector(
    'Server',
    parentIdentity
  )}>${tagName}[associationID="${associationID}"]`;
}

function lDeviceIdentity(e: Element): string {
  return `${identity(e.closest('IED')!)}>>${e.getAttribute('inst')}`;
}

function lDeviceSelector(tagName: string, identity: string): string {
  const [iedName, inst] = identity.split('>>');
  return `IED[name="${iedName}"] ${tagName}[inst="${inst}"]`;
}

function iEDNameIdentity(e: Element): string {
  const iedName = e.textContent;
  const [apRef, ldInst, prefix, lnClass, lnInst] = [
    'apRef',
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
  ].map(name => e.getAttribute(name));
  return `${identity(e.parentElement)}>${iedName} ${apRef ? apRef : ''} ${
    ldInst ? ldInst : ''
  }/${prefix ?? ''} ${lnClass ?? ''} ${lnInst ?? ''}`;
}

function iEDNameSelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);

  const [iedName, apRef, ldInst, prefix, lnClass, lnInst] = myIdentity.split(
    /[ /]/
  );

  const [
    parentSelectors,
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  ] = [
    tControlWithIEDName.flatMap(parentTag =>
      selector(parentTag, parentIdentity).split(',')
    ),
    [`${iedName}`],
    apRef ? [`[apRef="${apRef}"]`] : [':not([apRef])', '[apRef=""]'],
    ldInst ? [`[ldInst="${ldInst}"]`] : [':not([ldInst])', '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [':not([prefix])', '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [':not([lnInst])', '[lnInst=""]'],
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function fCDAIdentity(e: Element): string {
  const [ldInst, prefix, lnClass, lnInst, doName, daName, fc, ix] = [
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
    'doName',
    'daName',
    'fc',
    'ix',
  ].map(name => e.getAttribute(name));
  const dataPath = `${ldInst}/${prefix ?? ''} ${lnClass} ${
    lnInst ?? ''
  }.${doName} ${daName ? daName : ''}`;
  return `${identity(e.parentElement)}>${dataPath} (${fc}${
    ix ? ' [' + ix + ']' : ''
  })`;
}

function fCDASelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);

  const [ldInst, prefix, lnClass, lnInst] = myIdentity.split(/[ /.]/);

  const matchDoDa = myIdentity.match(/.([A-Z][a-z0-9.]*) ([A-Za-z0-9.]*) \(/);
  const doName = matchDoDa && matchDoDa[1] ? matchDoDa[1] : '';
  const daName = matchDoDa && matchDoDa[2] ? matchDoDa[2] : '';

  const matchFx = myIdentity.match(/\(([A-Z]{2})/);
  const matchIx = myIdentity.match(/ \[([0-9]{1,2})\]/);

  const fc = matchFx && matchFx[1] ? matchFx[1] : '';
  const ix = matchIx && matchIx[1] ? matchIx[1] : '';

  const [
    parentSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    fcSelectors,
    ixSelectors,
  ] = [
    selector('DataSet', parentIdentity).split(','),
    [`[ldInst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [':not([prefix])', '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [':not([lnInst])', '[lnInst=""]'],
    [`[doName="${doName}"]`],
    daName ? [`[daName="${daName}"]`] : [':not([daName])', '[daName=""]'],
    [`[fc="${fc}"]`],
    ix ? [`[ix="${ix}"]`] : [':not([ix])', '[ix=""]'],
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    fcSelectors,
    ixSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function extRefIdentity(e: Element): string | number {
  if (!e.parentElement) return NaN;
  const parentIdentity = identity(e.parentElement);
  const iedName = e.getAttribute('iedName');
  const intAddr = e.getAttribute('intAddr');
  const intAddrIndex = Array.from(
    e.parentElement.querySelectorAll(`ExtRef[intAddr="${intAddr}"]`)
  ).indexOf(e);
  if (!iedName) return `${parentIdentity}>${intAddr}[${intAddrIndex}]`;
  const [
    ldInst,
    prefix,
    lnClass,
    lnInst,
    doName,
    daName,
    serviceType,
    srcLDInst,
    srcPrefix,
    srcLNClass,
    srcLNInst,
    srcCBName,
  ] = [
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
    'doName',
    'daName',
    'serviceType',
    'srcLDInst',
    'srcPrefix',
    'srcLNClass',
    'srcLNInst',
    'srcCBName',
  ].map(name => e.getAttribute(name));

  const cbPath = srcCBName
    ? `${serviceType}:${srcCBName} ${srcLDInst ?? ''}/${
        srcPrefix ?? ''
      } ${srcLNClass} ${srcLNInst ?? ''}`
    : '';
  const dataPath = `${iedName} ${ldInst}/${prefix ?? ''} ${lnClass} ${
    lnInst ?? ''
  } ${doName} ${daName ? daName : ''}`;
  return `${parentIdentity}>${cbPath} ${dataPath}${
    intAddr ? '@' + `${intAddr}` : ''
  }`;
}

function extRefSelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);

  const parentSelectors = selector('Inputs', parentIdentity).split(',');

  if (myIdentity.endsWith(']')) {
    const [intAddr] = myIdentity.split('[');
    const intAddrSelectors = [`[intAddr="${intAddr}"]`];

    return crossProduct(parentSelectors, ['>'], [tagName], intAddrSelectors)
      .map(strings => strings.join(''))
      .join(',');
  }

  let iedName,
    ldInst,
    prefix,
    lnClass,
    lnInst,
    doName,
    daName,
    serviceType,
    srcCBName,
    srcLDInst,
    srcPrefix,
    srcLNClass,
    srcLNInst,
    intAddr;

  if (!myIdentity.includes(':') && !myIdentity.includes('@')) {
    [
      iedName,
      ldInst,
      prefix,
      lnClass,
      lnInst,
      doName,
      daName,
    ] = myIdentity.split(/[ /]/);
  } else if (myIdentity.includes(':') && !myIdentity.includes('@')) {
    [
      serviceType,
      srcCBName,
      srcLDInst,
      srcPrefix,
      srcLNClass,
      srcLNInst,
      iedName,
      ldInst,
      prefix,
      lnClass,
      lnInst,
      doName,
      daName,
    ] = myIdentity.split(/[ /:]/);
  } else if (!myIdentity.includes(':') && myIdentity.includes('@')) {
    [
      iedName,
      ldInst,
      prefix,
      lnClass,
      lnInst,
      doName,
      daName,
      intAddr,
    ] = myIdentity.split(/[ /@]/);
  } else {
    [
      serviceType,
      srcCBName,
      srcLDInst,
      srcPrefix,
      srcLNClass,
      srcLNInst,
      iedName,
      ldInst,
      prefix,
      lnClass,
      lnInst,
      doName,
      daName,
      intAddr,
    ] = myIdentity.split(/[ /:@]/);
  }

  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    serviceTypeSelectors,
    srcCBNameSelectors,
    srcLDInstSelectors,
    srcPrefixSelectors,
    srcLNClassSelectors,
    srcLNInstSelectors,
    intAddrSelectors,
  ] = [
    iedName ? [`[iedName="${iedName}"]`] : [':not([iedName])'],
    ldInst ? [`[ldInst="${ldInst}"]`] : [':not([ldInst])', '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [':not([prefix])', '[prefix=""]'],
    lnClass ? [`[lnClass="${lnClass}"]`] : [':not([lnClass])'],
    lnInst ? [`[lnInst="${lnInst}"]`] : [':not([lnInst])', '[lnInst=""]'],
    doName ? [`[doName="${doName}"]`] : [':not([doName])'],
    daName ? [`[daName="${daName}"]`] : [':not([daName])', '[daName=""]'],
    serviceType
      ? [`[serviceType="${serviceType}"]`]
      : [':not([serviceType])', '[serviceType=""]'],
    srcCBName
      ? [`[srcCBName="${srcCBName}"]`]
      : [':not([srcCBName])', '[srcCBName=""]'],
    srcLDInst
      ? [`[srcLDInst="${srcLDInst}"]`]
      : [':not([srcLDInst])', '[srcLDInst=""]'],
    srcPrefix
      ? [`[srcPrefix="${srcPrefix}"]`]
      : [':not([srcPrefix])', '[srcPrefix=""]'],
    srcLNClass
      ? [`[srcLNClass="${srcLNClass}"]`]
      : [':not([srcLNClass])', '[srcLNClass=""]'],
    srcLNInst
      ? [`[srcLNInst="${srcLNInst}"]`]
      : [':not([srcLNInst])', '[srcLNInst=""]'],
    intAddr ? [`[intAddr="${intAddr}"]`] : [':not([intAddr])', '[intAddr=""]'],
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    serviceTypeSelectors,
    srcCBNameSelectors,
    srcLDInstSelectors,
    srcPrefixSelectors,
    srcLNClassSelectors,
    srcLNInstSelectors,
    intAddrSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function lNIdentity(e: Element): string {
  const [prefix, lnClass, inst] = ['prefix', 'lnClass', 'inst'].map(name =>
    e.getAttribute(name)
  );
  return `${identity(e.parentElement)}>${prefix ?? ''} ${lnClass} ${inst}`;
}

function lNSelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);

  const parentSelectors = ['AccessPoint', 'LDevice'].flatMap(parentTag =>
    selector(parentTag, parentIdentity).split(',')
  );

  const [prefix, lnClass, inst] = myIdentity.split(' ');
  const [prefixSelectors, lnClassSelectors, instSelectors] = [
    prefix ? [`[prefix="${prefix}"]`] : [':not([prefix])', '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    [`[inst="${inst}"]`],
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    prefixSelectors,
    lnClassSelectors,
    instSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function clientLNIdentity(e: Element): string {
  const [apRef, iedName, ldInst, prefix, lnClass, lnInst] = [
    'apRef',
    'iedName',
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
  ].map(name => e.getAttribute(name));
  return `${identity(e.parentElement)}>${iedName} ${
    apRef ? apRef : ''
  } ${ldInst}/${prefix ?? ''} ${lnClass} ${lnInst}`;
}

function clientLNSelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);

  const parentSelectors = selector('RptEnabled', parentIdentity).split(',');

  const [iedName, apRef, ldInst, prefix, lnClass, lnInst] = myIdentity.split(
    /[ /]/
  );

  const [
    iedNameSelectors,
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  ] = [
    iedName ? [`[iedName="${iedName}"]`] : [':not([iedName])', '[iedName=""]'],
    apRef ? [`[apRef="${apRef}"]`] : [':not([apRef])', '[apRef=""]'],
    ldInst ? [`[ldInst="${ldInst}"]`] : [':not([ldInst])', '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [':not([prefix])', '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [':not([lnInst])', '[lnInst=""]'],
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    iedNameSelectors,
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function ixNamingIdentity(e: Element): string {
  const [name, ix] = ['name', 'ix'].map(name => e.getAttribute(name));
  return `${identity(e.parentElement)}>${name}${ix ? '[' + ix + ']' : ''}`;
}

function ixNamingSelector(
  tagName: string,
  identity: string,
  depth = -1
): string {
  if (depth === -1) depth = identity.split('>').length;

  const [parentIdentity, myIdentity] = pathParts(identity);

  const [name] = myIdentity.split(' ');
  const ix = myIdentity.match(/\[([0-9]*)\]/)
    ? myIdentity.match(/\[([0-9]*)\]/)![1]
    : '';

  if (depth === 0) return `${tagName}[name="${name}"]`;

  const parentSelectors = ['DOI', 'SDI'].flatMap(parentTag =>
    parentTag === 'SDI'
      ? ixNamingSelector(parentTag, parentIdentity, depth - 1).split(',')
      : selector(parentTag, parentIdentity).split(',')
  );

  const [nameSelectors, ixSelectors] = [
    [`[name="${name}"]`],
    ix ? [`[ix="${ix}"]`] : ['[ix=""]', ':not([ix])'],
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    nameSelectors,
    ixSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function valIdentity(e: Element): string | number {
  if (!e.parentElement) return NaN;
  const sGroup = e.getAttribute('sGroup');
  const index = Array.from(e.parentElement.children)
    .filter(child => child.getAttribute('sGroup') === sGroup)
    .findIndex(child => child.isSameNode(e));
  return `${identity(e.parentElement)}>${sGroup ? sGroup + '.' : ''} ${index}`;
}

function valSelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);

  const [sGroup, indexText] = myIdentity.split(' ');
  const index = parseFloat(indexText);

  const parentSelectors = ['DAI', 'DA', 'BDA'].flatMap(parentTag =>
    selector(parentTag, parentIdentity).split(',')
  );

  const [nameSelectors, ixSelectors] = [
    sGroup ? [`[sGroup="${sGroup}"]`] : [''],
    index ? [`:nth-child(${index + 1})`] : [''],
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    nameSelectors,
    ixSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function connectedAPIdentity(e: Element): string {
  const [iedName, apName] = ['iedName', 'apName'].map(name =>
    e.getAttribute(name)
  );
  return `${iedName} ${apName}`;
}

function connectedAPSelector(tagName: string, identity: string): string {
  const [iedName, apName] = identity.split(' ');
  return `${tagName}[iedName="${iedName}"][apName="${apName}"]`;
}

function controlBlockIdentity(e: Element): string {
  const [ldInst, cbName] = ['ldInst', 'cbName'].map(name =>
    e.getAttribute(name)
  );
  return `${ldInst} ${cbName}`;
}

function controlBlockSelector(tagName: string, identity: string): string {
  const [ldInst, cbName] = identity.split(' ');
  return `${tagName}[ldInst="${ldInst}"][cbName="${cbName}"]`;
}

function physConnIdentity(e: Element): string | number {
  if (!e.parentElement) return NaN;
  if (!e.parentElement.querySelector('PhysConn[type="RedConn"]')) return NaN;
  const pcType = e.getAttribute('type');
  if (
    e.parentElement.children.length > 1 &&
    pcType !== 'Connection' &&
    pcType !== 'RedConn'
  )
    return NaN;
  return `${identity(e.parentElement)}>${pcType}`;
}

function physConnSelector(tagName: string, identity: string): string {
  const [parentIdentity, pcType] = pathParts(identity);

  const [parentSelectors, typeSelectors] = [
    selector('ConnectedAP', parentIdentity).split(','),
    pcType ? [`[type="${pcType}"]`] : [''],
  ];

  return crossProduct(parentSelectors, ['>'], [tagName], typeSelectors)
    .map(strings => strings.join(''))
    .join(',');
}

function pIdentity(e: Element): string | number {
  if (!e.parentElement) return NaN;
  const eParent = e.parentElement;
  const eType = e.getAttribute('type');
  if (eParent.tagName === 'PhysConn')
    return `${identity(e.parentElement)}>${eType}`;
  const index = Array.from(e.parentElement.children)
    .filter(child => child.getAttribute('type') === eType)
    .findIndex(child => child.isSameNode(e));
  return `${identity(e.parentElement)}>${eType} [${index}]`;
}

function pSelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);

  const [type] = myIdentity.split(' ');
  const index =
    myIdentity &&
    myIdentity.match(/\[([0-9]+)\]/) &&
    myIdentity.match(/\[([0-9]+)\]/)![1]
      ? parseFloat(myIdentity.match(/\[([0-9]+)\]/)![1])
      : NaN;

  const [parentSelectors, typeSelectors, ixSelectors] = [
    selector('Address', parentIdentity).split(','),
    [`[type="${type}"]`],
    index ? [`:nth-child(${index + 1})`] : [''],
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    typeSelectors,
    ixSelectors
  )
    .map(strings => strings.join(''))
    .join(',');
}

function enumValIdentity(e: Element): string {
  return `${identity(e.parentElement)}>${e.getAttribute('ord')}`;
}

function enumValSelector(tagName: string, identity: string): string {
  const [parentIdentity, ord] = pathParts(identity);
  return `${selector('EnumType', parentIdentity)}>${tagName}[ord="${ord}"]`;
}

function protNsIdentity(e: Element): string {
  return `${identity(e.parentElement)}>${e.getAttribute('type') || '8-MMS'}\t${
    e.textContent
  }`;
}

function protNsSelector(tagName: string, identity: string): string {
  const [parentIdentity, myIdentity] = pathParts(identity);

  const [type, value] = myIdentity.split('\t');

  const [parentSelectors] = [
    ['DAType', 'DA'].flatMap(parentTag =>
      selector(parentTag, parentIdentity).split(',')
    ),
  ];

  return crossProduct(
    parentSelectors,
    ['>'],
    [tagName],
    [`[type="${type}"]`],
    ['>'],
    [value]
  )
    .map(strings => strings.join(''))
    .join(',');
}

function sCLIdentity(): string {
  return '';
}

function sCLSelector(): string {
  return 'SCL';
}

type IdentityFunction = (e: Element) => string | number;
type SelectorFunction = (tagName: SCLTag, identity: string) => string;

export const specialTags: Partial<
  Record<
    string,
    { identity: IdentityFunction; selector: SelectorFunction | null }
  >
> = {
  Hitem: { identity: hitemIdentity, selector: hitemSelector },
  Terminal: { identity: terminalIdentity, selector: terminalSelector },
  LNode: { identity: lNodeIdentity, selector: lNodeSelector },
  KDC: { identity: kDCIdentity, selector: kDCSelector },
  Association: { identity: associationIdentity, selector: associationSelector },
  LDevice: { identity: lDeviceIdentity, selector: lDeviceSelector },
  IEDName: { identity: iEDNameIdentity, selector: iEDNameSelector },
  FCDA: { identity: fCDAIdentity, selector: fCDASelector },
  ExtRef: { identity: extRefIdentity, selector: extRefSelector },
  LN: { identity: lNIdentity, selector: lNSelector },
  ClientLN: { identity: clientLNIdentity, selector: clientLNSelector },
  DAI: { identity: ixNamingIdentity, selector: ixNamingSelector },
  SDI: { identity: ixNamingIdentity, selector: ixNamingSelector },
  Val: { identity: valIdentity, selector: valSelector },
  ConnectedAP: { identity: connectedAPIdentity, selector: connectedAPSelector },
  GSE: { identity: controlBlockIdentity, selector: controlBlockSelector },
  SMV: { identity: controlBlockIdentity, selector: controlBlockSelector },
  PhysConn: { identity: physConnIdentity, selector: physConnSelector },
  P: { identity: pIdentity, selector: pSelector },
  EnumVal: { identity: enumValIdentity, selector: enumValSelector },
  ProtNs: { identity: protNsIdentity, selector: protNsSelector },
};

export const tags: Record<
  SCLTag,
  { identity: IdentityFunction; selector: SelectorFunction }
> = {
  AccessControl: { identity: singletonIdentity, selector: singletonSelector },
  AccessPoint: { identity: namingIdentity, selector: namingSelector },
  Address: { identity: singletonIdentity, selector: singletonSelector },
  Association: { identity: singletonIdentity, selector: singletonSelector },
  Authentication: { identity: singletonIdentity, selector: singletonSelector },
  BDA: { identity: namingIdentity, selector: namingSelector },
  BitRate: { identity: singletonIdentity, selector: singletonSelector },
  Bay: { identity: namingIdentity, selector: namingSelector },
  ClientLN: { identity: clientLNIdentity, selector: clientLNSelector },
  ClientServices: { identity: singletonIdentity, selector: singletonSelector },
  CommProt: { identity: singletonIdentity, selector: singletonSelector },
  Communication: { identity: singletonIdentity, selector: singletonSelector },
  ConductingEquipment: { identity: namingIdentity, selector: namingSelector },
  ConfLNs: { identity: singletonIdentity, selector: singletonSelector },
  ConfLdName: { identity: singletonIdentity, selector: singletonSelector },
  ConfLogControl: { identity: singletonIdentity, selector: singletonSelector },
  ConfReportControl: {
    identity: singletonIdentity,
    selector: singletonSelector,
  },
  ConfSG: { identity: singletonIdentity, selector: singletonSelector },
  ConfSigRef: { identity: singletonIdentity, selector: singletonSelector },
  ConnectedAP: { identity: connectedAPIdentity, selector: connectedAPSelector },
  ConnectivityNode: { identity: namingIdentity, selector: namingSelector },
  ConfDataSet: { identity: singletonIdentity, selector: singletonSelector },
  DA: { identity: namingIdentity, selector: namingSelector },
  DAI: { identity: ixNamingIdentity, selector: ixNamingSelector },
  DAType: { identity: idNamingIdentity, selector: idNamingSelector },
  DO: { identity: namingIdentity, selector: namingSelector },
  DOI: { identity: namingIdentity, selector: namingSelector },
  DOType: { identity: idNamingIdentity, selector: idNamingSelector },
  DataObjectDirectory: {
    identity: singletonIdentity,
    selector: singletonSelector,
  },
  DataSet: { identity: namingIdentity, selector: namingSelector },
  DataSetDirectory: {
    identity: singletonIdentity,
    selector: singletonSelector,
  },
  DataTypeTemplates: {
    identity: singletonIdentity,
    selector: singletonSelector,
  },
  DurationInSec: { identity: singletonIdentity, selector: singletonSelector },
  DynAssociation: { identity: singletonIdentity, selector: singletonSelector },
  DynDataSet: { identity: singletonIdentity, selector: singletonSelector },
  EnumType: { identity: idNamingIdentity, selector: idNamingSelector },
  EnumVal: { identity: enumValIdentity, selector: enumValSelector },
  EqFunction: { identity: namingIdentity, selector: namingSelector },
  EqSubFunction: { identity: namingIdentity, selector: namingSelector },
  ExtRef: { identity: extRefIdentity, selector: extRefSelector },
  FCDA: { identity: fCDAIdentity, selector: fCDASelector },
  FileHandling: { identity: singletonIdentity, selector: singletonSelector },
  Function: { identity: namingIdentity, selector: namingSelector },
  GOOSE: { identity: singletonIdentity, selector: singletonSelector },
  GOOSESecurity: { identity: namingIdentity, selector: namingSelector },
  GSE: { identity: controlBlockIdentity, selector: controlBlockSelector },
  GSEControl: { identity: namingIdentity, selector: namingSelector },
  GSEDir: { identity: singletonIdentity, selector: singletonSelector },
  GSESettings: { identity: singletonIdentity, selector: singletonSelector },
  GSSE: { identity: singletonIdentity, selector: singletonSelector },
  GeneralEquipment: { identity: namingIdentity, selector: namingSelector },
  GetCBValues: { identity: singletonIdentity, selector: singletonSelector },
  GetDataObjectDefinition: {
    identity: singletonIdentity,
    selector: singletonSelector,
  },
  GetDataSetValue: { identity: singletonIdentity, selector: singletonSelector },
  GetDirectory: { identity: singletonIdentity, selector: singletonSelector },
  Header: { identity: singletonIdentity, selector: singletonSelector },
  History: { identity: singletonIdentity, selector: singletonSelector },
  Hitem: { identity: hitemIdentity, selector: hitemSelector },
  IED: { identity: namingIdentity, selector: namingSelector },
  IEDName: { identity: iEDNameIdentity, selector: iEDNameSelector },
  Inputs: { identity: singletonIdentity, selector: singletonSelector },
  IssuerName: { identity: singletonIdentity, selector: singletonSelector },
  KDC: { identity: kDCIdentity, selector: kDCSelector },
  LDevice: { identity: lDeviceIdentity, selector: lDeviceSelector },
  LN: { identity: lNIdentity, selector: lNSelector },
  LN0: { identity: singletonIdentity, selector: singletonSelector },
  LNode: { identity: lNodeIdentity, selector: lNodeSelector },
  LNodeType: { identity: idNamingIdentity, selector: idNamingSelector },
  Line: { identity: namingIdentity, selector: namingSelector },
  Log: { identity: namingIdentity, selector: namingSelector },
  LogControl: { identity: namingIdentity, selector: namingSelector },
  LogSettings: { identity: singletonIdentity, selector: singletonSelector },
  McSecurity: { identity: singletonIdentity, selector: singletonSelector },
  OptFields: { identity: singletonIdentity, selector: singletonSelector },
  P: { identity: pIdentity, selector: pSelector },
  PhysConn: { identity: physConnIdentity, selector: physConnSelector },
  PowerTransformer: { identity: namingIdentity, selector: namingSelector },
  Process: { identity: namingIdentity, selector: namingSelector },
  ProtNs: { identity: protNsIdentity, selector: protNsSelector },
  Protocol: { identity: singletonIdentity, selector: singletonSelector },
  ReadWrite: { identity: singletonIdentity, selector: singletonSelector },
  RedProt: { identity: singletonIdentity, selector: singletonSelector },
  ReportControl: { identity: namingIdentity, selector: namingSelector },
  ReportSettings: { identity: singletonIdentity, selector: singletonSelector },
  RptEnabled: { identity: singletonIdentity, selector: singletonSelector },
  SCL: { identity: sCLIdentity, selector: sCLSelector },
  SDI: { identity: ixNamingIdentity, selector: ixNamingSelector },
  SDO: { identity: namingIdentity, selector: namingSelector },
  SGEdit: { identity: singletonIdentity, selector: singletonSelector },
  SMV: { identity: controlBlockIdentity, selector: controlBlockSelector },
  SMVSecurity: { identity: namingIdentity, selector: namingSelector },
  SMVSettings: { identity: singletonIdentity, selector: singletonSelector },
  SMVsc: { identity: singletonIdentity, selector: singletonSelector },
  SampledValueControl: { identity: namingIdentity, selector: namingSelector },
  Server: { identity: singletonIdentity, selector: singletonSelector },
  Services: { identity: singletonIdentity, selector: singletonSelector },
  SetDataSetValue: { identity: singletonIdentity, selector: singletonSelector },
  SettingGroups: { identity: singletonIdentity, selector: singletonSelector },
  SmvOpts: { identity: singletonIdentity, selector: singletonSelector },
  SubEquipment: { identity: namingIdentity, selector: namingSelector },
  SubFunction: { identity: namingIdentity, selector: namingSelector },
  SubNetwork: { identity: namingIdentity, selector: namingSelector },
  Subject: { identity: singletonIdentity, selector: singletonSelector },
  Substation: { identity: namingIdentity, selector: namingSelector },
  SupSubscription: { identity: singletonIdentity, selector: singletonSelector },
  TapChanger: { identity: namingIdentity, selector: namingSelector },
  Text: { identity: singletonIdentity, selector: singletonSelector },
  TimeSyncProt: { identity: singletonIdentity, selector: singletonSelector },
  TimerActivatedControl: {
    identity: singletonIdentity,
    selector: singletonSelector,
  },
  Terminal: { identity: terminalIdentity, selector: terminalSelector },
  TransformerWinding: { identity: namingIdentity, selector: namingSelector },
  TrgOps: { identity: singletonIdentity, selector: singletonSelector },
  TrgOpts: { identity: singletonIdentity, selector: singletonSelector },
  Val: { identity: valIdentity, selector: valSelector },
  ValueHandling: { identity: singletonIdentity, selector: singletonSelector },
  Voltage: { identity: singletonIdentity, selector: singletonSelector },
  VoltageLevel: { identity: namingIdentity, selector: namingSelector },
};

function singletonIdentity(e: Element): string {
  return identity(e.parentElement).toString();
}

export const singletonTags: Partial<Record<string, string[]>> = {
  AccessControl: ['LDevice'],
  Address: ['ConnectedAP', 'GSE', 'SMV'],
  Authentication: ['Server'],
  BitRate: ['SubNetwork'],
  ClientServices: ['Services'],
  CommProt: ['Services'],
  Communication: ['SCL'],
  ConfDataSet: ['Services'],
  ConfLdName: ['Services'],
  ConfLNs: ['Services'],
  ConfLogControl: ['Services'],
  ConfReportControl: ['Services'],
  ConfSG: ['SettingGroups'],
  ConfSigRef: ['Services'],
  DataObjectDirectory: ['Services'],
  DataSetDirectory: ['Services'],
  DataTypeTemplates: ['SCL'],
  DynAssociation: ['Services'],
  DynDataSet: ['Services'],
  FileHandling: ['Services'],
  GetCBValues: ['Services'],
  GetDataObjectDefinition: ['Services'],
  GetDataSetValue: ['Services'],
  GetDirectory: ['Services'],
  GOOSE: ['Services'],
  GSEDir: ['Services'],
  GSESettings: ['Services'],
  GSSE: ['Services'],
  Header: ['SCL'],
  History: ['Header'],
  Inputs: ['LN', 'LN0'],
  IssuerName: ['GOOSESecurity', 'SMVSecurity'],
  LN0: ['LDevice'],
  LogSettings: ['Services'],
  MaxTime: ['GSE'],
  McSecurity: ['GSESettings', 'SMVSettings', 'ClientServices'],
  MinTime: ['GSE'],
  OptFields: ['ReportControl'],
  Protocol: ['GSEControl', 'SMVControl'],
  ReadWrite: ['Services'],
  RedProt: ['Services'],
  ReportSettings: ['Services'],
  RptEnabled: ['ReportControl'],
  SamplesPerSec: ['SMVSettings'],
  SecPerSamples: ['SMVSettings'],
  Server: ['AccessPoint'],
  ServerAt: ['AccessPoint'],
  Services: ['IED', 'AccessPoint'],
  SetDataSetValue: ['Services'],
  SettingControl: ['LN0'],
  SettingGroups: ['Services'],
  SGEdit: ['SettingGroups'],
  SmpRate: ['SMVSettings'],
  SmvOpts: ['SampledValueControl'],
  SMVsc: ['Services'],
  SMVSettings: ['Services'],
  Subject: ['GOOSESecurity', 'SMVSecurity'],
  SupSubscription: ['Services'],
  TimerActivatedControl: ['Services'],
  TimeSyncProt: ['Services'],
  TrgOps: ['ReportControl'],
  ValueHandling: ['Services'],
  Voltage: ['VoltageLevel'],
};

const tAbstractConductingEquipment = [
  'TransformerWinding',
  'ConductingEquipment',
] as const;

const tEquipment = [
  'GeneralEquipment',
  'PowerTransformer',
  ...tAbstractConductingEquipment,
] as const;
const tEquipmentContainer = ['Substation', 'VoltageLevel', 'Bay'] as const;
const tGeneralEquipmentContainer = ['Process', 'Line'] as const;
const tAbstractEqFuncSubFunc = ['EqSubFunction', 'EqFunction'] as const;

const tPowerSystemResource = [
  'SubFunction',
  'Function',
  'TapChanger',
  'SubEquipment',
  ...tEquipment,
  ...tEquipmentContainer,
  ...tGeneralEquipmentContainer,
  ...tAbstractEqFuncSubFunc,
] as const;
const tLNodeContainer = ['ConnectivityNode', ...tPowerSystemResource] as const;
const tCertificate = ['GOOSESecurity', 'SMVSecurity'] as const;
const tNaming = ['SubNetwork', ...tCertificate, ...tLNodeContainer] as const;

const tAbstractDataAttribute = ['BDA', 'DA'] as const;
const tControlWithIEDName = ['SampledValueControl', 'GSEControl'] as const;
const tControlWithTriggerOpt = ['LogControl', 'ReportControl'] as const;
const tControl = [...tControlWithIEDName, ...tControlWithTriggerOpt] as const;
const tControlBlock = ['GSE', 'SMV'];
const tUnNaming = [
  'ConnectedAP',
  'PhysConn',
  'SDO',
  'DO',
  'DAI',
  'SDI',
  'DOI',
  'Inputs',
  'RptEnabled',
  'Server',
  'Communication',
  'Log',
  'LDevice',
  'DataSet',
  'AccessPoint',
  'IED',
  ...tControl,
  ...tControlBlock,
  ...tAbstractDataAttribute,
] as const;

const tAnyLN = ['LN0', 'LN'] as const;

const tAnyContentFromOtherNamespace = [
  'Text',
  'Private',
  'Hitem',
  'AccessControl',
] as const;

const tCert = ['Subject', 'IssuerName'] as const;
const tValueWithUnit = ['Voltage', 'DurationInSec'] as const;

const tIDNaming = ['LNodeType', 'DOType', 'DAType', 'EnumType'] as const;

const tServiceYesNo = [
  'FileHandling',
  'TimeSyncProt',
  'CommProt',
  'SGEdit',
  'ConfSG',
  'GetDirectory',
  'GetDataObjectDefinition',
  'DataObjectDirectory',
  'GetDataSetValue',
  'SetDataSetValue',
  'DataSetDirectory',
  'ReadWrite',
  'TimerActivatedControl',
  'GetCBValues',
  'GSEDir',
  'ConfLdName',
] as const;

const tServiceWithMaxAndMaxAttributes = ['DynDataSet', 'ConfDataSet'] as const;

const tServiceWithMax = [
  'GSSE',
  'GOOSE',
  'ConfReportControl',
  'SMVsc',
  ...tServiceWithMaxAndMaxAttributes,
] as const;

const tServiceWithMaxNonZero = ['ConfLogControl', 'ConfSigRef'] as const;

const tServiceSettings = [
  'ReportSettings',
  'LogSettings',
  'GSESettings',
  'SMVSettings',
] as const;

const tBaseElement = ['SCL', ...tNaming, ...tUnNaming, ...tIDNaming] as const;

const sCLTags = [
  ...tBaseElement,
  ...tAnyContentFromOtherNamespace,
  'Header',
  'LNode',
  'Val',
  ...tValueWithUnit,
  'Services',
  ...tCert,
  'Association',
  'FCDA',
  'TrgOpts',
  'ClientLN',
  'IEDName',
  'ExtRef',
  'Protocol',
  ...tAnyLN,
  ...tServiceYesNo,
  'DynAssociation',
  'SettingGroups',
  ...tServiceWithMax,
  ...tServiceWithMaxNonZero,
  ...tServiceSettings,
  'ConfLNs',
  'ClientServices',
  'SupSubscription',
  'ValueHandling',
  'RedProt',
  'McSecurity',
  'KDC',
  'Address',
  'P',
  'ProtNs',
  'EnumVal',
  'Terminal',
  'BitRate',
  'Authentication',
  'DataTypeTemplates',
  'History',
  'OptFields',
  'SmvOpts',
  'TrgOps',
] as const;

console.log(Array.from(sCLTags).sort());

type SCLTag = typeof sCLTags[number];

type NamingTag = typeof tNaming[number] | typeof tUnNaming[number];

export const namingParents: Record<NamingTag, string[]> = {
  SubNetwork: ['Communication'],
  GOOSESecurity: ['AccessPoint'],
  SMVSecurity: ['AccessPoint'],
  ConnectivityNode: ['Bay', 'Line'],
  SubFunction: ['SubFunction', 'Function'],
  Function: [
    'Bay',
    'VoltageLevel',
    'Substation',
    ...tGeneralEquipmentContainer,
  ],
  TapChanger: ['TransformerWinding'],
  SubEquipment: [
    'TapChanger',
    'PowerTransformer',
    ...tAbstractConductingEquipment,
  ],
  Process: ['Process', 'SCL'],
  Line: ['Process', 'SCL'],
  EqSubFunction: [...tAbstractEqFuncSubFunc],
  EqFunction: [
    'GeneralEquipment',
    'TapChanger',
    'TransformerWinding',
    'PowerTransformer',
    'SubEquipment',
    'ConductingEquipment',
  ],
  GeneralEquipment: [
    'SubFunction',
    'Function',
    ...tGeneralEquipmentContainer,
    ...tAbstractEqFuncSubFunc,
    ...tEquipmentContainer,
  ],
  PowerTransformer: [...tEquipmentContainer],
  TransformerWinding: ['PowerTransformer'],
  ConductingEquipment: ['Process', 'Line', 'SubFunction', 'Function', 'Bay'],
  Bay: ['VoltageLevel'],
  VoltageLevel: ['Substation'],
  Substation: ['SCL', 'Process'],
  SDO: ['DOType'],
  DO: ['LNodeType'],
  DAI: ['DOI', 'SDI'],
  SDI: ['DOI', 'SDI'],
  DOI: [...tAnyLN],
  Log: [...tAnyLN],
  DataSet: [...tAnyLN],
  AccessPoint: ['IED'],
  IED: ['SCL'],
  BDA: ['DAType'],
  DA: ['DOType'],
  SampledValueControl: ['LN0'],
  GSEControl: ['LN0'],
  LogControl: [...tAnyLN],
  ReportControl: [...tAnyLN],
};

function namingIdentity(e: Element): string {
  return e.parentElement!.tagName === 'SCL'
    ? e.getAttribute('name')!
    : `${identity(e.parentElement)}>${e.getAttribute('name')}`;
}

function namingSelector(
  tagName: NamingTag,
  identity: string,
  depth = -1
): string {
  if (depth === -1) depth = identity.split('>').length;

  const [parentIdentity, name] = pathParts(identity);
  if (depth === 0) return `${tagName}[name="${name}"]`;

  const parents = namingParents[tagName];
  if (!parents) return ':not(*)';

  const parentSelectors = parents.flatMap(parentTag =>
    namingParents[<NamingTag>parentTag]
      ? namingSelector(<NamingTag>parentTag, parentIdentity, depth - 1).split(
          ','
        )
      : selector(parentTag, parentIdentity).split(',')
  );

  return crossProduct(parentSelectors, ['>'], [tagName], [`[name="${name}"]`])
    .map(strings => strings.join(''))
    .join(',');
}

function singletonSelector(tagName: string, identity: string): string {
  const parents = singletonTags[tagName];
  if (!parents) return ':not(*)';

  const parentSelectors = parents.flatMap(parentTag =>
    selector(parentTag, identity).split(',')
  );

  return crossProduct(parentSelectors, ['>'], [tagName])
    .map(strings => strings.join(''))
    .join(',');
}

function idNamingIdentity(e: Element): string {
  return `#${e.id}`;
}

function idNamingSelector(tagName: string, identity: string): string {
  return `${tagName}[id="${identity.replace('#', '')}"]`;
}

export function selector(tagName: string, identity: string | number): string {
  if (typeof identity !== 'string') return ':not(*)';

  if (sCLTags.includes(tagName))
    return tags[tagName].selector(tagName, identity);

  return tagName;
}

/** @returns a string uniquely identifying `e` in its document, or NaN if `e`
 * is unidentifiable. */
export function identity(e: Element | null): string | number {
  if (e === null) return NaN;
  if (e.closest('Private')) return NaN;

  if (sCLTags.includes(e.tagName)) return tags[e.tagName].identity(e);

  return NaN;
}

/** @returns whether `a` and `b` are considered identical by IEC-61850 */
export function isSame(a: Element, b: Element): boolean {
  if (a.tagName === 'Private')
    return isSame(a.parentElement!, b.parentElement!) && a.isEqualNode(b);
  return a.tagName === b.tagName && identity(a) === identity(b);
}

export function isEqual(a: Element, b: Element): boolean {
  if (a.closest('Private') || b.closest('Private')) return a.isEqualNode(b);

  const attributeNames = new Set(
    a.getAttributeNames().concat(b.getAttributeNames())
  );
  for (const name of attributeNames)
    if (a.getAttribute(name) !== b.getAttribute(name)) return false;

  if (a.childElementCount === 0)
    return (
      b.childElementCount === 0 &&
      a.textContent?.trim() === b.textContent?.trim()
    );

  const aChildren = Array.from(a.children);
  const bChildren = Array.from(b.children);

  for (const aChild of aChildren) {
    const twindex = bChildren.findIndex(bChild => isEqual(aChild, bChild));
    if (twindex === -1) return false;
    bChildren.splice(twindex, 1);
  }

  for (const bChild of bChildren)
    if (!aChildren.find(aChild => isEqual(bChild, aChild))) return false;

  return true;
}

/** @returns a new [[`tag`]] element owned by [[`doc`]]. */
export function createElement(
  doc: Document,
  tag: string,
  attrs: Record<string, string | null>
): Element {
  const element = doc.createElementNS(doc.documentElement.namespaceURI, tag);
  Object.entries(attrs)
    .filter(([_, value]) => value !== null)
    .forEach(([name, value]) => element.setAttribute(name, value!));
  return element;
}

/** A directive rendering its argument `rendered` only if `rendered !== {}`. */
export const ifImplemented = directive(rendered => (part: Part) => {
  if (Object.keys(rendered).length) part.setValue(rendered);
  else part.setValue('');
});

/** Constructor type for defining `LitElement` mixins. */
export type LitElementConstructor = new (...args: any[]) => LitElement;

/** The type returned by `MyMixin(...)` is `Mixin<typeof MyMixin>`. */
export type Mixin<T extends (...args: any[]) => any> = InstanceType<
  ReturnType<T>
>;

const nameStartChar =
  '[:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
  '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
  '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[\u{10000}\\-\u{EFFFF}]';
const nameChar =
  nameStartChar + '|[.0-9-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040]';
const name = nameStartChar + '(' + nameChar + ')*';
const nmToken = '(' + nameChar + ')+';

export const restrictions = {
  string:
    '([\u0009-\u000A]|[\u000D]|[\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]' +
    '|[\uE000-\uFFFD]|[\u{10000}\\-\u{10FFFF}])*',
  normalizedString:
    '([\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]|[\uE000-\uFFFD]' +
    '|[\u{10000}\\-\u{10FFFF}])*',
  name,
  nmToken,
  names: name + '( ' + name + ')*',
  nmTokens: nmToken + '( ' + nmToken + ')*',
  decimal: '((-|\\+)?([0-9]+(\\.[0-9]*)?|\\.[0-9]+))',
  unsigned: '\\+?([0-9]+(\\.[0-9]*)?|\\.[0-9]+)',
};

/** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
export function compareNames(a: Element | string, b: Element | string): number {
  if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);

  if (typeof a === 'object' && typeof b === 'string')
    return a.getAttribute('name')!.localeCompare(b);

  if (typeof a === 'string' && typeof b === 'object')
    return a.localeCompare(b.getAttribute('name')!);

  if (typeof a === 'object' && typeof b === 'object')
    return a.getAttribute('name')!.localeCompare(b.getAttribute('name')!);

  return 0;
}

/** Throws an error bearing `message`, never returning. */
export function unreachable(message: string): never {
  throw new Error(message);
}

/** @returns the cartesian product of `arrays` */
export function crossProduct<T>(...arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (a, b) => <T[][]>a.flatMap(d => b.map(e => [d, e].flat())),
    [[]]
  );
}

export function findFCDAs(extRef: Element): Element[] {
  if (extRef.tagName !== 'ExtRef' || extRef.closest('Private')) return [];

  const [iedName, ldInst, prefix, lnClass, lnInst, doName, daName] = [
    'iedName',
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
    'doName',
    'daName',
  ].map(name => extRef.getAttribute(name));
  const ied = Array.from(extRef.ownerDocument.getElementsByTagName('IED')).find(
    element =>
      element.getAttribute('name') === iedName && !element.closest('Private')
  );
  if (!ied) return [];

  return Array.from(ied.getElementsByTagName('FCDA'))
    .filter(item => !item.closest('Private'))
    .filter(
      fcda =>
        (fcda.getAttribute('ldInst') ?? '') === (ldInst ?? '') &&
        (fcda.getAttribute('prefix') ?? '') === (prefix ?? '') &&
        (fcda.getAttribute('lnClass') ?? '') === (lnClass ?? '') &&
        (fcda.getAttribute('lnInst') ?? '') === (lnInst ?? '') &&
        (fcda.getAttribute('doName') ?? '') === (doName ?? '') &&
        (fcda.getAttribute('daName') ?? '') === (daName ?? '')
    );
}

const serviceTypeControlBlockTags: Partial<Record<string, string[]>> = {
  GOOSE: ['GSEControl'],
  SMV: ['SampledValueControl'],
  Report: ['ReportControl'],
  NONE: ['LogControl', 'GSEControl', 'SampledValueControl', 'ReportControl'],
};

export function findControlBlocks(extRef: Element): Set<Element> {
  const fcdas = findFCDAs(extRef);
  const cbTags =
    serviceTypeControlBlockTags[extRef.getAttribute('serviceType') ?? 'NONE'] ??
    [];
  const controlBlocks = new Set(
    fcdas.flatMap(fcda => {
      const dataSet = fcda.parentElement!;
      const dsName = dataSet.getAttribute('name') ?? '';
      const anyLN = dataSet.parentElement!;
      return cbTags
        .flatMap(tag => Array.from(anyLN.getElementsByTagName(tag)))
        .filter(cb => cb.getAttribute('datSet') === dsName);
    })
  );
  return controlBlocks;
}

declare global {
  interface ElementEventMap {
    ['pending-state']: PendingStateEvent;
    ['editor-action']: EditorActionEvent<EditorAction>;
    ['wizard']: WizardEvent;
    ['log']: LogEvent;
  }
}
