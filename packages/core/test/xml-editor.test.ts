import { expect } from '@open-wc/testing';
import { EditV2 } from '@openscd/oscd-api/dist/editv2.js';

import { OscdCommit, XMLEditor } from '../api/editor/xml-editor.js';
import { RemoveV2 } from '../foundation.js';

describe('XMLEditor', () => {
  let editor: XMLEditor;
  let scd: XMLDocument;
  let subscriberValues: OscdCommit<EditV2>[];

  let substation: Element;
  let voltageLevel: Element;
  let bay1: Element;

  beforeEach(() => {
    editor = new XMLEditor();

    subscriberValues = [];

    scd = new DOMParser().parseFromString(
      `<Substation name="s1">
        <VoltageLevel name="v1">
          <Bay name="b1" kind="bay">
            <LNode name="l1" />
          </Bay>
        </VoltageLevel>
      </Substation>`,
      'application/xml'
    );

    substation = scd.querySelector('Substation')!;
    voltageLevel = scd.querySelector('VoltageLevel')!;
    bay1 = scd.querySelector('Bay')!;
  });

  it('should call subscriber on commit', () => {
    editor.subscribe(c => subscriberValues.push(c as any));

    const deleteBay: RemoveV2 = {
      node: bay1
    };

    editor.commit(deleteBay);

    const [ commit ] = subscriberValues;
    expect(commit.redo).to.deep.equal([ deleteBay ]);
  });

  it('should set title in commit', () => {
    const title = 'Important change';

    const deleteBay: RemoveV2 = {
      node: bay1
    };

    editor.commit(deleteBay, { title });

    const [ commit ] = editor.past;
    expect(commit.title).to.equal(title);
  });

  it('should undo and redo changes', () => {
    const deleteBay: RemoveV2 = {
      node: bay1
    };

    editor.commit(deleteBay);

    const bayAfterDelete = scd.querySelector('Bay');
    expect(bayAfterDelete).to.be.null;

    editor.undo();

    const bayAfterUndo = scd.querySelector('Bay');
    expect(bayAfterUndo).to.equal(bay1);

    editor.redo();

    const bayAfterRedo = scd.querySelector('Bay');
    expect(bayAfterRedo).to.be.null;
  });

  it('should call subscribers on undo and redo', () => {
    const undos = [];
    const redos = [];

    editor.subscribeUndo(c => undos.push(c));
    editor.subscribeRedo(c => redos.push(c));

    const deleteBay: RemoveV2 = {
      node: bay1
    };

    editor.commit(deleteBay);

    editor.undo();

    const [ lastUndo ] = undos;
    expect(lastUndo.redo).to.deep.equal([ deleteBay ]);

    editor.redo();

    const [ lastRedo ] = redos;
    expect(lastRedo.redo).to.deep.equal([ deleteBay ]);
  });
});
