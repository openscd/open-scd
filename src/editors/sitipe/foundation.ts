// Substation element hierarchy
const substationPath = [':root', 'Substation', 'VoltageLevel', 'Bay'];

export type SubstationTag = 'Substation' | 'VoltageLevel' | 'Bay';

/** `Private`-safeguarded selectors for `Substation` and its descendants */
export const selectors = <Record<SubstationTag, string>>(
  Object.fromEntries(
    substationPath.map((e, i, a) => [e, a.slice(0, i + 1).join(' > ')])
  )
);

export const SIEMENS_SITIPE_IED = 'Siemens-SITIPE-IEDRef';

export const SIEMENS_SITIPE_TEMPLATE = 'Siemens-SITIPE-BayTemplate';
