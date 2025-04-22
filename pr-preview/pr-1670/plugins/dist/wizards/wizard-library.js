import { createBayWizard, editBayWizard } from './bay.js';
import { createConductingEquipmentWizard, editConductingEquipmentWizard, } from './conductingequipment.js';
import { editConnectivityNodeWizard } from './connectivitynode.js';
import { createFCDAsWizard } from './fcda.js';
import { editLNodeWizard, lNodeWizard } from './lnode.js';
import { editOptFieldsWizard } from './optfields.js';
import { createSubstationWizard, substationEditWizard } from './substation.js';
import { editTerminalWizard } from './terminal.js';
import { voltageLevelCreateWizard, voltageLevelEditWizard, } from './voltagelevel.js';
import { createPowerTransformerWizard, editPowerTransformerWizard, } from './powertransformer.js';
import { editSubNetworkWizard } from './subnetwork.js';
import { editIEDWizard } from './ied.js';
import { editLDeviceWizard } from './ldevice.js';
import { editTrgOpsWizard } from './trgops.js';
import { createDaWizard } from './da.js';
import { editDAIWizard } from './dai.js';
import { editGseControlWizard } from './gsecontrol.js';
import { createFunctionWizard, editFunctionWizard } from './function.js';
import { createEqSubFunctionWizard, editEqSubFunctionWizard, } from './eqsubfunction.js';
import { createEqFunctionWizard, editEqFunctionWizard } from './eqfunction.js';
import { createSubFunctionWizard, editSubFunctionWizard, } from './subfunction.js';
import { editSampledValueControlWizard } from './sampledvaluecontrol.js';
import { createSubEquipmentWizard, editSubEquipmentWizard, } from './subequipment.js';
import { createGeneralEquipmentWizard, editGeneralEquipmentWizard, } from './generalEquipment.js';
import { createTransformerWindingWizard, editTransformerWindingWizard, } from './transformerWinding.js';
import { createTapChangerWizard, editTapChangerWizard } from './tapchanger.js';
import { createLineWizard, editLineWizard } from './line.js';
import { createProcessWizard, editProcessWizard } from './process.js';
import { editLNWizard } from './ln.js';
import { editLN0Wizard } from './ln0.js';
export function emptyWizard() {
    return;
}
export const wizards = {
    AccessControl: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    AccessPoint: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Address: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Association: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Authentication: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    BDA: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    BitRate: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Bay: {
        edit: editBayWizard,
        create: createBayWizard,
    },
    ClientLN: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ClientServices: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    CommProt: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Communication: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConductingEquipment: {
        edit: editConductingEquipmentWizard,
        create: createConductingEquipmentWizard,
    },
    ConfDataSet: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConfLdName: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConfLNs: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConfLogControl: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConfReportControl: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConfSG: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConfSigRef: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConnectedAP: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ConnectivityNode: {
        edit: editConnectivityNodeWizard,
        create: emptyWizard,
    },
    DA: {
        edit: createDaWizard,
        create: emptyWizard,
    },
    DAI: {
        edit: editDAIWizard,
        create: emptyWizard,
    },
    DAType: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DO: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DOI: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DOType: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DataObjectDirectory: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DataSet: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DataSetDirectory: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DataTypeTemplates: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DynAssociation: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    DynDataSet: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    EnumType: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    EnumVal: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    EqFunction: {
        edit: editEqFunctionWizard,
        create: createEqFunctionWizard,
    },
    EqSubFunction: {
        edit: editEqSubFunctionWizard,
        create: createEqSubFunctionWizard,
    },
    ExtRef: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    FCDA: {
        edit: emptyWizard,
        create: createFCDAsWizard,
    },
    FileHandling: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Function: {
        edit: editFunctionWizard,
        create: createFunctionWizard,
    },
    GeneralEquipment: {
        edit: editGeneralEquipmentWizard,
        create: createGeneralEquipmentWizard,
    },
    GetCBValues: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GetDataObjectDefinition: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GetDataSetValue: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GetDirectory: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GOOSE: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GOOSESecurity: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GSE: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GSEDir: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GSEControl: {
        edit: editGseControlWizard,
        create: emptyWizard,
    },
    GSESettings: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GSSE: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Header: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    History: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Hitem: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    IED: {
        edit: editIEDWizard,
        create: emptyWizard,
    },
    IEDName: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Inputs: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    IssuerName: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    KDC: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    LDevice: {
        edit: editLDeviceWizard,
        create: emptyWizard,
    },
    LN: {
        edit: editLNWizard,
        create: emptyWizard,
    },
    LN0: {
        edit: editLN0Wizard,
        create: emptyWizard,
    },
    LNode: {
        edit: editLNodeWizard,
        create: lNodeWizard,
    },
    LNodeType: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Line: {
        edit: editLineWizard,
        create: createLineWizard,
    },
    Log: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    LogControl: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    LogSettings: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    MaxTime: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    McSecurity: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    MinTime: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    NeutralPoint: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    OptFields: {
        edit: editOptFieldsWizard,
        create: emptyWizard,
    },
    P: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    PhysConn: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    PowerTransformer: {
        edit: editPowerTransformerWizard,
        create: createPowerTransformerWizard,
    },
    Private: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Process: {
        edit: editProcessWizard,
        create: createProcessWizard,
    },
    ProtNs: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Protocol: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ReadWrite: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    RedProt: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ReportControl: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ReportSettings: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    RptEnabled: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SamplesPerSec: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SampledValueControl: {
        edit: editSampledValueControlWizard,
        create: emptyWizard,
    },
    SecPerSamples: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SCL: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SDI: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SDO: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Server: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ServerAt: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Services: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SetDataSetValue: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SettingControl: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SettingGroups: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SGEdit: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SmpRate: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SMV: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SmvOpts: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SMVsc: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SMVSecurity: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SMVSettings: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SubEquipment: {
        edit: editSubEquipmentWizard,
        create: createSubEquipmentWizard,
    },
    SubFunction: {
        edit: editSubFunctionWizard,
        create: createSubFunctionWizard,
    },
    SubNetwork: {
        edit: editSubNetworkWizard,
        create: emptyWizard,
    },
    Subject: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Substation: {
        edit: substationEditWizard,
        create: createSubstationWizard,
    },
    SupSubscription: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    TapChanger: {
        edit: editTapChangerWizard,
        create: createTapChangerWizard,
    },
    Terminal: {
        edit: editTerminalWizard,
        create: emptyWizard,
    },
    Text: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    TimerActivatedControl: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    TimeSyncProt: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    TransformerWinding: {
        edit: editTransformerWindingWizard,
        create: createTransformerWindingWizard,
    },
    TrgOps: {
        edit: editTrgOpsWizard,
        create: emptyWizard,
    },
    Val: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ValueHandling: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Voltage: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    VoltageLevel: {
        edit: voltageLevelEditWizard,
        create: voltageLevelCreateWizard,
    },
};
//# sourceMappingURL=wizard-library.js.map