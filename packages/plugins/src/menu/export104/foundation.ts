// TODO: Share with 104 editor plugin?
export const PROTOCOL_104_PRIVATE = 'IEC_60870_5_104';

export interface Signal104 {
  name: string | null;
  signalNumber: string | null;
  isMonitorSignal: boolean;
  ioa: string | null;
  ti: string | null;
}

enum SignalType {
  Monitor,
  Control,
  Unknown
}

const private104Selector = `Private[type="${PROTOCOL_104_PRIVATE}"]`;

export function extractAllSignal104Data(doc: XMLDocument): Signal104[] {
  const allSignal104Data: Signal104[] = [];
  const address104Elements = doc.querySelectorAll(`${private104Selector} > Address`);

  address104Elements.forEach((addressElement) => {
    const signal104Data = extractSignal104Data(addressElement, doc);

    if (signal104Data) {
      allSignal104Data.push(signal104Data);
    }
  });

  console.log(address104Elements);

  return allSignal104Data;
}

function extractSignal104Data(addressElement: Element, doc: XMLDocument): Signal104 | null {
  const ti = addressElement.getAttribute('ti');
  const ioa = addressElement.getAttribute('ioa');

  // By convention the last four digits of the ioa are the signalnumber, see https://github.com/com-pas/compas-open-scd/issues/334
  if (ti === null || ioa === null || ioa.length < 4) {
    console.log('No ti, io or io too short');
    return null;
  }
  const signalNumber = ioa.slice(-4);

  const signalType = getSignalType(ti);
  if (signalType === SignalType.Unknown) {
    console.log('Unknown signal type');
    return null;
  }
  const isMonitorSignal = signalType === SignalType.Monitor;

  // TODO: Doi desc, Bay name, VoltageLevel name, Substation name

  addressElement.parentElement;
  const parentDOI = addressElement.closest('DOI');
  
  if (!parentDOI) {
    console.log('No parent DOI');
    return null;
  }

  const doiDesc = parentDOI.getAttribute('desc');
  const parentIED = parentDOI.closest('IED');
  if (!parentIED) {
    console.log('No parent IED');
    return null;
  }

  const iedName = parentIED.getAttribute('name');

  const lNodeQuery = `Substation > VoltageLevel > Bay LNode[iedName="${iedName}"]`;
  console.log(lNodeQuery);
  const parentLNode = doc.querySelector(lNodeQuery);

  if (!parentLNode) {
    console.log('No parent LNode');
    return null;
  }

  const parentBay = parentLNode.closest('Bay');

  if (!parentBay) {
    console.log('No parent Bay');
    return null;
  }

  const bayName = parentBay.getAttribute('name');
  const parentVoltageLevel = parentBay.closest('VoltageLevel');

  if (!parentVoltageLevel) {
    console.log('No parent VL');
    return null;
  }

  const voltageLevelName = parentVoltageLevel.getAttribute('name');
  const parentSubstation = parentVoltageLevel.closest('Substation');

  if (!parentSubstation) {
    console.log('No parent Substation');
    return null;
  }

  const substationName = parentSubstation.getAttribute('name');

  const name = `${substationName}${voltageLevelName}${bayName}${doiDesc}`;

  return {
    name,
    signalNumber,
    isMonitorSignal,
    ti,
    ioa
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
    return SignalType.Control;
  } else {
    return SignalType.Unknown;
  }
}
