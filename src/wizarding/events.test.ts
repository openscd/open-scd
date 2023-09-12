import { expect } from '@open-wc/testing';
import { WizardDetail, newWizardEvent, newSubWizardEvent } from './events.js'
import { Wizard, WizardFactory, WizardPage } from './wizard.js';
import { WizardInputElement } from './dom.js';

describe('wizarding: events', () => {
  describe('newWizardEvent', () => {

    it("event detail contains a `null` wizard if no input is given", () => {
      // Arrange

      // Act
      const event = newWizardEvent()

      // Assert
      const expectedEventDetail = { wizard: null}
      expect(event.detail).to.deep.equal(expectedEventDetail)
    })

    it("If no wizard is provided the we get a `null` wizard", () => {
      // Arrange
      const eventInitDict: CustomEventInit<Partial<WizardDetail>> = {
        detail: {}
      }

      // Act
      const event = newWizardEvent(undefined, eventInitDict)

      // Assert
      expect(event.detail.wizard).to.be.null
    })

    it("If `undefined` wizard is provided the we get an `undefined` wizard", () => {
      // Arrange
      const eventInitDict: CustomEventInit<Partial<WizardDetail>> = {
        detail: {wizard: undefined}
      }

      // Act
      const event = newWizardEvent(undefined, eventInitDict)

      // Assert
      expect(event.detail.wizard).to.be.undefined
    })

    it(
      `will include a wizard factory if it is only in the eventInitDict
      and not provided as property`,
      () => {
          // Arrange
          const wizardFactory = makeWizardFactory()
          const eventInitDict: CustomEventInit<Partial<WizardDetail>> = {
            detail: {wizard: wizardFactory}
          }

          // Act
          const event = newWizardEvent(undefined, eventInitDict)

          // Assert
          expect(event.detail.wizard).equal(wizardFactory)
      }
    )
    it(
      `will include the wizard factory from the eventInitDict
      even if we provide oen as parameter`,
      () => {
          // Arrange
          const wizardFactoryInDetail = makeWizardFactory()
          const wizardFactoryAsProp = makeWizardFactory()
          const eventInitDict: CustomEventInit<Partial<WizardDetail>> = {
            detail: {wizard: wizardFactoryInDetail}
          }

          // Act
          const event = newWizardEvent(wizardFactoryAsProp, eventInitDict)

          // Assert
          expect(event.detail.wizard).equal(wizardFactoryInDetail)
      }
    )
    it(
      `will include the wizard factory from the parameter
      if the event does not event contain the key 'wizard' `,
      () => {
          // Arrange
          const wizardFactoryAsProp = makeWizardFactory()
          const eventInitDict: CustomEventInit<Partial<WizardDetail>> = {
            detail: {}
          }

          // Act
          const event = newWizardEvent(wizardFactoryAsProp, eventInitDict)

          // Assert
          expect(event.detail.wizard).equal(wizardFactoryAsProp)
      }
    )

    it('converts a given wizard to a factory function',
      () => {
          // Arrange
          const wizard = makeWizardFactory()()

          // Act
          const event = newWizardEvent(wizard)

          // Assert
          expect(event.detail.wizard).to.be.a('function')
          const wizardFn = event.detail.wizard as WizardFactory
          expect(wizardFn()).equal(wizard)
      }
    )

    it(`will contain the subwizard flag if provided`, () => {
          // Arrange
          const wizardFactoryAsProp = makeWizardFactory()
          const eventInitDict: CustomEventInit<Partial<WizardDetail>> = {
            detail: {subwizard: true}
          }

          // Act
          const event = newWizardEvent(wizardFactoryAsProp, eventInitDict)

          // Assert
          expect(event.detail).to.have.property('subwizard', true)
    })

  })

  describe('newSubWizardEvent', () => {
    it('is sets the subwizard flag to true', () => {
      // Arrange
      const wizardFactory = makeWizardFactory()

      // Act
      const event = newSubWizardEvent(wizardFactory)

      // Assert
      expect(event.detail).to.have.property('subwizard', true)
    })
  })

})


const defaultWizard: WizardPage = {
  title: "a test wizard",
  content: [],
  primary: {
    icon: "icon-not-relevant",
    label: "primary-label-not-relevant",
    action: () => [() => []],
    auto: false,
  },
  secondary: {
    icon: "icon-not-relevant",
    label: "secondary-label-not-relevant",
    action: () => [() => []]
  },
  initial: false,
  element: undefined,
  menuActions: [],
}

function makeWizardFactory(wizOverride: Partial<WizardPage> = {}): WizardFactory {
  return function wizardFactory() {
      return [
        {
          ...defaultWizard,
          ...wizOverride,
        }
      ]
  }
}
