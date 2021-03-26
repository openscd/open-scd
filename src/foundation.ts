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

/** @returns [[`EditorAction`]]s to dispatch on [[`WizardDialog`]] commit. */
export type WizardAction = (
  inputs: WizardInput[],
  wizard: Element
) => EditorAction[];

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
    action: WizardAction;
  };
  secondary?: {
    icon: string;
    label: string;
    action: WizardAction;
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
export function referencePath(element: Element): string {
  let path = '';
  let nextParent: Element | null = element.parentElement;
  while (nextParent?.getAttribute('name')) {
    path = '/' + nextParent.getAttribute('name') + path;
    nextParent = nextParent.parentElement;
  }
  return path;
}

function hitemIdentity(e: Element): string {
  return `v${e.getAttribute('version')}r${e.getAttribute('revision')}`;
}

function terminalIdentity(e: Element): string {
  return identity(e.parentElement) + '>' + e.getAttribute('connectivityNode');
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
  if (iedName === 'None') return `(${lnClass} ${lnType})`;
  return `${iedName} ${ldInst ?? '(Client)'}/${prefix ?? ''}${lnClass}${
    lnInst ?? ''
  }`;
}

function kdcIdentity(e: Element): string {
  return `${identity(e.parentElement)}>${e.getAttribute(
    'iedName'
  )} ${e.getAttribute('apName')}`;
}

function associationIdentity(e: Element): string {
  return `${identity(e.parentElement)} ${e.getAttribute('associationID')}`;
}

function lDeviceIdentity(e: Element): string {
  return `${identity(e.closest('IED')!)}>>${e.getAttribute('inst')}`;
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
  return `${identity(e.parentElement)}>${iedName}${apRef ? ' ' + apRef : ''}${
    ldInst ? ' ' + ldInst : ''
  }/${prefix ?? ''}${lnClass ?? ''}${lnInst ?? ''}`;
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
  const dataPath = `${ldInst}/${prefix ?? ''}${lnClass}${
    lnInst ?? ''
  }.${doName}${daName ? '.' + daName : ''}`;
  return `${identity(e.parentElement)}>${dataPath} (${fc}${
    ix ? '[' + ix + ']' : ''
  })`;
}

function extRefIdentity(e: Element): string | number {
  if (!e.parentElement) return NaN;
  const parentIdentity = identity(e.parentElement);
  const intAddr = e.getAttribute('intAddr');
  const intAddrIndex = e.parentElement.querySelector(
    `ExtRef[intAddr="${intAddr}"]`
  );
  if (intAddr) return `${parentIdentity}>${intAddr}[${intAddrIndex}]`;
  const [
    iedName,
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
    'iedName',
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
      }${srcLNClass}${srcLNInst ?? ''}`
    : '';
  const dataPath = `${iedName} ${ldInst}/${prefix ?? ''}${lnClass}${
    lnInst ?? ''
  }.${doName}${daName ? '.' + daName : ''}`;
  return `${parentIdentity}>${cbPath}${dataPath}`;
}

function lNIdentity(e: Element): string {
  const [prefix, lnClass, inst] = ['prefix', 'lnClass', 'inst'].map(name =>
    e.getAttribute(name)
  );
  return `${identity(e.parentElement)}>${prefix ?? ''}${lnClass}${inst}`;
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
  return `${identity(e.parentElement)}>${iedName}${
    apRef ? ' ' + apRef : ''
  } ${ldInst}/${prefix ?? ''}${lnClass}${lnInst}`;
}

function ixNamingIdentity(e: Element): string {
  const [name, ix] = ['name', 'ix'].map(name => e.getAttribute(name));
  return `${identity(e.parentElement)}>${name}${ix ? '[' + ix + ']' : ''}`;
}

function valIdentity(e: Element): string | number {
  if (!e.parentElement) return NaN;
  const sGroup = e.getAttribute('sGroup');
  const index = Array.from(e.parentElement.children)
    .filter(child => child.getAttribute('sGroup') === sGroup)
    .findIndex(child => child.isSameNode(e));
  return `${identity(e.parentElement)}>${sGroup ? sGroup + '.' : ''}${index}`;
}

function connectedAPIdentity(e: Element): string {
  const [iedName, apName] = ['iedName', 'apName'].map(name =>
    e.getAttribute(name)
  );
  return `${iedName} ${apName}`;
}

function controlBlockIdentity(e: Element): string {
  const [ldInst, cbName] = ['ldInst', 'cbName'].map(name =>
    e.getAttribute(name)
  );
  return `${ldInst} ${cbName}`;
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

function pIdentity(e: Element): string | number {
  if (!e.parentElement) return NaN;
  const eParent = e.parentElement;
  const eType = e.getAttribute('type');
  if (eParent.tagName === 'PhysConn')
    return `${identity(e.parentElement)}>${eType}`;
  const index = Array.from(e.parentElement.children)
    .filter(child => child.getAttribute('type') === eType)
    .findIndex(child => child.isSameNode(e));
  return `${identity(e.parentElement)}>${eType}[${index}]`;
}

function enumValIdentity(e: Element): string {
  return `${identity(e.parentElement)}>${e.getAttribute('ord')}`;
}

function protNsIdentity(e: Element): string {
  return `${identity(e.parentElement)}>${e.getAttribute('type') || '8-MMS'} ${
    e.textContent
  }`;
}

type IdentityFunction = (e: Element) => string | number;
type SelectorFunction = (tagName: string, identity: string) => string;

export const specialTags: Partial<
  Record<
    string,
    { identity: IdentityFunction; selector: SelectorFunction | null }
  >
> = {
  Hitem: { identity: hitemIdentity, selector: null },
  Terminal: { identity: terminalIdentity, selector: null },
  LNode: { identity: lNodeIdentity, selector: null },
  KDC: { identity: kdcIdentity, selector: null },
  Association: { identity: associationIdentity, selector: null },
  LDevice: { identity: lDeviceIdentity, selector: null },
  IEDName: { identity: iEDNameIdentity, selector: null },
  FCDA: { identity: fCDAIdentity, selector: null },
  ExtRef: { identity: extRefIdentity, selector: null },
  LN: { identity: lNIdentity, selector: null },
  ClientLN: { identity: clientLNIdentity, selector: null },
  DAI: { identity: ixNamingIdentity, selector: null },
  SDI: { identity: ixNamingIdentity, selector: null },
  Val: { identity: valIdentity, selector: null },
  ConnectedAP: { identity: connectedAPIdentity, selector: null },
  GSE: { identity: controlBlockIdentity, selector: null },
  SMV: { identity: controlBlockIdentity, selector: null },
  PhysConn: { identity: physConnIdentity, selector: null },
  P: { identity: pIdentity, selector: null },
  EnumVal: { identity: enumValIdentity, selector: null },
  ProtNs: { identity: protNsIdentity, selector: null },
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
];

const tEquipment = [
  'GeneralEquipment',
  'PowerTransformer',
  ...tAbstractConductingEquipment,
];
const tEquipmentContainer = ['Substation', 'VoltageLevel', 'Bay'];
const tGeneralEquipmentContainer = ['Process', 'Line'];
const tAbstractEqFuncSubFunc = ['EqSubFunction', 'EqFunction'];

const tPowerSystemResource = [
  'SubFunction',
  'Function',
  'TapChanger',
  'SubEquipment',
  ...tEquipment,
  ...tEquipmentContainer,
  ...tGeneralEquipmentContainer,
  ...tAbstractEqFuncSubFunc,
];
const tLNodeContainer = ['ConnectivityNode', ...tPowerSystemResource];
const tCertificate = ['GOOSESecurity', 'SMVSecurity'];
const tNaming = ['SubNetwork', ...tCertificate, ...tLNodeContainer];

export const namingTags: Partial<Record<string, string[]>> = {
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
  EqSubFunction: tAbstractEqFuncSubFunc,
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
  PowerTransformer: tEquipmentContainer,
  TransformerWinding: ['PowerTransformer'],
  ConductingEquipment: ['Process', 'Line', 'SubFunction', 'Function', 'Bay'],
  Bay: ['VoltageLevel'],
  VoltageLevel: ['Substation'],
  Substation: ['SCL', 'Process'],
};

function singletonSelector(tagName: string, identity: string): string {
  const parents = singletonTags[tagName];
  if (!parents) return ':not(*)';

  return parents
    .map(parentTag => selector(parentTag, identity) + '>' + tagName)
    .join(',');
}

function selector(tagName: string, identity: string | number): string {
  if (typeof identity !== 'string') return ':not(*)';

  if (singletonTags[tagName]) return singletonSelector(tagName, identity);
  if (specialTags[tagName])
    return specialTags[tagName]?.selector?.(tagName, identity) ?? ':not(*)';

  if (identity.indexOf('>') > -1) return '';

  if (identity.startsWith('#')) return tagName + identity;

  return tagName;
}

/** @returns a string uniquely identifying `e` in its document, or NaN if `e`
 * is unidentifiable. */
export function identity(e: Element | null): string | number {
  if (e === null) return NaN;
  if (e.closest('Private')) return NaN;

  if (singletonTags[e.tagName]) return singletonIdentity(<Element>e);
  const specialIdentity = specialTags[e.tagName]?.identity;
  if (specialIdentity) return specialIdentity(<Element>e);

  if (e.id) return `#${e.id}`;

  if (e.hasAttribute('name'))
    return e.parentElement
      ? `${identity(e.parentElement)}>${e.getAttribute('name')}`
      : NaN;

  if (e.tagName === 'SCL') return '';

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

declare global {
  interface ElementEventMap {
    ['pending-state']: PendingStateEvent;
    ['editor-action']: EditorActionEvent<EditorAction>;
    ['wizard']: WizardEvent;
    ['log']: LogEvent;
  }
}
