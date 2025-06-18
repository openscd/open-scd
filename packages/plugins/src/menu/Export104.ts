import { LitElement, property } from 'lit-element';
import { stringify } from 'csv-stringify/browser/esm/sync';
import { newLogEvent } from '@openscd/core/foundation/deprecated/history.js';

import { extractAllSignal104Data, Signal104 } from './export104/foundation.js';
import { get } from 'lit-translate';



export default class Export104 extends LitElement {
  @property({ attribute: false }) doc!: XMLDocument;
  @property() docName!: string;

  private readonly csvHeaders = [
    'Id',
    'Name',
    'Signal Number',
    'mIOA',
    'cIOA'
  ];

  async run(): Promise<void> {
    const { signals, errors } = extractAllSignal104Data(this.doc);

    errors.forEach((error) => this.logWarning(error));

    if (signals.length === 0) {
      this.dispatchEvent(newLogEvent({
        kind: 'info',
        title: get('compas.export104.noSignalsFound'),
      }));
      return;
    }

    const csvLines = this.generateCsvLines(signals);

    const csvContent = stringify(csvLines, {
      header: true,
      columns: this.csvHeaders,
    });
    const csvBlob = new Blob([csvContent], {
      type: 'text/csv',
    });

    this.downloadCsv(csvBlob);
  }

  private logWarning(errorMessage: string): void {
    this.dispatchEvent(newLogEvent({
      kind: 'warning',
      title: get('compas.export104.invalidSignalWarning'),
      message: errorMessage,
    }));
  }

  private generateCsvLines(allSignal104Data: Signal104[]): string[][] {
    const lines: string[][] = [];

    for(const signal104Data of allSignal104Data) {
      const line = [
        '',
        signal104Data.name ?? '',
        signal104Data.signalNumber ?? '',
      ];

      if (signal104Data.isMonitorSignal) {
        line.push(signal104Data.ioa ?? '', '');
      } else {
        line.push(signal104Data.ioa ?? '', signal104Data.ioa ?? '');
      }

      lines.push(line);
    }

    return lines;
  }

  private downloadCsv(csvBlob: Blob): void {
    const a = document.createElement('a');
    a.download = this.docName + '-104-signals.csv';
    a.href = URL.createObjectURL(csvBlob);
    a.dataset.downloadurl = ['text/csv', a.download, a.href].join(':');
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
}