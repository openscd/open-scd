import { expect } from '@open-wc/testing';
import { instantiateSubscriptionSupervision, removeSubscriptionSupervision, } from '../../../../src/editors/subscription/foundation.js';
describe('supervision', () => {
    let doc;
    let controlElement;
    let subscriberIED;
    describe('when subscribing to a SampledValueControl', () => {
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/editors/LaterBindingSMV-LSVS.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        });
        describe('produces the correct structure where supervision is allowed', () => {
            beforeEach(() => {
                controlElement = doc.querySelector('IED[name="SMV_Publisher4"] SampledValueControl[name="voltageOnly"]');
            });
            it('does not allow supervision because there is no services defined in the IED', () => {
                subscriberIED = doc.querySelector('IED[name="SMV_Subscriber3"]');
                const noSupervisionAllowedActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(noSupervisionAllowedActions).to.have.length(0);
            });
            it('does not allow supervision because the DataTypeTemplate>DOType>DA is missing necessary attributes', () => {
                subscriberIED = doc.querySelector('IED[name="SMV_Subscriber4"]');
                const noSupervisionAllowedActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(noSupervisionAllowedActions).to.have.length(0);
            });
            it('does allow supervision because the first supervision node DOI/DAI[valImport=true/valKind=RO] allows it', () => {
                subscriberIED = doc.querySelector('IED[name="SMV_Subscriber5"]');
                const supervisionAllowedActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(supervisionAllowedActions).to.have.length(3);
            });
            it('does allow supervision because the first supervision node DOI/DAI[valImport=true/valKind=Conf] allows it', () => {
                subscriberIED = doc.querySelector('IED[name="SMV_Subscriber6"]');
                const supervisionAllowedActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(supervisionAllowedActions).to.have.length(3);
            });
            it('does allow supervision node use when first existing supervision node has empty Val element', () => {
                subscriberIED = doc.querySelector('IED[name="SMV_Subscriber7"]');
                const createActionswithEmptyVal = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(createActionswithEmptyVal).to.have.length(1);
                const newValAction = createActionswithEmptyVal[0];
                const valParent = newValAction.new.parent;
                const newValElement = newValAction.new.element;
                expect(valParent).to.exist;
                expect(newValElement).to.exist;
                expect(valParent.nodeName).to.be.equal('DAI');
                expect(newValElement.nodeName).to.be.equal('Val');
                expect(newValElement.textContent).to.not.be.empty;
            });
            it('allows supervision and an existing LN[class=LSVS] should be used', () => {
                subscriberIED = doc.querySelector('IED[name="SMV_Subscriber2"]');
                const createActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(createActions).to.have.length(3);
                const newDoiAction = createActions[0];
                const lnParent = newDoiAction.new.parent;
                const newDoiElement = newDoiAction.new.element;
                expect(lnParent).to.exist;
                expect(newDoiElement).to.exist;
                expect(lnParent.nodeName).to.be.equal('LN');
                expect(newDoiElement.nodeName).to.be.equal('DOI');
                const newDaiAction = createActions[1];
                const daiParent = newDaiAction.new.parent;
                const newDaiElement = newDaiAction.new.element;
                expect(daiParent).to.exist;
                expect(newDaiElement).to.exist;
                expect(daiParent.nodeName).to.be.equal('DOI');
                expect(newDaiElement.nodeName).to.be.equal('DAI');
                const newValAction = createActions[2];
                const valParent = newValAction.new.parent;
                const newValElement = newValAction.new.element;
                expect(valParent).to.exist;
                expect(newValElement).to.exist;
                expect(valParent.nodeName).to.be.equal('DAI');
                expect(newValElement.nodeName).to.be.equal('Val');
                expect(newValElement.textContent).to.not.be.empty;
            });
            it('allows supervision and an a new LN[class=LSVS] should be created as well', () => {
                controlElement = doc.querySelector('IED[name="SMV_Publisher3"] SampledValueControl[name="fullSmv"]');
                subscriberIED = doc.querySelector('IED[name="SMV_Subscriber"]');
                const actionsWithNewLn = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(actionsWithNewLn).to.have.length(4);
                const newLnAction = actionsWithNewLn[0];
                const lDeviceParent = newLnAction.new.parent;
                const newLnElement = newLnAction.new.element;
                expect(lDeviceParent).to.exist;
                expect(newLnElement).to.exist;
                expect(lDeviceParent.nodeName).to.be.equal('LDevice');
                expect(newLnElement.nodeName).to.be.equal('LN');
                const newDoiAction = actionsWithNewLn[1];
                const lnParent = newDoiAction.new.parent;
                const newDoiElement = newDoiAction.new.element;
                expect(lnParent).to.exist;
                expect(newDoiElement).to.exist;
                expect(lnParent.nodeName).to.be.equal('LN');
                expect(newDoiElement.nodeName).to.be.equal('DOI');
                const newDaiAction = actionsWithNewLn[2];
                const daiParent = newDaiAction.new.parent;
                const newDaiElement = newDaiAction.new.element;
                expect(daiParent).to.exist;
                expect(newDaiElement).to.exist;
                expect(daiParent.nodeName).to.be.equal('DOI');
                expect(newDaiElement.nodeName).to.be.equal('DAI');
                const newValAction = actionsWithNewLn[3];
                const valParent = newValAction.new.parent;
                const newValElement = newValAction.new.element;
                expect(valParent).to.exist;
                expect(newValElement).to.exist;
                expect(valParent.nodeName).to.be.equal('DAI');
                expect(newValElement.nodeName).to.be.equal('Val');
                expect(newValElement.textContent).to.not.be.empty;
            });
        });
        describe('removes the correct elements when supervision is removed', () => {
            beforeEach(() => {
                subscriberIED = doc.querySelector('IED[name="SMV_Subscriber"]');
            });
            it('allows removing supervision in a vendor-created LN', () => {
                controlElement = doc.querySelector('IED[name="SMV_Publisher2"] SampledValueControl[name="fullSmv"]');
                const removeActions = removeSubscriptionSupervision(controlElement, subscriberIED);
                expect(removeActions).to.have.length(1);
                const removeAction = removeActions[0];
                const parentElement = removeAction.old.parent;
                const element = removeAction.old.element;
                expect(parentElement).to.exist;
                expect(element).to.exist;
                expect(parentElement.nodeName).to.be.equal('LN');
                expect(element.nodeName).to.be.equal('DOI');
            });
            it('allows removing supervision in an OpenSCD-created LN', () => {
                controlElement = doc.querySelector('IED[name="SMV_Publisher2"] SampledValueControl[name="voltageOnly"]');
                const removeActionsWithRemovedLn = removeSubscriptionSupervision(controlElement, subscriberIED);
                expect(removeActionsWithRemovedLn).to.have.length(1);
                const removeLnAction = removeActionsWithRemovedLn[0];
                const lnParent = removeLnAction.old.parent;
                const lnElement = removeLnAction.old.element;
                expect(lnParent).to.exist;
                expect(lnElement).to.exist;
                expect(lnParent.nodeName).to.be.equal('LDevice');
                expect(lnElement.nodeName).to.be.equal('LN');
            });
        });
    });
    describe('when subscribing to a GSEControl', () => {
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        });
        describe('produces the correct structure where supervision is allowed', () => {
            beforeEach(() => {
                controlElement = doc.querySelector('IED[name="GOOSE_Publisher2"] GSEControl[name="GOOSE1"]');
            });
            it('does not allow supervision because there is no services defined in the IED', () => {
                subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber"]');
                const noSupervisionAllowedActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(noSupervisionAllowedActions).to.have.length(0);
            });
            it('does not allow supervision because the DataTypeTemplate>DOType>DA is missing necessary attributes ', () => {
                subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber4"]');
                const noSupervisionAllowedActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(noSupervisionAllowedActions).to.have.length(0);
            });
            it('does allow supervision because the first supervision node DOI/DAI[valImport=true/valKind=RO] allows it', () => {
                subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber5"]');
                const supervisionAllowedActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(supervisionAllowedActions).to.have.length(3);
            });
            it('does allow supervision because the first supervision node DOI/DAI[valImport=true/valKind=Conf] allows it', () => {
                subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber6"]');
                const supervisionAllowedActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(supervisionAllowedActions).to.have.length(3);
            });
            it('does allow supervision node use when first existing supervision node has empty Val element', () => {
                subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber7"]');
                const createActionswithEmptyVal = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(createActionswithEmptyVal).to.have.length(1);
                const newValAction = createActionswithEmptyVal[0];
                const valParent = newValAction.new.parent;
                const newValElement = newValAction.new.element;
                expect(valParent).to.exist;
                expect(newValElement).to.exist;
                expect(valParent.nodeName).to.be.equal('DAI');
                expect(newValElement.nodeName).to.be.equal('Val');
                expect(newValElement.textContent).to.not.be.empty;
            });
            it('allows supervision and an existing LN[class=LGOS] should be used', () => {
                subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber2"]');
                const createActions = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(createActions).to.have.length(3);
                const newDoiAction = createActions[0];
                const lnParent = newDoiAction.new.parent;
                const newDoiElement = newDoiAction.new.element;
                expect(lnParent).to.exist;
                expect(newDoiElement).to.exist;
                expect(lnParent.nodeName).to.be.equal('LN');
                expect(newDoiElement.nodeName).to.be.equal('DOI');
                const newDaiAction = createActions[1];
                const daiParent = newDaiAction.new.parent;
                const newDaiElement = newDaiAction.new.element;
                expect(daiParent).to.exist;
                expect(newDaiElement).to.exist;
                expect(daiParent.nodeName).to.be.equal('DOI');
                expect(newDaiElement.nodeName).to.be.equal('DAI');
                const newValAction = createActions[2];
                const valParent = newValAction.new.parent;
                const newValElement = newValAction.new.element;
                expect(valParent).to.exist;
                expect(newValElement).to.exist;
                expect(valParent.nodeName).to.be.equal('DAI');
                expect(newValElement.nodeName).to.be.equal('Val');
                expect(newValElement.textContent).to.not.be.empty;
            });
            it('allows supervision and an a new LN[class=LGOS] should be created as well', () => {
                controlElement = doc.querySelector('IED[name="GOOSE_Publisher2"] GSEControl[name="GOOSE1"]');
                subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber1"]');
                const actionsWithNewLN = instantiateSubscriptionSupervision(controlElement, subscriberIED);
                expect(actionsWithNewLN).to.have.length(4);
                const newLnAction = actionsWithNewLN[0];
                const lDeviceParent = newLnAction.new.parent;
                const newLnElement = newLnAction.new.element;
                expect(lDeviceParent).to.exist;
                expect(newLnElement).to.exist;
                expect(lDeviceParent.nodeName).to.be.equal('LDevice');
                expect(newLnElement.nodeName).to.be.equal('LN');
                const newDoiAction = actionsWithNewLN[1];
                const lnParent = newDoiAction.new.parent;
                const newDoiElement = newDoiAction.new.element;
                expect(lnParent).to.exist;
                expect(newDoiElement).to.exist;
                expect(lnParent.nodeName).to.be.equal('LN');
                expect(newDoiElement.nodeName).to.be.equal('DOI');
                const newDaiAction = actionsWithNewLN[2];
                const daiParent = newDaiAction.new.parent;
                const newDaiElement = newDaiAction.new.element;
                expect(daiParent).to.exist;
                expect(newDaiElement).to.exist;
                expect(daiParent.nodeName).to.be.equal('DOI');
                expect(newDaiElement.nodeName).to.be.equal('DAI');
                const newValAction = actionsWithNewLN[3];
                const valParent = newValAction.new.parent;
                const newValElement = newValAction.new.element;
                expect(valParent).to.exist;
                expect(newValElement).to.exist;
                expect(valParent.nodeName).to.be.equal('DAI');
                expect(newValElement.nodeName).to.be.equal('Val');
                expect(newValElement.textContent).to.not.be.empty;
            });
        });
        describe('removes the correct elements when supervision is removed', () => {
            beforeEach(() => {
                subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber1"]');
            });
            it('allows removing supervision in a vendor-created LN', () => {
                controlElement = doc.querySelector('IED[name="GOOSE_Publisher"] GSEControl[name="GOOSE2"]');
                const removeActions = removeSubscriptionSupervision(controlElement, subscriberIED);
                expect(removeActions).to.have.length(1);
                const removeAction = removeActions[0];
                const parentElement = removeAction.old.parent;
                const element = removeAction.old.element;
                expect(parentElement).to.exist;
                expect(element).to.exist;
                expect(parentElement.nodeName).to.be.equal('LN');
                expect(element.nodeName).to.be.equal('DOI');
            });
            it('allows removing supervision in an OpenSCD-created LN', () => {
                controlElement = doc.querySelector('IED[name="GOOSE_Publisher"] GSEControl[name="GOOSE1"]');
                const removeActionsWithRemovedLn = removeSubscriptionSupervision(controlElement, subscriberIED);
                expect(removeActionsWithRemovedLn).to.have.length(1);
                const removeLnAction = removeActionsWithRemovedLn[0];
                const lnParent = removeLnAction.old.parent;
                const lnElement = removeLnAction.old.element;
                expect(lnParent).to.exist;
                expect(lnElement).to.exist;
                expect(lnParent.nodeName).to.be.equal('LDevice');
                expect(lnElement.nodeName).to.be.equal('LN');
            });
            it('does not allow removing supervision because other data attributes are still using it', () => {
                controlElement = doc.querySelector('IED[name="GOOSE_Publisher2"] GSEControl[name="GOOSE1"]');
                const removeActions = removeSubscriptionSupervision(controlElement, subscriberIED);
                expect(removeActions).to.have.length(0);
            });
        });
    });
});
//# sourceMappingURL=supervision.test.js.map