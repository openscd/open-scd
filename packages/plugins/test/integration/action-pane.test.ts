import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/action-pane.js';
import '../../src/editors/substation/bay-editor.js';
import { ActionPane } from '@openscd/open-scd/src/action-pane.js';

describe('action-pane', () => {
  let element: ActionPane;
  const label = 'test label';

  beforeEach(async () => {
    element = await fixture(
      html`<action-pane header="test header" label="${label}"></action-pane>`
    );
    await element.updateComplete;
  });

  describe('with existing parent action-pane', () => {
    let parent: ActionPane;
    const bay = <Element>(
      new DOMParser().parseFromString(
        `<Bay name="name" desc="desc"></Bay>`,
        'application/xml'
      ).documentElement
    );
    beforeEach(async () => {
      parent = await fixture(
        html`<action-pane header="parent header"
          ><bay-editor .element=${bay}></bay-editor
        ></action-pane>`
      );

      element = parent
        .querySelector('bay-editor')!
        .shadowRoot!.querySelector<ActionPane>('action-pane')!;
      await element.updateComplete;
    });

    it('increments the default level property of the parent', () => {
      expect(element.level).to.equal(2);
    });

    it('only increments on first update', async () => {
      parent.level = 3;
      await parent.requestUpdate();

      expect(element.level).to.equal(2);
    });
  });
});
