/**
 * Containing all available search strings for sections within an IED section.
 */
export enum IEDSelector {
    IED = ':root > IED',
    AccessPoint = ':root > IED > AccessPoint',
    Server = ':root > IED > AccessPoint > Server',
    LDevice = ':root > IED > AccessPoint > Server > LDevice',
    AnyLN = ':root > IED > AccessPoint > Server > LDevice > LN,LN0'
}