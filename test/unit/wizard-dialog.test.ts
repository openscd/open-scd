import { html, fixture, expect } from '@open-wc/testing';

import './mock-editor.js';

import { Button } from '@material/mwc-button';

import '../../src/wizard-textfield.js';
import '../../src/wizard-dialog.js';
import { WizardDialog } from '../../src/wizard-dialog.js';
import { EditorAction, WizardInputElement } from '../../src/foundation.js';
import { WizardCheckbox } from '../../src/wizard-checkbox.js';
import { WizardSelect } from '../../src/wizard-select.js';
import { WizardTextField } from '../../src/wizard-textfield.js';

describe('wizard-dialog', () => {
  let element: WizardDialog;
  beforeEach(async () => {
    element = await fixture(html`<wizard-dialog></wizard-dialog>`);
  });

  describe('with user defined menu actions set', () => {
    beforeEach(async () => {
      element.wizard = [
        {
          title: 'Page 1',
          menuActions: [
            {
              icon: 'delete',
              label: 'remove',
              action: () => [],
            },
            {
              icon: 'delete',
              label: 'remove',
              action: () => [],
            },
          ],
        },
      ];
      await element.updateComplete;
    });

    it('looks like its snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with an empty wizard property', () => {
    it('shows no dialog', () =>
      expect(element).property('dialog').to.not.exist);

    it('is considered valid', () => expect(element.checkValidity()).to.be.true);

    it('has no invalid pages', () =>
      expect(element).to.have.property('firstInvalidPage', -1));
  });

  describe('with a nonempty wizard property', () => {
    beforeEach(async () => {
      element.wizard = [
        {
          title: 'Page 1',
          content: [
            html`<wizard-textfield
              label="Test textfield 1"
            ></wizard-textfield>`,
          ],
          secondary: { icon: 'add', action: () => [], label: 'Test secondary' },
        },
        {
          title: 'Page 2',
          content: [
            html`<wizard-textfield
              type="email"
              label="Test textfield 2"
            ></wizard-textfield>`,
          ],
        },
        {
          title: 'Page 3',
          content: [],
          primary: { icon: 'anchor', action: () => [], label: 'Test primary' },
        },
      ];
      await element.updateComplete;
    });

    it('shows the first dialog', () => {
      expect(element).property('dialog').to.have.property('open', true);
      expect(element.dialog).to.have.property('heading', 'Page 1');
    });

    it('advances to the second page on next button click', async () => {
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[dialogaction="next"]')
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 2');
    });

    it('returns to the first page on prev button click', async () => {
      element.next();
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 2');
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[dialogaction="prev"]')
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 1');
    });

    describe('with invalid inputs', () => {
      beforeEach(async () => {
        element.dialogs[1].querySelector<WizardInputElement>(
          'wizard-textfield'
        )!.value = 'Peter';
        await element.updateComplete;
      });

      it('is considered invalid', () =>
        expect(element.checkValidity()).to.be.false);

      it('detects the first invalid page', () =>
        expect(element).to.have.property('firstInvalidPage', 1));

      it('does not allow to advance past the invalid page', async () => {
        element.next();
        element.next();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 2');
      });

      it('jumps to first invalid page on action', async () => {
        element.act(() => []);
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 2');
      });

      it('does nothing on undefined action', async () => {
        element.act();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 1');
      });
    });

    describe('with valid inputs', () => {
      it('is considered valid', () =>
        expect(element.checkValidity()).to.be.true);

      it('has no invalid pages', () =>
        expect(element).to.have.property('firstInvalidPage', -1));

      it('advances to the next dialog on next()', async () => {
        element.next();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 2');
        expect(element).property('dialog').to.have.property('open', true);
        element.next();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 3');
        expect(element).property('dialog').to.have.property('open', true);
      });

      it('returns to the previos dialog on prev()', async () => {
        element.next();
        element.prev();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 1');
        expect(element).property('dialog').to.have.property('open', true);
      });

      it('does not jump on action', async () => {
        element.act(() => []);
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 1');
      });
    });

    it('removes primary action to prevent multiple trigger during wizard close', async () => {
      element.wizard = [
        {
          title: 'Page 1',
          content: [],
          primary: {
            icon: 'anchor',
            action: (): EditorAction[] => {
              return [
                {
                  new: {
                    parent: element,
                    element: element,
                    reference: null,
                  },
                },
              ];
            },
            label: 'Test primary',
          },
        },
      ];
      await element.updateComplete;
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[slot="primaryAction"]')
      )).click();
      expect(element.wizard[0].primary).to.not.exist;
    });

    it('does not remove primary action as long as no editor action is dispatched', async () => {
      element.wizard = [
        {
          title: 'Page 1',
          content: [],
          primary: {
            icon: 'anchor',
            action: () => [],
            label: 'Test primary',
          },
        },
      ];
      await element.updateComplete;
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[slot="primaryAction"]')
      )).click();
      expect(element.wizard[0].primary).to.exist;
    });

    describe('in pro mode', () => {
      let host: Element;

      beforeEach(async () => {
        element = await fixture(
          html`<mock-editor><wizard-dialog></wizard-dialog></mock-editor>`
        ).then(elm => elm.querySelector<WizardDialog>('wizard-dialog')!);
        localStorage.setItem('mode', 'pro');
        element.requestUpdate();
        await element.updateComplete;
        host = new DOMParser().parseFromString(
          '<host><test></test><host>',
          'application/xml'
        ).documentElement;
        element.wizard = [
          {
            title: 'Page 1',
            element: host.firstElementChild!,
            content: [],
            primary: {
              icon: 'anchor',
              action: () => [],
              label: 'Test primary',
            },
          },
        ];
      });

      it('looks like its snapshot', async () =>
        await expect(element).to.equalSnapshot());

      it('switches to code editor view on code toggle button click', async () => {
        element.dialog!.querySelector('mwc-icon-button-toggle')!.on = true;
        element.requestUpdate();
        await element.updateComplete;
        await element.dialog?.updateComplete;
        expect(element).to.equalSnapshot();
      });

      describe('in code editor mode', () => {
        beforeEach(async () => {
          element.dialog!.querySelector('mwc-icon-button-toggle')!.on = true;
          element.requestUpdate();
          await element.updateComplete;
          await element.dialog?.updateComplete;
        });

        it('commits the code action on primary button click', async () => {
          element.dialog
            ?.querySelector('ace-editor')
            ?.setAttribute('value', '<success></success>');
          await element.updateComplete;
          element.dialog
            ?.querySelector<Button>('mwc-button[slot="primaryAction"]')!
            .click();
          await element.updateComplete;
          expect(host.firstElementChild).to.have.property('tagName', 'success');
        });
      });

      after(() => localStorage.removeItem('mode'));
    });
  });

  describe('with content definition throught WizardInputs', () => {
    describe('for a specific WizardInput of the kind Checkbox', () => {
      let checkbox: WizardCheckbox;
      beforeEach(async () => {
        element.wizard = [
          {
            title: 'Page 1',
            content: [
              {
                kind: 'Checkbox',
                label: 'myLabel',
                maybeValue: 'true',
                nullable: true,
                default: true,
              },
            ],
          },
        ];
        await element.updateComplete;

        checkbox =
          element.shadowRoot!.querySelector<WizardCheckbox>('wizard-checkbox')!;
        await checkbox.requestUpdate();
      });

      it('the dom looks like the latest snapshot', async () =>
        await expect(checkbox).dom.to.equalSnapshot());

      it('makes sure that wizard-checkbox has correct default value', () =>
        expect(checkbox.defaultChecked).to.be.true);

      it('makes sure that wizard-checkbox has correct nullable value', () =>
        expect(checkbox.nullable).to.be.true);

      it('makes sure that wizard-checkbox has correct label', () =>
        expect(checkbox.label).to.be.equal('myLabel'));

      it('makes sure that wizard-checkbox has correct maybeValue', () =>
        expect(checkbox.maybeValue).to.be.equal('true'));
    });

    describe('for another WizardInputs of the kind Checkbox', () => {
      let checkbox: WizardCheckbox;
      beforeEach(async () => {
        element.wizard = [
          {
            title: 'Page 1',
            content: [
              {
                kind: 'Checkbox',
                label: 'myLabel',
                maybeValue: null,
                nullable: true,
                default: false,
              },
            ],
          },
        ];
        await element.updateComplete;

        checkbox =
          element.shadowRoot!.querySelector<WizardCheckbox>('wizard-checkbox')!;
        await checkbox.requestUpdate();
      });

      it('the dom looks like the latest snapshot', async () =>
        await expect(checkbox).dom.to.equalSnapshot());

      it('makes sure that wizard-checkbox has correct default value', () =>
        expect(checkbox.defaultChecked).to.be.false);

      it('makes sure that wizard-checkbox has correct nullable value', () =>
        expect(checkbox.nullable).to.be.true);

      it('makes sure that wizard-checkbox has correct label', () =>
        expect(checkbox.label).to.be.equal('myLabel'));

      it('makes sure that wizard-checkbox has correct maybeValue', async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        expect(checkbox.maybeValue).to.be.null;
      });
    });

    describe('for a specific WizardInput of the kind Select', () => {
      let select: WizardSelect;
      beforeEach(async () => {
        element.wizard = [
          {
            title: 'Page 1',
            content: [
              {
                kind: 'Select',
                label: 'myLabel',
                values: ['multi1', 'multi2'],
                maybeValue: 'multi1',
              },
            ],
          },
        ];
        await element.updateComplete;

        select =
          element.shadowRoot!.querySelector<WizardSelect>('wizard-select')!;
        await select.requestUpdate();
      });

      it('the dom looks like the latest snapshot', async () =>
        await expect(select).dom.to.equalSnapshot());

      it('makes sure that wizard-select has correct default value', () =>
        expect(select.defaultValue).to.be.equal(''));

      it('makes sure that wizard-select has correct nullable value', () =>
        expect(select.nullable).to.be.false);

      it('makes sure to not render nullSwitch with missing/false nullable', () =>
        expect(select.nullSwitch).to.not.exist);

      it('makes sure that wizard-select has correct label', () =>
        expect(select.label).to.be.equal('myLabel'));

      it('makes sure that wizard-select has correct maybeValue', async () =>
        expect(select.maybeValue).to.equal('multi1'));
    });

    describe('for another WizardInput of the kind Select', () => {
      let select: WizardSelect;
      beforeEach(async () => {
        element.wizard = [
          {
            title: 'Page 1',
            content: [
              {
                kind: 'Select',
                label: 'myLabel',
                values: ['multi1', 'multi2'],
                maybeValue: null,
                nullable: true,
                default: 'multi2',
              },
            ],
          },
        ];
        await element.updateComplete;

        select =
          element.shadowRoot!.querySelector<WizardSelect>('wizard-select')!;
        await select.requestUpdate();
      });

      it('makes sure that wizard-select has correct default value', () =>
        expect(select.defaultValue).to.be.equal('multi2'));

      it('makes sure that wizard-checkbox has correct nullable value', () =>
        expect(select.nullable).to.be.true);

      it('makes sure that wizard-checkbox has correct label', () =>
        expect(select.label).to.be.equal('myLabel'));

      it('makes sure that wizard-checkbox has correct maybeValue', async () =>
        expect(select.maybeValue).to.be.null);
    });

    describe('for a specific WizardInput of the kind TextField', () => {
      let textField: WizardTextField;
      beforeEach(async () => {
        element.wizard = [
          {
            title: 'Page 1',
            content: [
              {
                kind: 'TextField',
                label: 'myLabel',
                maybeValue: null,
                nullable: true,
              },
            ],
          },
        ];
        await element.updateComplete;

        textField =
          element.shadowRoot!.querySelector<WizardTextField>(
            'wizard-textfield'
          )!;
        await textField.requestUpdate();
      });

      it('the dom looks like the latest snapshot', async () =>
        await expect(textField).dom.to.equalSnapshot());

      it('makes sure that wizard-textfield has correct default value', () =>
        expect(textField.defaultValue).to.be.equal(''));

      it('makes sure that wizard-textfield has correct nullable value', () =>
        expect(textField.nullSwitch).to.exist);

      it('makes sure that wizard-textfield has correct label', () =>
        expect(textField.label).to.be.equal('myLabel'));

      it('makes sure that wizard-textfield has correct maybeValue', async () =>
        expect(textField.maybeValue).to.be.null);

      it('does not render multiplier selction with defined multipliers', async () =>
        expect(textField.multiplierMenu).to.not.exist);

      it('does not render multiplier selction with defined multipliers', async () =>
        expect(textField.multiplierButton).to.not.exist);
    });

    describe('for a specific TextField WizardInput with multipliers', () => {
      let textField: WizardTextField;
      beforeEach(async () => {
        element.wizard = [
          {
            title: 'Page 1',
            content: [
              {
                kind: 'TextField',
                label: 'myLabel',
                maybeValue: 'value',
                unit: 'V',
                multipliers: ['', null, 'k', 'M'],
                multiplier: 'k',
              },
            ],
          },
        ];
        await element.updateComplete;

        textField =
          element.shadowRoot!.querySelector<WizardTextField>(
            'wizard-textfield'
          )!;
        await textField.requestUpdate();
      });

      it('makes sure that wizard-textfield has correct nullable value', () =>
        expect(textField.nullSwitch).to.not.exist);

      it('makes sure that wizard-textfield has correct label', () =>
        expect(textField.label).to.be.equal('myLabel'));

      it('makes sure that wizard-textfield has correct maybeValue', async () =>
        expect(textField.maybeValue).to.equal('value'));

      it('renders multiplier selction with defined multipliers', async () =>
        expect(textField.multiplierMenu).to.exist);

      it('renders multiplier selction with defined multipliers', async () =>
        expect(textField.multiplierButton).to.exist);

      it('shows multiplier and unit as suffix', async () =>
        expect(textField.suffix).to.equal('kV'));
    });

    describe('for a specific TextField WizardInput with type number', () => {
      let textField: WizardTextField;
      const min = 89;
      const max = 101;

      beforeEach(async () => {
        element.wizard = [
          {
            title: 'Page 1',
            content: [
              {
                kind: 'TextField',
                label: 'myLabel',
                maybeValue: '100',
                suffix: '#',
                required: true,
                type: 'number',
                min,
                max,
              },
            ],
          },
        ];
        await element.updateComplete;

        textField =
          element.shadowRoot!.querySelector<WizardTextField>(
            'wizard-textfield'
          )!;
        await textField.requestUpdate();
      });

      it('does not allow chars other than numbers', async () => {
        textField.value = 'someString';
        await textField.requestUpdate();
        expect(textField.checkValidity()).to.be.false;
      });

      it('properly set the min attribute', async () => {
        textField.value = `${min - 1}`;
        await textField.requestUpdate();
        expect(textField.checkValidity()).to.be.false;

        textField.value = `${min}`;
        await textField.requestUpdate();
        expect(textField.checkValidity()).to.be.true;
      });

      it('properly set the max attribute', async () => {
        textField.value = `${max + 1}`;
        await textField.requestUpdate();
        expect(textField.checkValidity()).to.be.false;

        textField.value = `${max}`;
        await textField.requestUpdate();
        expect(textField.checkValidity()).to.be.true;
      });

      it('shows multiplier and unit as suffix', async () =>
        expect(textField.suffix).to.equal('#'));
    });

    describe('for a specific TextField WizardInput with pattern definition', () => {
      let textField: WizardTextField;
      const pattern = '[a-zA-Z][a-zA-Z0-9]*';

      beforeEach(async () => {
        element.wizard = [
          {
            title: 'Page 1',
            content: [
              {
                kind: 'TextField',
                label: 'myLabel',
                maybeValue: 'oldIED',
                pattern,
                minLength: 3,
                maxLength: 7,
              },
            ],
          },
        ];
        await element.updateComplete;

        textField =
          element.shadowRoot!.querySelector<WizardTextField>(
            'wizard-textfield'
          )!;
        await textField.requestUpdate();
      });

      it('does not allow values outside the pattern definition', async () => {
        textField.value = '0IED';
        await textField.requestUpdate();
        expect(textField.checkValidity()).to.be.false;
      });

      it('does not allow values outside the pattern definition', async () => {
        textField.value = 'valIED';
        await textField.requestUpdate();
        expect(textField.checkValidity()).to.be.true;
      });

      it('properly set the minLength attribute', async () =>
        expect(textField.minLength).to.be.equal(3));

      it('properly set the maxLength attribute', async () =>
        expect(textField.maxLength).to.equal(7));
    });
  });
});
