import { LitElement } from 'lit-element';

type ControlBlockType =
  | 'ReportControl'
  | 'LogControl'
  | 'GSEControl'
  | 'SampledValuesControl';

type ControlBlockConnectionType = 'IEDName' | 'ClientLN';

const cbConnection: Record<ControlBlockType, ControlBlockConnectionType> = {
  ReportControl: 'ClientLN',
  LogControl: 'ClientLN',
  GSEControl: 'IEDName',
  SampledValuesControl: 'IEDName',
};

interface Connection {
  source: Element;
  data?: Element;
  sink: Element;
}

/**
 * @returns array of - control block - Connection's
 * Control block connection are connections defined within the control block
 * by the element `ClientLN` for `ReportControl` and `LogControl` and
 * by the element `IEDName` for `GSEControl` and `SampledValueControl`
 */
export function getControlBlockConnection(
  root: Document | Element,
  cbType: ControlBlockType
): Connection[] {
  return Array.from(root.querySelectorAll(cbType))
    .filter(controlBlock => !controlBlock.closest('Private'))
    .flatMap(controlBlock => {
      return Array.from(controlBlock.querySelectorAll(cbConnection[cbType]))
        .filter(item => !item.closest('Private'))
        .flatMap(connection => {
          return {
            source: controlBlock,
            sink: connection,
          };
        });
    });
}

/**
 * @returns array of - data - Connection's
 * Data connection are connections defined between the FCDA in the source
 * and ExtRef in the sink
 */
export function getDataConnection(
  root: Document | Element,
  cbTagName: 'GSEControl' | 'SampledValueControl' | 'ReportControl'
): Connection[] {
  const controlBlocks = Array.from(root.querySelectorAll(cbTagName)).filter(
    item => !item.closest('Private')
  );

  const conn: Connection[] = [];

  controlBlocks.forEach(controlBlock => {
    const anyLN: Element = controlBlock.parentElement!;
    const data: Element[] = Array.from(
      anyLN.querySelectorAll(
        ` DataSet[name="${controlBlock.getAttribute('datSet')}"] > FCDA`
      )
    ).filter(item => !item.closest('Private'));

    data.map(fcda => {
      getDataSink(fcda).forEach(extref => {
        conn.push({ source: controlBlock, data: fcda, sink: extref });
      });
    });
  });

  return conn;
}

export default class CommunicationMappingPlugin extends LitElement {
  doc!: XMLDocument;

  async trigger(): Promise<void> {
    const report = getControlBlockConnection(this.doc, 'ReportControl');
    return;
  }
}
