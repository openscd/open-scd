import { LitElement, property } from 'lit-element';
import { stringify } from 'csv-stringify/browser/esm/sync';

import { extractAllSignal104Data, Signal104 } from './export104/foundation.js';



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

    const allSignal104Data = extractAllSignal104Data(this.doc);
    const csvLines = this.generateCsvLines(allSignal104Data);

    const csvContent = stringify(csvLines, {
      header: true,
      columns: this.csvHeaders,
    });
    const csvBlob = new Blob([csvContent], {
      type: 'text/csv',
    });

    this.downloadCsv(csvBlob);

    console.log(csvLines);

    console.log('Export104', allSignal104Data);
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
        line.push('', signal104Data.ioa ?? '');
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