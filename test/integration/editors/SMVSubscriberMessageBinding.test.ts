import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';

import SMVSubscriberMessageBindingPlugin from '../../../src/editors/SMVSubscriberMessageBinding.js';
import { Editing } from '../../../src/Editing.js';
import { Logging } from '../../../src/Logging.js';
import { Wizarding } from '../../../src/Wizarding.js';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

describe('Sampled Values Plugin', () => {
  customElements.define(
    'smv-plugin',
    Wizarding(Editing(Logging(SMVSubscriberMessageBindingPlugin)))
  );
  let element: SMVSubscriberMessageBindingPlugin;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/MessageBindingSMV2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<smv-plugin .doc=${doc}></smv-plugin>`);
  });

  describe('in Publisher view', () => {
    describe('initially', () => {
      it('the plugin looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });

      it('the Sampled Values list looks like the latest snapshot', async () => {
        await expect(
          element.shadowRoot?.querySelector('smv-list')
        ).shadowDom.to.equalSnapshot();
      });

      it('the subscriber list looks like the latest snapshot', async () => {
        await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
      });
    });

    describe('when selecting a Sampled Values message', () => {
      const nthSampledValueStream = 0;
      let fCDAs: Element[];
      let smvControlBlock: Element;

      let smv: HTMLElement;

      beforeEach(async () => {
        smvControlBlock = doc.querySelectorAll('SampledValueControl')[
          nthSampledValueStream
        ];
        fCDAs = Array.from(
          smvControlBlock.parentElement?.querySelectorAll(
            `DataSet[name="${smvControlBlock.getAttribute('datSet')}"] > FCDA`
          ) ?? []
        );

        smv = Array.from(
          element.shadowRoot
            ?.querySelector('smv-list')
            ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
        ).filter(item => !item.noninteractive)[nthSampledValueStream];

        (<HTMLElement>smv).click();
        await element.updateComplete;
      });

      it('the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
        await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
      });

      describe('and subscribing an unsubscribed IED', () => {
        it('initially no ExtRefs are available in the subscriber IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(0);
        });

        it('it looks like the latest snapshot', async () => {
          (<HTMLElement>getItemFromSubscriberList('IED2')).click();
          await element.updateComplete;

          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });

        it('adds the required ExtRefs to the subscriber IED', async () => {
          (<HTMLElement>getItemFromSubscriberList('IED2')).click();
          await element.updateComplete;

          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(fCDAs.length);
        });

        it('makes sure that Ed1 attributes are added properly', async () => {
          (<HTMLElement>getItemFromSubscriberList('IED2')).click();
          await element.requestUpdate();

          fCDAs.forEach(
            fcda =>
              expect(
                element.doc.querySelector(
                  `IED[name="IED2"] ExtRef[iedName="IED3"][ldInst="${fcda.getAttribute(
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

        it('makes sure that Ed2 attributes are added properly', async () => {
          (<HTMLElement>getItemFromSubscriberList('IED2')).click();
          await element.requestUpdate();

          fCDAs.forEach(
            fcda =>
              expect(
                element.doc.querySelector(
                  `IED[name="IED2"] ExtRef[iedName="IED3"][srcLDInst="${fcda
                    .closest('LDevice')
                    ?.getAttribute('inst')}"][srcPrefix="${
                    fcda.closest('LN0')?.getAttribute('prefix') ?? '' //prefix is mendatory in ExtRef!!
                  }"][srcLNClass="${fcda
                    .closest('LN0')
                    ?.getAttribute(
                      'lnClass'
                    )}"][srcCBName="${smvControlBlock.getAttribute(
                    'name'
                  )}"][serviceType="SMV"]`
                )
              ).to.exist
          );
        });
      });

      describe('and you unsubscribe a subscribed IED', () => {
        it('initially all the ExtRefs are available in the subscriber IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                'IED[name="IED1"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(16);
        });

        it('it looks like the latest snapshot', async () => {
          (<HTMLElement>getItemFromSubscriberList('IED1')).click();
          await element.updateComplete;

          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });

        it('removes the required ExtRefs from the subscriber IED', async () => {
          (<HTMLElement>getItemFromSubscriberList('IED1')).click();
          await element.updateComplete;

          expect(
            element.doc.querySelectorAll(
              'IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                'IED[name="IED1"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(0);
        });
      });

      describe('and you subscribe a partially subscribed IED', () => {
        it('initially only 10 ExtRefs are available in the subscriber IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED4"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"],' +
                'IED[name="IED4"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(10);
        });

        it('it looks like the latest snapshot', async () => {
          (<HTMLElement>getItemFromSubscriberList('IED4')).click();
          await element.updateComplete;

          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });

        it('adds the required ExtRefs to the subscriber IED', async () => {
          (<HTMLElement>getItemFromSubscriberList('IED4')).click();
          await element.updateComplete;

          expect(
            element.doc.querySelectorAll(
              'IED[name="IED4"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"],' +
                'IED[name="IED4"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(16);
        });
      });
    });
  });

  describe('in Subscriber view', () => {
    beforeEach(async () => {
      (<HTMLElement>(
        element.shadowRoot?.querySelector('#smvSubscriberView')
      )).click();
      await element.updateComplete;
    });

    describe('initially', () => {
      it('the plugin looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });

      it('the IED list looks like the latest snapshot', async () => {
        await expect(
          element.shadowRoot?.querySelector('ied-list')
        ).shadowDom.to.equalSnapshot();
      });

      it('the subscriber list looks like the latest snapshot', async () => {
        await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
      });
    });

    describe('when selecting an IED', () => {
      let ied: HTMLElement;

      beforeEach(async () => {
        ied = Array.from(
          element.shadowRoot
            ?.querySelector('ied-list')
            ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
        ).filter(item => !item.noninteractive)[1];

        (<HTMLElement>ied).click();
        await element.updateComplete;
      });

      it('the subscriber list will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
        await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
      });

      describe('and subscribing a unsubscribed Sampled Value message', () => {
        it('initially no ExtRefs are available in the subscriber IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(0);
        });

        describe('clicking on a SampledValueControl list item', () => {
          let fCDAs: Element[];
          let smvControlBlock: Element;

          beforeEach(async () => {
            smvControlBlock = element.doc.querySelector(
              'IED[name="IED3"] SampledValueControl[name="MSVCB01"]'
            )!;
            fCDAs = Array.from(
              smvControlBlock.parentElement?.querySelectorAll(
                `DataSet[name="${smvControlBlock.getAttribute(
                  'datSet'
                )}"] > FCDA`
              ) ?? []
            );

            (<HTMLElement>getItemFromSubscriberList('MSVCB01')).click();
            await element.requestUpdate();
          });

          it('it looks like the latest snapshot', async () =>
            await expect(getSubscriberList()).shadowDom.to.equalSnapshot());

          it('adds the required ExtRefs to the subscriber IED', async () => {
            expect(
              element.doc.querySelectorAll(
                'IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                  'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
              ).length
            ).to.eql(fCDAs.length);
          });

          it('makes sure that Ed1 attributes are added properly', async () => {
            fCDAs.forEach(
              fcda =>
                expect(
                  element.doc.querySelector(
                    `IED[name="IED2"] ExtRef[iedName="IED3"][ldInst="${fcda.getAttribute(
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

          it('makes sure that Ed2 attributes are added properly', async () => {
            fCDAs.forEach(
              fcda =>
                expect(
                  element.doc.querySelector(
                    `IED[name="IED2"] ExtRef[iedName="IED3"][srcLDInst="${fcda
                      .closest('LDevice')
                      ?.getAttribute('inst')}"][srcPrefix="${
                      fcda.closest('LN0')?.getAttribute('prefix') ?? '' //prefix is mendatory in ExtRef!!
                    }"][srcLNClass="${fcda
                      .closest('LN0')
                      ?.getAttribute(
                        'lnClass'
                      )}"][srcCBName="${smvControlBlock.getAttribute(
                      'name'
                    )}"][serviceType="SMV"]`
                  )
                ).to.exist
            );
          });
        });
      });

      describe('and unsubscribing a subscribed Sampled Value message', () => {
        beforeEach(async () => {
          (<HTMLElement>getItemFromSubscriberList('MSVCB01')).click();
          await element.updateComplete;
        });

        it('initially all ExtRefs are available in the subscriber IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(16);
        });

        it('it looks like the latest snapshot', async () => {
          (<HTMLElement>getItemFromSubscriberList('MSVCB01')).click();
          await element.updateComplete;

          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });

        it('removes the required ExtRefs to the subscriber IED', async () => {
          (<HTMLElement>getItemFromSubscriberList('MSVCB01')).click();
          await element.updateComplete;

          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]'
            ).length
          ).to.eql(0);
        });
      });

      describe('and subscribing a partially subscribed Sampled Value message', () => {
        it('initially some ExtRefs are available in the subscriber IED', async () => {
          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED4"], ' +
                'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED4"]'
            ).length
          ).to.eql(2);
        });

        it('it looks like the latest snapshot', async () => {
          (<HTMLElement>getItemFromSubscriberList('MSVCB02')).click();
          await element.updateComplete;

          await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
        });

        it('adds the required ExtRefs to the subscriber IED', async () => {
          (<HTMLElement>getItemFromSubscriberList('MSVCB02')).click();
          await element.updateComplete;

          expect(
            element.doc.querySelectorAll(
              'IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED4"], ' +
                'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED4"]'
            ).length
          ).to.eql(16);
        });
      });
    });
  });

  function getSubscriberList() {
    return element.shadowRoot?.querySelector('subscriber-list-smv');
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
