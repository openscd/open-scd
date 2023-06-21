import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';

import { ListItem } from '@material/mwc-list/mwc-list-item.js';

import { Editing } from '../../../src/Editing.js';
import { Wizarding } from '../../../src/Wizarding.js';
import { Logging } from '../../../src/Logging.js';
import GooseSubscriberMessageBindingPlugin from '../../../src/editors/GooseSubscriberMessageBinding.js';

describe('GOOSE subscriber plugin', () => {
  customElements.define(
    'subscription-plugin',
    Wizarding(Editing(Logging(GooseSubscriberMessageBindingPlugin)))
  );
  let element: GooseSubscriberMessageBindingPlugin;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/MessageBindingGOOSE2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<subscription-plugin .doc=${doc}></subscription-plugin>`
    );
  });

  describe('in Publisher view', () => {
    describe('per default', () => {
      describe('the plugin itself', () => {
        it('looks like the latest snapshot', async () => {
          await expect(element).shadowDom.to.equalSnapshot();
        });
      });

      describe('the right hand side GSEControl list', () => {
        it('looks like the latest snapshot', async () => {
          await expect(
            element.shadowRoot?.querySelector('goose-list')
          ).shadowDom.to.equalSnapshot();
        });
      });

      describe('the left hand side subscriber IED list', () => {
        it('looks like the latest snapshot', async () => {
          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });
      });
    });

    describe('with a selected GOOSE message', () => {
      const nthGSEControl = 1;
      let fCDAs: Element[];
      let gseControlBlock: Element;

      let goose: HTMLElement;

      beforeEach(async () => {
        gseControlBlock =
          doc.querySelectorAll('GSEControl[datSet]')[nthGSEControl];
        fCDAs = Array.from(
          gseControlBlock.parentElement?.querySelectorAll(
            `DataSet[name="${gseControlBlock.getAttribute('datSet')}"] > FCDA`
          ) ?? []
        );

        goose = Array.from(
          element.shadowRoot
            ?.querySelector('goose-list')
            ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
        ).filter(item => !item.noninteractive)[nthGSEControl];

        (<HTMLElement>goose).click();
        await element.updateComplete;
      });

      describe('the left hand side subscriber IED list', () => {
        it('looks like the latest snapshot', async () => {
          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });
      });

      describe('for unsubscribed IEDs', () => {
        it('ExtRefs are not present in the IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED3"] ExtRef[iedName="IED2"]'
            ).length
          ).to.eql(0);
        });

        describe('after clicking on the IEDs list element', () => {
          beforeEach(async () => {
            (<HTMLElement>getItemFromSubscriberList('IED3')).click();
            await element.requestUpdate();
          });

          describe('the left hand side subscriber IED list', () => {
            it('looks like the latest snapshot', async () =>
              await expect(getSubscriberList()).shadowDom.to.equalSnapshot());
          });

          it('as many ExtRefs are added to the IED as there are FCDAs', async () => {
            expect(
              element.doc.querySelectorAll(
                'IED[name="IED3"] ExtRef[iedName="IED2"]'
              ).length
            ).to.eql(fCDAs.length);
          });

          it('all Ed1 attributes are added', async () => {
            fCDAs.forEach(
              fcda =>
                expect(
                  element.doc.querySelector(
                    `IED[name="IED3"] ExtRef[iedName="IED2"][ldInst="${fcda.getAttribute(
                      'ldInst'
                    )}"][prefix="${fcda.getAttribute(
                      'prefix'
                    )}"][lnClass="${fcda.getAttribute(
                      'lnClass'
                    )}"][lnInst="${fcda.getAttribute(
                      'lnInst'
                    )}"][doName="${fcda.getAttribute(
                      'doName'
                    )}"][daName="${fcda.getAttribute('daName')}"]`
                  )
                ).to.exist
            );
          });

          it('all Ed2 attributes are added properly', async () => {
            fCDAs.forEach(
              fcda =>
                expect(
                  element.doc.querySelector(
                    `IED[name="IED3"] ExtRef[iedName="IED2"][srcLDInst="${fcda
                      .closest('LDevice')
                      ?.getAttribute('inst')}"][srcPrefix="${
                      fcda.closest('LN0')?.getAttribute('prefix') ?? '' //prefix is mendatory in ExtRef!!
                    }"][srcLNClass="${fcda
                      .closest('LN0')
                      ?.getAttribute(
                        'lnClass'
                      )}"][srcCBName="${gseControlBlock.getAttribute(
                      'name'
                    )}"][serviceType="GOOSE"]`
                  )
                ).to.exist
            );
          });
        });
      });

      describe('for subscribed IEDs', () => {
        it('all ExtRefs are available', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED1"] ExtRef[iedName="IED2"]'
            ).length
          ).to.eql(3);
        });

        describe('after clicking on the IEDs list element', () => {
          beforeEach(async () => {
            (<HTMLElement>getItemFromSubscriberList('IED1')).click();
            await element.requestUpdate();
          });

          it('looks like the latest snapshot', async () => {
            await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
          });

          it('all ExtRefs are removed from the subscriber IED', async () => {
            expect(
              element.doc.querySelectorAll(
                'IED[name="IED1"] ExtRef[iedName="IED2"]'
              ).length
            ).to.eql(0);
          });
        });
      });

      describe('for partially subscribed IEDs', () => {
        it('some ExtRefs are available in the subscriber IED', async () => {
          const extRefs = element.doc.querySelectorAll(
            'IED[name="IED4"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED2"],' +
              'IED[name="IED4"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED2"]'
          );
          expect(extRefs.length).to.eql(2);
        });

        describe('after clicking on the IEDs list element', () => {
          beforeEach(async () => {
            (<HTMLElement>getItemFromSubscriberList('IED4')).click();
            await element.requestUpdate();
          });

          it('it looks like the latest snapshot', async () =>
            await expect(getSubscriberList()).shadowDom.to.equalSnapshot());

          it('adds the required ExtRefs to the subscriber IED', async () =>
            expect(
              element.doc.querySelectorAll(
                'IED[name="IED4"] ExtRef[iedName="IED2"]'
              ).length
            ).to.eql(5));
        });
      });
    });
  });

  describe('in Subscriber view', () => {
    beforeEach(async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('#gooseSubscriberView')
      )).click();
      await element.updateComplete;
    });

    describe('per default', () => {
      describe('the plugin itsself', () => {
        it('looks like the latest snapshot', async () => {
          await expect(element).shadowDom.to.equalSnapshot();
        });
      });

      describe('the right hand side IEDs list', () => {
        it('looks like the latest snapshot', async () => {
          await expect(
            element.shadowRoot?.querySelector('ied-list')
          ).shadowDom.to.equalSnapshot();
        });
      });

      describe('the left hand side subscriber IED list', () => {
        it('looks like the latest snapshot', async () => {
          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });
      });
    });

    describe('with a selected IED', () => {
      let ied: HTMLElement;

      beforeEach(async () => {
        ied = Array.from(
          element.shadowRoot
            ?.querySelector('ied-list')
            ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
        ).filter(item => !item.noninteractive)[1];

        (<HTMLElement>ied).click();
        await element.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      });

      describe('the left hand side subscriber IED list', () => {
        it('looks like the latest snapshot', async () => {
          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });
      });

      describe('for unsubscribed GSEControl s', () => {
        it('ExtRefs are not present in the subscriber IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] ExtRef[iedName="IED4"]'
            ).length
          ).to.eql(0);
        });

        describe('clicking on a GSEControl list item', () => {
          let fCDAs: Element[];
          let gseControlBlock: Element;

          beforeEach(async () => {
            gseControlBlock = doc.querySelector('IED[name="IED4"] GSEControl')!;
            fCDAs = Array.from(
              gseControlBlock.parentElement?.querySelectorAll(
                `DataSet[name="${gseControlBlock.getAttribute(
                  'datSet'
                )}"] > FCDA`
              ) ?? []
            );

            (<HTMLElement>getItemFromSubscriberList('IED4')).click();
            await element.requestUpdate();
          });

          describe('the left hand side subscriber IED list', () => {
            it('looks like the latest snapshot', async () =>
              await expect(getSubscriberList()).shadowDom.to.equalSnapshot());
          });

          it('all ExtRefs are present in the subscriber IED', async () => {
            expect(
              element.doc.querySelectorAll(
                'IED[name="IED2"]  ExtRef[iedName="IED4"]'
              ).length
            ).to.eql(fCDAs.length);
          });

          it('all Ed1 attributes are added', async () => {
            fCDAs.forEach(
              fcda =>
                expect(
                  element.doc.querySelector(
                    `IED[name="IED2"] ExtRef[iedName="IED4"][ldInst="${fcda.getAttribute(
                      'ldInst'
                    )}"][prefix="${fcda.getAttribute(
                      'prefix'
                    )}"][lnClass="${fcda.getAttribute(
                      'lnClass'
                    )}"][lnInst="${fcda.getAttribute(
                      'lnInst'
                    )}"][doName="${fcda.getAttribute(
                      'doName'
                    )}"][daName="${fcda.getAttribute('daName')}"]`
                  )
                ).to.exist
            );
          });

          it('all Ed2 attributes are added properly', async () => {
            fCDAs.forEach(
              fcda =>
                expect(
                  element.doc.querySelector(
                    `IED[name="IED2"] ExtRef[iedName="IED4"][srcLDInst="${fcda
                      .closest('LDevice')
                      ?.getAttribute('inst')}"][srcPrefix="${
                      fcda.closest('LN0')?.getAttribute('prefix') ?? '' //prefix is mendatory in ExtRef!!
                    }"][srcLNClass="${fcda
                      .closest('LN0')
                      ?.getAttribute(
                        'lnClass'
                      )}"][srcCBName="${gseControlBlock.getAttribute(
                      'name'
                    )}"][serviceType="GOOSE"]`
                  )
                ).to.exist
            );
          });
        });
      });

      describe('for subscribed GSEControl s', () => {
        beforeEach(async () => {
          (<HTMLElement>getItemFromSubscriberList('IED4')).click();
          await element.requestUpdate();
        });

        it('all ExtRefs are available in the subscriber IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] ExtRef[iedName="IED4"]'
            ).length
          ).to.eql(5);
        });

        describe('clicking on the GSEControl list item', () => {
          beforeEach(async () => {
            (<HTMLElement>getItemFromSubscriberList('IED4')).click();
            await element.requestUpdate();
          });

          describe('the left hand side subscriber IED list', () => {
            it('looks like the latest snapshot', async () =>
              await expect(getSubscriberList()).shadowDom.to.equalSnapshot());
          });

          it('ExtRefs to the subscriber IED are removed', async () =>
            expect(
              element.doc.querySelectorAll(
                'IED[name="IED2"] ExtRef[iedName="IED4"]'
              ).length
            ).to.eql(0));
        });
      });

      describe('for partially subscribed GSEControl s', () => {
        it('some ExtRefs are available in the subscriber IED', async () => {
          const extRefs = doc.querySelectorAll(
            'IED[name="IED2"] ExtRef[iedName="IED1"]'
          );
          expect(extRefs.length).to.eql(4);
        });

        describe('clicking on the GSEControl list item', () => {
          beforeEach(async () => {
            (<HTMLElement>getItemFromSubscriberList('IED1')).click();
            await element.requestUpdate();
          });

          describe('the left hand side subscriber IED list', () => {
            it('looks like the latest snapshot', async () =>
              await expect(getSubscriberList()).shadowDom.to.equalSnapshot());
          });

          it('the missing ExtRefs are added to the subscriber IED', async () => {
            expect(
              element.doc.querySelectorAll(
                'IED[name="IED2"] ExtRef[iedName="IED1"]'
              ).length
            ).to.eql(9);
          });
        });
      });
    });
  });

  function getSubscriberList() {
    return element.shadowRoot?.querySelector('subscriber-list-goose');
  }

  function getItemFromSubscriberList(
    textInListItem: string
  ): ListItem | undefined {
    return (
      Array.from(
        getSubscriberList()!.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
      ).filter(listItem => listItem.innerHTML.includes(textInListItem))[0] ??
      undefined
    );
  }
});
