import { get } from "lit-translate";

export const PROTOCOL_104_PRIVATE = 'IEC_60870_5_104';

export interface Signal104 {
  name: string | null;
  signalNumber: string | null;
  isMonitorSignal: boolean;
  ioa: string | null;
  ti: string | null;
}

interface ExtractSignal104Result {
  signal: Signal104 | null;
  error?: string;
}

enum SignalType {
  Monitor,
  MonitorAndControl,
  Unknown
}

const private104Selector = `Private[type="${PROTOCOL_104_PRIVATE}"]`;

export function extractAllSignal104Data(doc: XMLDocument): { signals: Signal104[], errors: string[] } {
  const signals: Signal104[] = [];
  const errors: string[] = [];
  const address104Elements = doc.querySelectorAll(`${private104Selector} > Address`);

  address104Elements.forEach((addressElement) => {
    const signal104Result = extractSignal104Data(addressElement, doc);

    if (signal104Result.error) {
      errors.push(signal104Result.error);
    } else {
      signals.push(signal104Result.signal!);
    }
  });

  return { signals, errors };
}

function extractSignal104Data(addressElement: Element, doc: XMLDocument): ExtractSignal104Result {
  const ti = addressElement.getAttribute('ti');
  const ioa = addressElement.getAttribute('ioa');

  // By convention the last four digits of the ioa are the signalnumber, see https://github.com/com-pas/compas-open-scd/issues/334
  if (ti === null || ioa === null || ioa.length < 4) {
    return { signal: null, error: get('compas.export104.errors.tiOrIoaInvalid', { ti: ti ?? '', ioa: ioa ?? '' }) };
  }
  const { signalNumber, bayName } = splitIoa(ioa);

  const signalType = getSignalType(ti);
  if (signalType === SignalType.Unknown) {
    return { signal: null, error: get('compas.export104.errors.unknownSignalType', { ti: ti ?? '', ioa: ioa ?? '' }) };
  }
  const isMonitorSignal = signalType === SignalType.Monitor;

  addressElement.parentElement;
  const parentDOI = addressElement.closest('DOI');
  
  if (!parentDOI) {
    return { signal: null, error: get('compas.export104.errors.noDoi', { ioa: ioa ?? '' }) };
  }

  const doiDesc = parentDOI.getAttribute('desc');

  const parentBayQuery = `:root > Substation > VoltageLevel > Bay[name="${bayName}"]`;
  const parentBay = doc.querySelector(parentBayQuery);

  if (!parentBay) {
    return { signal: null, error: get('compas.export104.errors.noBay', { bayName, ioa: ioa ?? '' }) };
  }

  const parentVoltageLevel = parentBay.closest('VoltageLevel');

  if (!parentVoltageLevel) {
    return { signal: null, error: get('compas.export104.errors.noVoltageLevel', { bayName, ioa: ioa ?? '' }) };
  }

  const voltageLevelName = parentVoltageLevel.getAttribute('name');
  const parentSubstation = parentVoltageLevel.closest('Substation');

  if (!parentSubstation) {
    return { signal: null, error: get('compas.export104.errors.noSubstation', { voltageLevelName: voltageLevelName ?? '', ioa: ioa ?? '' }) };
  }

  const substationName = parentSubstation.getAttribute('name');

  const name = `${substationName} ${voltageLevelName} ${bayName} ${doiDesc}`;

  return {
    signal: {
      name,
      signalNumber,
      isMonitorSignal,
      ti,
      ioa
    }
  }
}

// For signal classification details see https://github.com/com-pas/compas-open-scd/issues/334
function getSignalType(tiString: string): SignalType {
  const ti = parseInt(tiString);

  if (isNaN(ti)) {
    return SignalType.Unknown;
  }

  if ((ti >= 1 && ti <= 21) || (ti >= 30 && ti <= 40)) {
    return SignalType.Monitor;
  } else if ((ti >= 45 && ti <= 51) || (ti >= 58 && ti <= 64)) {
    return SignalType.MonitorAndControl;
  } else {
    return SignalType.Unknown;
  }
}

// By Alliander convention the last four digits of the ioa are the signalnumber and the rest is the bay number
// And every bay name consists of "V" + bay number
function splitIoa(ioa: string): { signalNumber: string, bayName: string } {
  const signalNumber = ioa.slice(-4);
  const bayName = `V${ioa.slice(0, -4)}`;

  return { signalNumber, bayName };
}
