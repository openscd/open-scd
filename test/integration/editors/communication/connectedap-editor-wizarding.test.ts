import { fixture, html, expect } from '@open-wc/testing';
import fc, { integer, ipV4, nat } from 'fast-check';

import { regexString, regExp, ipV6, ipV6SubNet } from '../../../foundation.js';

import '../../../mock-wizard.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';
import '../../../../src/editors/communication/connectedap-editor.js';

describe('conductingap-editor wizarding integration', () => {
  describe('for schema 2003 (Edition1) projects', () => {
    const doc = getDocument(true, '2003');
    let parent: WizardingElement;

    beforeEach(async () => {
      parent = <WizardingElement>(
        await fixture(
          html`<mock-wizard
            ><connectedap-editor
              .element=${doc.querySelector(
                'SubNetwork[name="StationBus"] > ConnectedAP'
              )}
            ></connectedap-editor
          ></mock-wizard>`
        )
      );

      (<HTMLElement>(
        parent
          ?.querySelector('connectedap-editor')
          ?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;
    });
    it('include 13 wizard inputs in schema 2007B4', async () => {
      expect(parent.wizardUI.inputs.length).to.equal(13);
    });
    describe('the 1st input element', () => {
      it('edits the attribute IP', async () => {
        expect(parent.wizardUI.inputs[0].label).to.equal('IP');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(ipV4(), async name => {
            parent.wizardUI.inputs[0].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[0].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 2nd input element', () => {
      it('edits the attribute IP-SUBNET', async () => {
        expect(parent.wizardUI.inputs[1].label).to.equal('IP-SUBNET');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(ipV4(), async name => {
            parent.wizardUI.inputs[1].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[1].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 3rd input element', () => {
      it('edits the attribute IP-GATEWAY', async () => {
        expect(parent.wizardUI.inputs[2].label).to.equal('IP-GATEWAY');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(ipV4(), async name => {
            parent.wizardUI.inputs[2].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[2].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 4th input element', () => {
      it('edits the attribute OSI-TSEL', async () => {
        expect(parent.wizardUI.inputs[3].label).to.equal('OSI-TSEL');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSI, 1, 8), async name => {
            parent.wizardUI.inputs[3].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[3].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 5th input element', () => {
      it('edits the attribute OSI-SSEL', async () => {
        expect(parent.wizardUI.inputs[4].label).to.equal('OSI-SSEL');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSI, 1, 16), async name => {
            parent.wizardUI.inputs[4].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[4].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 6th input element', () => {
      it('edits the attribute OSI-PSEL', async () => {
        expect(parent.wizardUI.inputs[5].label).to.equal('OSI-PSEL');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSI, 1, 8), async name => {
            parent.wizardUI.inputs[5].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[5].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 7th input element', () => {
      it('edits the attribute OSI-AP-Title', async () => {
        expect(parent.wizardUI.inputs[6].label).to.equal('OSI-AP-Title');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSIAPi, 1), async name => {
            parent.wizardUI.inputs[6].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[6].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 8th input element', () => {
      it('edits the attribute OSI-AP-Invoke', async () => {
        expect(parent.wizardUI.inputs[7].label).to.equal('OSI-AP-Invoke');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSIid, 1, 5), async name => {
            parent.wizardUI.inputs[7].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[7].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 9th input element', () => {
      it('edits the attribute OSI-AE-Qualifier', async () => {
        expect(parent.wizardUI.inputs[8].label).to.equal('OSI-AE-Qualifier');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSIid, 1, 5), async name => {
            parent.wizardUI.inputs[8].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[8].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 10th input element', () => {
      it('edits the attribute OSI-AE-Invoke', async () => {
        expect(parent.wizardUI.inputs[9].label).to.equal('OSI-AE-Invoke');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSIid, 1, 5), async name => {
            parent.wizardUI.inputs[9].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[9].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 11th input element', () => {
      it('edits the attribute OSI-NSAP', async () => {
        expect(parent.wizardUI.inputs[10].label).to.equal('OSI-NSAP');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSI, 1, 40), async name => {
            parent.wizardUI.inputs[10].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[10].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 12th input element', () => {
      it('edits the attribute VLAN-ID', async () => {
        expect(parent.wizardUI.inputs[11].label).to.equal('VLAN-ID');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSI, 3, 3), async name => {
            parent.wizardUI.inputs[11].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[11].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 13th input element', () => {
      it('edits the attribute VLAN-PRIORITY', async () => {
        expect(parent.wizardUI.inputs[12].label).to.equal('VLAN-PRIORITY');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            nat({ max: 7 }).map(nap => `${nap}`),
            async name => {
              parent.wizardUI.inputs[12].value = name;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[12].checkValidity()).to.be.true;
            }
          )
        );
      });
    });
  });
  describe('for schema 2007B (Edition2) projects', () => {
    const doc = getDocument(true, '2007B');
    let parent: WizardingElement;

    beforeEach(async () => {
      parent = <WizardingElement>(
        await fixture(
          html`<mock-wizard
            ><connectedap-editor
              .element=${doc.querySelector(
                'SubNetwork[name="StationBus"] > ConnectedAP'
              )}
            ></connectedap-editor
          ></mock-wizard>`
        )
      );

      (<HTMLElement>(
        parent
          ?.querySelector('connectedap-editor')
          ?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;
    });
    it('include 6 more wizard inputs', async () => {
      expect(parent.wizardUI.inputs.length).to.equal(19);
    });
    describe('the 14th input element', () => {
      it('edits the attribute SNTP-Port', async () => {
        expect(parent.wizardUI.inputs[13].label).to.equal('SNTP-Port');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            nat({ max: 65535 }).map(num => `${num}`),
            async name => {
              parent.wizardUI.inputs[13].value = name;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[13].checkValidity()).to.be.true;
            }
          )
        );
      });
    });
    describe('the 15th input element', () => {
      it('edits the attribute MMS-Port', async () => {
        expect(parent.wizardUI.inputs[14].label).to.equal('MMS-Port');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            nat({ max: 65535 }).map(num => `${num}`),
            async name => {
              parent.wizardUI.inputs[14].value = name;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[14].checkValidity()).to.be.true;
            }
          )
        );
      });
    });
    describe('the 16th input element', () => {
      it('edits the attribute DNSName', async () => {
        expect(parent.wizardUI.inputs[15].label).to.equal('DNSName');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(/^\S*$/), async name => {
            parent.wizardUI.inputs[15].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[15].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 17th input element', () => {
      it('edits the attribute UDP-Port', async () => {
        expect(parent.wizardUI.inputs[16].label).to.equal('UDP-Port');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            nat({ max: 65535 }).map(num => `${num}`),
            async name => {
              parent.wizardUI.inputs[16].value = name;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[16].checkValidity()).to.be.true;
            }
          )
        );
      });
    });
    describe('the 18th input element', () => {
      it('edits the attribute TCP-Port', async () => {
        expect(parent.wizardUI.inputs[17].label).to.equal('TCP-Port');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            nat({ max: 65535 }).map(num => `${num}`),
            async name => {
              parent.wizardUI.inputs[17].value = name;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[17].checkValidity()).to.be.true;
            }
          )
        );
      });
    });
    describe('the 19th input element', () => {
      it('edits the attribute C37-118-IP-Port', async () => {
        expect(parent.wizardUI.inputs[18].label).to.equal('C37-118-IP-Port');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            integer({ min: 1025, max: 65535 }).map(num => `${num}`),
            async name => {
              parent.wizardUI.inputs[18].value = name;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[18].checkValidity()).to.be.true;
            }
          )
        );
      });
    });
  });
  describe('for schema 2007B4 (Edition2.1) projects', () => {
    const doc = getDocument();
    let parent: WizardingElement;

    beforeEach(async () => {
      parent = <WizardingElement>(
        await fixture(
          html`<mock-wizard
            ><connectedap-editor
              .element=${doc.querySelector(
                'SubNetwork[name="StationBus"] > ConnectedAP'
              )}
            ></connectedap-editor
          ></mock-wizard>`
        )
      );

      (<HTMLElement>(
        parent
          ?.querySelector('connectedap-editor')
          ?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;
    });
    it('include 8 more wizard inputs', async () => {
      expect(parent.wizardUI.inputs.length).to.equal(27);
    });
    describe('the 20th input element', () => {
      it('edits the attribute IPv6', async () => {
        expect(parent.wizardUI.inputs[19].label).to.equal('IPv6');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(ipV6(), async name => {
            parent.wizardUI.inputs[19].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[19].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 21th input element', () => {
      it('edits the attribute IPv6-SUBNET', async () => {
        expect(parent.wizardUI.inputs[20].label).to.equal('IPv6-SUBNET');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(ipV6SubNet(), async name => {
            parent.wizardUI.inputs[20].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[20].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 22nd input element', () => {
      it('edits the attribute IPv6-GATEWAY', async () => {
        expect(parent.wizardUI.inputs[21].label).to.equal('IPv6-GATEWAY');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(ipV6(), async name => {
            parent.wizardUI.inputs[21].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[21].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 23rd input element', () => {
      it('edits the attribute IPv6FlowLabel', async () => {
        expect(parent.wizardUI.inputs[22].label).to.equal('IPv6FlowLabel');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            fc.hexaString({ minLength: 1, maxLength: 5 }),
            async name => {
              parent.wizardUI.inputs[22].value = name;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[22].checkValidity()).to.be.true;
            }
          )
        );
      });
    });
    describe('the 24th input element', () => {
      it('edits the attribute IPv6ClassOfTraffic', async () => {
        expect(parent.wizardUI.inputs[23].label).to.equal('IPv6ClassOfTraffic');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            nat({ max: 255 }).map(num => `${num}`),
            async name => {
              parent.wizardUI.inputs[23].value = name;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[23].checkValidity()).to.be.true;
            }
          )
        );
      });
    });
    describe('the 25th input element', () => {
      it('edits the attribute IPv6-IGMPv3Src', async () => {
        expect(parent.wizardUI.inputs[24].label).to.equal('IPv6-IGMPv3Src');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(ipV6(), async name => {
            parent.wizardUI.inputs[24].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[24].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 26th input element', () => {
      it('edits the attribute IP-IGMPv3Sr', async () => {
        expect(parent.wizardUI.inputs[25].label).to.equal('IP-IGMPv3Sr');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(ipV4(), async name => {
            parent.wizardUI.inputs[25].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[25].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the 27th input element', () => {
      it('edits the attribute IP-ClassOfTraffic', async () => {
        expect(parent.wizardUI.inputs[26].label).to.equal('IP-ClassOfTraffic');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.OSI, 1, 2), async name => {
            parent.wizardUI.inputs[26].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[26].checkValidity()).to.be.true;
          })
        );
      });
    });
  });
  describe('for all versions', () => {
    const doc = getDocument();
    let parent: WizardingElement;

    beforeEach(async () => {
      parent = <WizardingElement>(
        await fixture(
          html`<mock-wizard
            ><connectedap-editor
              .element=${doc.querySelector(
                'SubNetwork[name="StationBus"] > ConnectedAP'
              )}
            ></connectedap-editor
          ></mock-wizard>`
        )
      );

      (<HTMLElement>(
        parent
          ?.querySelector('connectedap-editor')
          ?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;
    });
    it('has one wizard-dialog', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(1);
    });
    describe('include two buttons', () => {
      it('and only two buttons', () => {
        expect(
          parent.wizardUI.dialog?.querySelectorAll('mwc-button').length
        ).to.equal(2);
      });
      it('a cancel button as secondary action', () => {
        expect(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="secondaryAction"]'
          )
        ).to.exist;
      });
      it('a edit button as primary action', () => {
        expect(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        ).to.exist;
      });
    });
  });
});
