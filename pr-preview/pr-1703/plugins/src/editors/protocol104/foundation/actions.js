export function createActions(lnElement, lnClonedElement, doElement, wizard, ti, inverted, tiInformation) {
  return tiInformation.create(lnElement, lnClonedElement, doElement, wizard, ti, tiInformation.daPaths, tiInformation.inverted ? inverted : false);
}
export function createCheckActions(lnElement, lnClonedElement, doElement, wizard, ti, tiInformation) {
  if (tiInformation.checkDaPaths && tiInformation.checkCreate) {
    return tiInformation.checkCreate(lnElement, lnClonedElement, doElement, wizard, ti, tiInformation.checkDaPaths);
  }
  return [];
}
