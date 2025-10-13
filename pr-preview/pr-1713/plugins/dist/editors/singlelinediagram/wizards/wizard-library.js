import { emptyWizard } from '../../../wizards/wizard-library.js';
import { editConnectivityNodeWizard } from '../../../wizards/connectivitynode.js';
import { editTerminalWizard } from '../../../wizards/terminal.js';
import { editBayWizard } from './bay.js';
import { editConductingEquipmentWizard } from './conductingequipment.js';
import { editPowerTransformerWizard } from './powertransformer.js';
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
        create: emptyWizard,
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
        create: emptyWizard,
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
        edit: emptyWizard,
        create: emptyWizard,
    },
    DAI: {
        edit: emptyWizard,
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
        edit: emptyWizard,
        create: emptyWizard,
    },
    EqSubFunction: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    ExtRef: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    FCDA: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    FileHandling: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Function: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    GeneralEquipment: {
        edit: emptyWizard,
        create: emptyWizard,
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
        edit: emptyWizard,
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
        edit: emptyWizard,
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
        edit: emptyWizard,
        create: emptyWizard,
    },
    LN: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    LN0: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    LNode: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    LNodeType: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Line: {
        edit: emptyWizard,
        create: emptyWizard,
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
        edit: emptyWizard,
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
        create: emptyWizard,
    },
    Private: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Process: {
        edit: emptyWizard,
        create: emptyWizard,
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
        edit: emptyWizard,
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
        edit: emptyWizard,
        create: emptyWizard,
    },
    SubFunction: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SubNetwork: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Subject: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    Substation: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    SupSubscription: {
        edit: emptyWizard,
        create: emptyWizard,
    },
    TapChanger: {
        edit: emptyWizard,
        create: emptyWizard,
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
        edit: emptyWizard,
        create: emptyWizard,
    },
    TrgOps: {
        edit: emptyWizard,
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
        edit: emptyWizard,
        create: emptyWizard,
    },
};
//# sourceMappingURL=wizard-library.js.map