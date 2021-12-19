import { expect, fixture, html } from '@open-wc/testing';
import fc, { integer, ipV4, nat } from 'fast-check';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import '../../../src/editors/communication/connectedap-editor.js';
import { ConnectedAPEditor } from '../../../src/editors/communication/connectedap-editor.js';
import { WizardInput } from '../../../src/foundation.js';

import {
  ipV6,
  ipV6SubNet,
  negativeRegex,
  regExp,
  regexString,
} from '../../foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('Edit wizard for SCL element ConnectedAP', () => {
  let doc: XMLDocument;
  let parent: MockWizard;
  let element: ConnectedAPEditor;
  let inputs: WizardInput[];
  let input: WizardInput | undefined;

  beforeEach(async () => {
    parent = <MockWizard>(
      await fixture(
        html`<mock-wizard
          ><connectedap-editor></connectedap-editor
        ></mock-wizard>`
      )
    );

    element = parent.querySelector<ConnectedAPEditor>('connectedap-editor')!;
  });

  describe('include an edit wizard that', () => {
    describe('for Edition 1 projects', () => {
      beforeEach(async () => {
        doc = await fetch('/test/testfiles/valid2003.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element.element = doc.querySelector('ConnectedAP')!;
        await element.requestUpdate();

        (<HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
        )).click();
        await parent.requestUpdate();

        inputs = Array.from(parent.wizardUI.inputs);
      });

      it('looks like the latest snapshot', async () => {
        await expect(parent.wizardUI.dialog).dom.to.equalSnapshot();
      });

      describe('allows to edit P element of type IP', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'IP');
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(ipV4(), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.IPv4), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type IP-SUBNET', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'IP-SUBNET');
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(ipV4(), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.IPv4), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type IP-GATEWAY', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'IP-GATEWAY');
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(ipV4(), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.IPv4), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type OSI-TSEL', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'OSI-TSEL');
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(regexString(regExp.OSI, 1, 8), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSI), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type OSI-SSEL', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'OSI-SSEL');
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              regexString(regExp.OSI, 1, 16),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSI), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type OSI-PSEL', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'OSI-PSEL');
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              regexString(regExp.OSI, 1, 16),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSI), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type OSI-AP-Title', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'OSI-AP-Title');
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(regexString(regExp.OSIAPi, 1), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSIAPi), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type OSI-AP-Invoke', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'OSI-AP-Invoke');
          if (input && (<WizardTextField>input).maybeValue === null)
            await (<WizardTextField>input).nullSwitch?.click();
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              regexString(regExp.OSIid, 1, 5),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSIid), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type OSI-AE-Qualifier', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'OSI-AE-Qualifier');
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              regexString(regExp.OSIid, 1, 5),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSIid), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type OSI-AE-Invoke', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'OSI-AE-Invoke');
          if (input && (<WizardTextField>input).maybeValue === null)
            await (<WizardTextField>input).nullSwitch?.click();
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              regexString(regExp.OSIid, 1, 5),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSIid), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type OSI-NSAP', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'OSI-NSAP');
          if (input && (<WizardTextField>input).maybeValue === null)
            await (<WizardTextField>input).nullSwitch?.click();
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              regexString(regExp.OSI, 1, 40),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSI), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type VLAN-ID', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'VLAN-ID');
          if (input && (<WizardTextField>input).maybeValue === null)
            await (<WizardTextField>input).nullSwitch?.click();
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(regexString(regExp.OSI, 3, 3), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSI), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type VLAN-PRIORITY', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'VLAN-PRIORITY');
          if (input && (<WizardTextField>input).maybeValue === null)
            await (<WizardTextField>input).nullSwitch?.click();
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(regexString(/^[0-7]$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(/^[0-7]$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });
    });

    describe('for Edition 2 projects', () => {
      beforeEach(async () => {
        doc = await fetch('/test/testfiles/valid2007B.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element.element = doc.querySelector('ConnectedAP')!;
        await element.requestUpdate();

        (<HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
        )).click();
        await parent.requestUpdate();

        inputs = Array.from(parent.wizardUI.inputs);
      });

      it('looks like the latest snapshot', async () => {
        await expect(parent.wizardUI.dialog).dom.to.equalSnapshot();
      });

      describe('allows to edit P element of type SNTP-Port', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'SNTP-Port');
          if (input && (<WizardTextField>input).maybeValue === null) {
            await (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              nat({ max: 65535 }).map(num => `${num}`),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(/^[0-9]*$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type MMS-Port', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'MMS-Port');
          if (input && (<WizardTextField>input).maybeValue === null) {
            await (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              nat({ max: 65535 }).map(num => `${num}`),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(/^[0-9]*$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type DNSName', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'DNSName');
          if (input && (<WizardTextField>input).maybeValue === null) {
            await (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(regexString(/^\S*$/, 1), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));
      });

      describe('allows to edit P element of type UDP-Port', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'UDP-Port');
          if (input && (<WizardTextField>input).maybeValue === null) {
            (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              nat({ max: 65535 }).map(num => `${num}`),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(/^[0-9]*$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type TCP-Port', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'TCP-Port');
          if (input && (<WizardTextField>input).maybeValue === null) {
            (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              nat({ max: 65535 }).map(num => `${num}`),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(/^[0-9]*$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type C37-118-IP-Port', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'C37-118-IP-Port');
          if (input && (<WizardTextField>input).maybeValue === null) {
            (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              integer({ min: 1025, max: 65535 }).map(num => `${num}`),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(/^[0-9]*$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });
    });

    describe('for Edition 2.1 projects', () => {
      beforeEach(async () => {
        doc = await fetch('/test/testfiles/valid2007B4.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element.element = doc.querySelector('ConnectedAP')!;
        await element.requestUpdate();

        (<HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
        )).click();
        await parent.requestUpdate();

        inputs = Array.from(parent.wizardUI.inputs);
      });

      it('looks like the latest snapshot', async () => {
        await expect(parent.wizardUI.dialog).dom.to.equalSnapshot();
      });

      describe('allows to edit P element of type IPv6', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'IPv6');
          if (input && (<WizardTextField>input).maybeValue === null) {
            await (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(ipV6(), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.IPv6), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type IPv6-SUBNET', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'IPv6-SUBNET');
          if (input && (<WizardTextField>input).maybeValue === null) {
            await (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(ipV6SubNet(), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(/^[0-9/]*$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type IPv6-GATEWAY', () => {
        beforeEach(async () => {
          input = inputs.find(input => input.label === 'IPv6-GATEWAY');
          if (input && (<WizardTextField>input).maybeValue === null) {
            await (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(ipV6(), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.IPv6), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type IPv6FlowLabel', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'IPv6FlowLabel');
          if (input && (<WizardTextField>input).maybeValue === null) {
            (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              fc.hexaString({ minLength: 1, maxLength: 5 }),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              negativeRegex(/^[0-9a-fA-F]{1,5}$/),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.false;
              }
            )
          ));
      });

      describe('allows to edit P element of type IPv6ClassOfTraffic', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'IPv6ClassOfTraffic');
          if (input && (<WizardTextField>input).maybeValue === null) {
            (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(
              nat({ max: 255 }).map(num => `${num}`),
              async testValue => {
                input!.value = testValue;
                await parent.requestUpdate();
                expect(input!.checkValidity()).to.be.true;
              }
            )
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(/^[0-9]*$/), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type IPv6-IGMPv3Src', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'IPv6-IGMPv3Src');
          if (input && (<WizardTextField>input).maybeValue === null) {
            (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(ipV6(), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.IPv6), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type IP-IGMPv3Sr', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'IP-IGMPv3Sr');
          if (input && (<WizardTextField>input).maybeValue === null) {
            (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(ipV4(), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.IPv4), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });

      describe('allows to edit P element of type IP-ClassOfTraffic', () => {
        beforeEach(() => {
          input = inputs.find(input => input.label === 'IP-ClassOfTraffic');
          if (input && (<WizardTextField>input).maybeValue === null) {
            (<WizardTextField>input).nullSwitch?.click();
          }
        });

        it('as wizard input', () => expect(input).to.exist);

        it('for valid input', async () =>
          await fc.assert(
            fc.asyncProperty(regexString(regExp.OSI, 1, 2), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            })
          ));

        it('not for invalid input', async () =>
          await fc.assert(
            fc.asyncProperty(negativeRegex(regExp.OSI), async testValue => {
              input!.value = testValue;
              await parent.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            })
          ));
      });
    });
  });
});
