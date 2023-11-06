export const en = {
  scl: {
    id: 'ID',
    name: 'Name',
    desc: 'Description',
    ord: 'Ordinal',
    value: 'Value',
    EnumVal: 'Enum Value',
    EnumType: 'Enum Type',
    DA: 'Data attribute',
    DO: 'Data object',
    DAType: 'Data Attribute Type',
    DOType: 'Data Object Type',
    CDC: 'Common data class',
    Report: 'Report',
    LN: 'Logical Node',
    bType: 'Basic type',
    type: 'Type',
    sAddr: 'Short address',
    valKind: 'Value kind',
    valImport: 'Import value',
    fc: 'Function constraint',
    LNodeType: 'Logical Node Type',
    lnClass: 'Logical Node Class',
    accessControl: 'Access control',
    transient: 'Transient data',
    Val: 'Default value',
    dchg: 'Trigger on data change',
    qchg: 'Trigger on quality change',
    dupd: 'Trigger on data update',
    period: 'Periodical Publishing',
    gi: 'General Interrogation',
    fixedOffs: 'Fixed offset',
    securityEnable: 'Security enabled',
    DataSet: 'Dataset',
    Communication: 'Communication',
    TrgOps: 'Trigger options',
    OptFields: 'Optional fields',
    multicast: 'SMV acc. to IEC 61850 9-2',
    smpMod: 'Sample mode',
    smpRate: 'Sample rate',
    nofASDU: 'Samples per packet',
    seqNum: 'Add Sequence Number',
    timeStamp: 'Add Timestamp',
    dataSet: 'Add DataSet Reference',
    reasonCode: 'Add Trigger Reason',
    dataRef: 'Add description of the payload',
    entryID: 'Add Entry ID',
    configRef: 'Add Configuration Revision',
    bufOvfl: 'Add Buffered Overflow information',
    indexed: 'Multiple instances possible',
    buffered: 'Buffered Report',
    maxReport: 'Number of Instances',
    bufTime: 'Min. time between two Reports',
    intgPd: 'Time between two periodic Reports',
    SmvOpts: 'Optional Information',
    refreshTime: 'Add timestamp to SMV packet',
    sampleRate: 'Add sample rate to SMV packet',
    security: 'Potential future use. e.g. digital signature',
    synchSourceId: 'Add sync source id to SMV packet',
    SampledValueControl: 'Sampled Value Control Block',
    iedName: 'Referenced IED',
    ldInst: 'Referenced Logical Device',
    prefix: 'Prefix of the Logical Node',
    lnInst: 'Instance of the Logical Node',
    virtual: 'Virtual',
    phase: 'Phase',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    languages: { de: 'German (Deutsch)', en: 'English' },
    dark: 'Dark theme',
    mode: 'Pro mode',
    showieds: 'Show IEDs in substation editor',
    selectFileButton: 'Select file',
    loadNsdTranslations: 'Uploaded NSDoc files',
    invalidFileNoIdFound:
      "Invalid NSDoc ({{ filename }}); no 'id' attribute found in file",
    invalidNsdocVersion:
      'The version of {{ id }} NSD ({{ nsdVersion }}) does not correlate with the version of the corresponding NSDoc ({{ filename }}, {{ nsdocVersion }})',
  },
  menu: {
    new: 'New project',
    title: 'Menu',
    viewLog: 'View log',
    viewDiag: 'View diagnostics',
  },
  wizard: {
    title: {
      select: 'Select {{tagName}}',
      edit: 'Edit {{tagName}}',
      add: 'Add {{tagName}}',
    },
  },
  openSCD: {
    loading: 'Loading project {{ name }}',
    loaded: '{{ name }} loaded',
    readError: 'Error reading {{ name }}',
    readAbort: 'Aborted reading {{ name }}',
  },
  zeroline: {
    iedsloading: 'Loading IEDs...',
    showieds: 'Show/hide IEDs in substation editor',
    showfunctions: 'Filter function type elements',
    commmap: 'Communication mapping',
    reportcontrol: 'Show all Reports',
    gsecontrol: 'Show all GOOSEs',
    smvcontrol: 'Show all Sampled Values',
  },
  editing: {
    node: 'User defined object',
    created: 'Added {{ name }}',
    deleted: 'Removed {{ name }}',
    moved: 'Moved {{ name }}',
    updated: 'Edited {{ name }}',
    import: 'Imported {{name}}',
    error: {
      create: 'Could not add {{ name }}',
      update: 'Could not edit {{ name }}',
      move: 'Could not move {{ name }}',
      duplicate: 'Could not copy {{ name }}',
      nameClash:
        'Parent {{ parent }} already contains a {{ child }} named "{{ name }}"',
      idClash: 'The project has already an ID "{{ id }}"',
    },
  },
  textfield: {
    required: 'Required',
    nonempty: 'Must not be empty',
    noMultiplier: 'none',
    unique: 'Must be unique',
  },
  compare: {
    compareButton: 'Compare',
    attributes: 'Attributes from {{ elementName }}',
    children: 'Child elements from {{ elementName }}',
    filterMutables: 'Filter project specific differences',
  },
  log: {
    name: 'Log',
    placeholder: 'Edits, errors, and other notifications will show up here.',
    snackbar: {
      show: 'Show',
      placeholder: 'No errors',
    },
  },
  history: {
    name: 'SCL History',
    noEntries: 'No SCL history entries',
  },
  diag: {
    name: 'Diagnostics',
    zeroissues: 'No errors found in the project',
    placeholder: 'Issues found during validation will show up here',
    missingnsd:
      'Cannot validate DataTypeTemplates. The version of the project must be higher than or equal to 2007B3',
  },
  plugins: {
    heading: 'Extensions',
    editor: 'Editor tab',
    menu: 'Menu entry',
    requireDoc: 'Requires loaded document',
    top: 'top',
    middle: 'middle',
    bottom: 'bottom',
    validator: 'Validator',
    add: {
      heading: 'Add custom extension',
      warning: `Here you may add remote extensions directly from a custom URL.
                You do this at your own risk.`,
      name: 'Name',
      nameHelper: 'Your preferred extension name',
      src: 'URL',
      srcHelper: 'The vendor supplied extension URL',
    },
  },
  validator: {
    schema: {
      title: 'Validate project',
      valid: '{{ name }} XML schema validation successful',
      invalid: '{{ name }} XML schema validation failed',
      fatal: 'Fatal validation error',
      loadError: 'Could not load XML schema {{ name }}',
    },
    templates: {
      title: 'Validate templates',
      mandatoryChild:
        '{{ tag }} {{ id }} is missing mandatory child {{ childTag }} {{ childId }}',
      missingAttribute:
        'The attribute {{attr}} is required but missing in {{element}}',
      incorrectAttribute:
        'The attribute {{attr}} is incorrect in the element {{element}}.',
      missingReference:
        '{{tag}}:{{name}} has a invalid reference - type attribute cannot be connected to a template',
    },
  },
  substation: {
    name: 'Substation',
    missing: 'No substation',
    wizard: {
      nameHelper: 'Substation name',
      descHelper: 'Substation description',
      title: {
        add: 'Add substation',
        edit: 'Edit substation',
      },
    },
    action: {
      addvoltagelevel: 'Add voltage level',
      updatesubstation: 'Edited substation "{{name}}"',
    },
    clone: {
      redirect: "Redirect LNode's",
      cloneclose: 'Clone once',
      cloneproc: 'Clone multiple',
      newname: 'Clone Name',
    },
  },
  iededitor: {
    iedSelector: 'Select IED',
    lnFilter: 'Logical Node Filter',
    missing: 'No IED',
    toggleChildElements: 'Toggle child elements',
    settings: 'Show Services the IED/AccessPoint provides',
    wizard: {
      daTitle: 'Show DA Info',
      doTitle: 'Show DO Info',
      nsdocDescription: 'NSDoc description',
      doiDescription: 'Data object description',
      daiDescription: 'Data attribute description',
      ied: 'IED',
      accessPoint: 'Access point',
      lDevice: 'Logical device',
      lnPrefix: 'Logical node prefix',
      lnDescription: 'Logical node description',
      lnInst: 'Logical node inst',
      doName: 'Data object name',
      doCdc: 'Data object common data class',
      daName: 'Data attribute name',
      daFc: 'Data attribute functional constraint',
      daBType: 'Data attribute type',
      daValue: 'Data attribute value',
    },
  },
  ied: {
    wizard: {
      nameHelper: 'IED name',
      descHelper: 'IED description',
      title: {
        edit: 'Edit IED',
        delete: 'Remove IED with references',
        references: 'References to be removed',
      },
    },
    action: {
      updateied: 'Edited IED "{{name}}"',
      deleteied: 'Removed IED "{{name}}"',
    },
  },
  powertransformer: {
    wizard: {
      nameHelper: 'Power transformer name',
      descHelper: 'Power transformer description',
      typeHelper: 'Power transformer type',
      title: {
        add: 'Add power transformer',
        edit: 'Edit power transformer',
      },
    },
  },
  voltagelevel: {
    name: 'Voltage level',
    wizard: {
      nameHelper: 'Voltage level name',
      descHelper: 'Voltage level description',
      nomFreqHelper: 'Nominal frequency',
      numPhaseHelper: 'Number of phases',
      voltageHelper: 'Nominal voltage',
      title: {
        add: 'Add voltage level',
        edit: 'Edit voltage level',
      },
    },
    action: {
      updateVoltagelevel: 'Edited voltagelevel "{{name}}"',
    },
  },
  line: {
    name: 'Line',
    wizard: {
      nameHelper: 'Line name',
      descHelper: 'Line description',
      typeHelper: 'Line type',
      title: {
        add: 'Add line',
        edit: 'Edit line',
      },
    },
    action: {
      updateLine: 'Edited line "{{name}}"',
    },
  },
  process: {
    name: 'Process',
    wizard: {
      nameHelper: 'Process name',
      descHelper: 'Process description',
      typeHelper: 'Process type',
      title: {
        add: 'Add Process',
        edit: 'Edit Process',
      },
    },
    action: {
      updateProcess: 'Edited Process "{{name}}"',
    },
  },
  bay: {
    name: 'Bay',
    wizard: {
      nameHelper: 'Bay name',
      descHelper: 'Bay description',
      title: {
        add: 'Add bay',
        edit: 'Edit bay',
      },
    },
    action: {
      updateBay: 'Edited bay "{{name}}"',
    },
  },
  conductingequipment: {
    name: 'Conducting Equipment',
    wizard: {
      nameHelper: 'Conducting equipment name',
      descHelper: 'Conducting equipment description',
      typeHelper: 'Conducting equipment type',
      title: {
        add: 'Add conducting equipment',
        edit: 'Edit conducting equipment',
      },
    },
    unknownType: 'Unknown type',
  },
  connectivitynode: {
    name: 'Connectivity Node',
    wizard: {
      nameHelper: 'Connectivity node name',
      pathNameHelper: 'Connectivity node pathname',
      title: {
        add: 'Add Connectivity node',
        edit: 'Edit Connectivity node',
      },
    },
  },
  terminal: {
    name: 'Terminal',
    wizard: {
      nameHelper: 'Terminal name',
      connectivityNodeHelper: 'Terminal connectivity node',
      cNodeNameHelper: 'Terminal connectivity node name',
      title: {
        add: 'Add Terminal',
        edit: 'Edit Terminal',
      },
    },
  },
  templates: {
    name: 'Data Type Templates',
    missing: 'DataTypeTemplates missing',
    add: 'Add DataTypeTemplates',
  },
  subscription: {
    none: 'None',
    connect: 'Connect data attribute',
    disconnect: 'Disconnect data attribute',
    subscriber: {
      subscribed: 'Subscribed',
      notSubscribed: 'Not Subscribed',
      availableToSubscribe: 'Available to subscribe',
      partiallySubscribed: 'Partially subscribed',
      noControlBlockSelected: 'No control block selected',
      noIedSelected: 'No IED selected',
    },
    goose: {
      publisher: {
        title: 'GOOSE Publishers',
        subscriberTitle: 'IEDs subscribed to {{ selected }}',
      },
      subscriber: {
        iedListTitle: 'GOOSE Subscribers',
        publisherTitle: 'GOOSE Messages subscribed to {{selected}}',
      },
      view: {
        publisherView: 'Publisher | Subscriber',
        subscriberView: 'Subscriber | Publisher',
      },
    },
    smv: {
      publisher: {
        title: 'Sampled Value Messages',
        subscriberTitle: 'IEDs subscribed to {{ selected }}',
      },
      subscriber: {
        iedListTitle: 'Sampled Value Subscribers',
        publisherTitle: 'Sampled Value Messages subscribed to {{ selected }}',
      },
      view: {
        publisherView: 'Publisher | Subscriber',
        subscriberView: 'Subscriber | Publisher',
      },
    },
    binding: {
      extRefList: {
        title: 'Logical nodes available for selected data attribute',
        noSelection: 'No data attribute selected',
        noSubscribedLNs: 'No subscribed logical nodes',
        noAvailableLNs: 'No available logical nodes to subscribe',
      },
    },
    laterBinding: {
      extRefList: {
        title: 'Inputs available for selected data attribute',
        noSelection: 'No data attribute selected',
        noSubscribedExtRefs: 'No subscribed inputs',
        noAvailableExtRefs: 'No available inputs to subscribe',
      },
    },
    SampledValueControl: {
      controlBlockList: {
        title: 'Sampled Value Messages',
        noControlBlockFound: 'No Sampled Value Messages found',
      },
    },
    GSEControl: {
      controlBlockList: {
        title: 'GOOSE Messages',
        noControlBlockFound: 'No GOOSE Messages found',
      },
    },
  },
  protocol104: {
    toggleChildElements: 'Toggle child elements',
    view: {
      valuesView: 'Values',
      networkView: 'Network',
    },
    values: {
      missing: 'No IED with 104 Addresses',
      removeAddresses: 'Remove all Addresses',
      removedAddresses:
        'Removed Addresses from DOI "{{ name }}" ({{ nrOfAddresses }})',
      addedAddress:
        'Added 104 Address(es) to DO "{{ name }}" on LN(0) "{{ lnName }}"',
    },
    network: {
      connectedAp: {
        wizard: {
          title: {
            edit: 'Edit ConnectedAP',
          },
          redundancySwitchLabel: 'Redundancy',
          redundancyGroupTitle: 'Redundancy Groups',
          noRedundancyGroupsAvailable: 'No redundancy groups available',
          addRedundancyGroup: 'Redundancy Group',
          stationTypeHelper: 'Type of station',
          ipHelper: 'IP address of the logical link',
          ipSubnetHelper:
            'Subnetwork mask of the IP address of the logical link',
          wFactorHelper: 'W factor of the logical link',
          kFactorHelper: 'K factor of the logical link',
          timeout0Helper: 'Time-out in seconds of connection establishment',
          timeout1Helper: 'Time-out in seconds of sent or test APDUs',
          timeout2Helper:
            'Time-out in seconds for acknowledges in case of no data messages',
          timeout3Helper:
            'Time-out in seconds for sending test frames in case of a long idle state',
        },
      },
      redundancyGroup: {
        wizard: {
          title: {
            edit: 'Edit Redundancy Group',
            add: 'Add Redundancy Group',
          },
          redundancyGroupNumberLabel: 'Redundancy Group number',
          addedLRedundancyGroup:
            'Added Redundancy Group {{ rGNumber }} from SubNetwork (name="{{ subNetworkName }}") and ConnectedAP (AccessPoint Name="{{ apName }}", IED Name="{{ iedName }}")',
          editedRedundancyGroup:
            'Edited Redundancy Group {{ rGNumber }} from SubNetwork (name="{{ subNetworkName }}") and ConnectedAP (AccessPoint Name="{{ apName }}", IED Name="{{ iedName }}")',
          removedRedundancyGroup:
            'Removed Redundancy Group {{ rGNumber }} from SubNetwork (name="{{ subNetworkName }}") and ConnectedAP (AccessPoint Name="{{ apName }}", IED Name="{{ iedName }}")',
          logicLinkGroupTitle: 'Logic Links',
          noLogicLinksAvailable: 'No Logic Links available',
          addLogicLink: 'Logic Link',
        },
      },
      logicLink: {
        wizard: {
          title: {
            edit: 'Edit Logic Link',
            add: 'Add Logic Link',
          },
          logicLinkNumberLabel: 'Logic Link number',
          addedLogicLink:
            'Added Logic Link group to SubNetwork (name="{{ subNetworkName }}") and ConnectedAP (AccessPoint Name="{{ apName }}", IED Name="{{ iedName }}")',
          editedLogicLink:
            'Edited Logic Link group from SubNetwork (name="{{ subNetworkName }}") and ConnectedAP (AccessPoint Name="{{ apName }}", IED Name="{{ iedName }}")',
          removedLogicLink:
            'Removed Logic Link group from SubNetwork (name="{{ subNetworkName }}") and ConnectedAP (AccessPoint Name="{{ apName }}", IED Name="{{ iedName }}")',
        },
      },
    },
    wizard: {
      title: {
        doiInfo: 'DOI Info',
        addressEdit: 'Edit 104 Address',
        addAddress: 'Add 104 Address',
      },
      error: {
        addAddressError:
          'Invalid Template Structure, unable to create DAI Element. (DO: "{{ doType }}", CDC: "{{ cdc }}", DAI: "{{ structure }}")',
      },
      casduHelper: 'CASDU Value',
      ioaHelper: 'IOA Value',
      monitorTiHelper: 'Monitor TI Value',
      monitorInverted: 'Created Inverted Addresses (Monitor)',
      monitorCheck: 'Create Check Addresses (Monitor)',
      controlTiHelper: 'Control TI Value',
      controlInverted: 'Created Inverted Addresses (Control)',
      controlCheck: 'Create Check Addresses (Control)',
      expectedValueHelper: 'Expected Value',
      unitMultiplierHelper: 'Unit Multiplier',
      scaleMultiplierHelper: 'Scale Multiplier',
      scaleOffsetHelper: 'Scale Offset',
    },
  },
  'compare-ied': {
    selectProjectTitle: 'Select template project to Compare IED with',
    selectIedTitle: 'Select IED for comparison',
    resultTitle: 'Compared IED with IED from template project',
    projectIedTitle: 'IEDs in project',
    templateIedTitle: 'IEDs in template project',
    selectIedButton: 'Select IED',
    selectTemplateButton: 'Select template project',
    noDiff:
      'No differences between the project IED "{{ projectIedName }}" and template IED "{{ templateIedName }}"',
  },
  'enum-val': {
    wizard: {
      title: {
        add: 'Add EnumVal',
        edit: 'Edit EnumVal',
      },
    },
  },
  enum: {
    wizard: {
      title: {
        add: 'Add EnumType',
        edit: 'Edit EnumType',
      },
    },
    action: {
      edit: 'Change EnumType ID "{{oldId}}" and its DA references to {{newId}} ',
    },
  },
  datype: {
    wizard: {
      title: {
        add: 'Add DAType',
        edit: 'Edit DAType',
      },
    },
    action: {
      edit: 'Change DAType ID "{{oldId}}" and its DA references to {{newId}} ',
    },
  },
  bda: {
    wizard: {
      title: {
        add: 'Add BDA',
        edit: 'Edit BDA',
      },
    },
  },
  da: {
    wizard: {
      title: {
        add: 'Add DA',
        edit: 'Edit DA',
      },
    },
  },
  dai: {
    wizard: {
      valueHelper: 'Value should be of type {{type}}',
      title: {
        create: 'Create DAI "{{daiName}}"',
        edit: 'Edit DAI "{{daiName}}"',
      },
    },
    action: {
      createdai: 'Created DAI "{{daiName}}"',
      updatedai: 'Edited DAI "{{daiName}}"',
    },
  },
  sdo: {
    wizard: {
      title: {
        add: 'Add SDO',
        edit: 'Edit SDO',
      },
    },
  },
  do: {
    wizard: {
      title: {
        add: 'Add DO',
        edit: 'Edit DO',
      },
    },
  },
  dotype: {
    wizard: {
      title: {
        add: 'Add DOType',
        edit: 'Edit DOType',
      },
      enums: 'Default enumerations',
    },
    action: {
      edit: 'Change DOType ID "{{oldId}}" and its DO references to {{newId}} ',
    },
  },
  lnodetype: {
    wizard: {
      title: {
        add: 'Add LNodeType',
        edit: 'Edit LNodeType',
        select: 'Select Data Objects',
      },
    },
    action: {
      edit: 'Change LNodeType ID "{{oldId}}" and its LN references to {{newId}} ',
    },
    autoimport: 'Use LN class from OpenSCD template',
    missinglnclass: 'Missing pre-defined LN class',
  },
  lnode: {
    wizard: {
      title: {
        selectIEDs: 'Select IEDs',
        selectLDs: 'Select logical devices',
        selectLNs: 'Select logical nodes',
        selectLNodeTypes: 'Select logical node types',
      },
      placeholder: 'Please load an SCL file that contains IED elements.',
      uniquewarning: 'Logical node class already exists',
      reference: 'Add reference to existing logical node',
      instance: 'Add reference to logical node type',
    },
    log: {
      title: 'Cannot add LNode of class {{lnClass}}',
      nonuniquelninst: 'Cannot find unique lnInst',
      uniqueln0: 'Only one instance of {{lnClass}} allowed',
    },
    tooltip: 'Create logical nodes reference',
  },
  guess: {
    wizard: {
      primary: 'Guess content',
      title: 'Select control model (ctlModel)',
      description: `IEDs often contain more controllable logical nodes than switchgear in the field. \n You can select the control model(s) used specific for switchgear.`,
    },
  },
  merge: {
    title: 'Merge',
    defaultTitle: 'Merge {{ source }} into {{ sink }} ({{ tag }})',
    log: 'Merged {{ tag }} {{ source }} into {{ sink }}',
    children: 'Child elements',
  },
  import: {
    title: 'Import IEDs',
    log: {
      successful: 'IED {{ name }} loaded',
      parsererror: 'Parser error',
      loaderror: 'Could not load file',
      importerror: 'Could not import IED',
      missingied: 'No IED element in the file',
      multipleied: 'Multiple IED elements found',
      nouniqueied: 'IED element {{ name }} already in the file',
    },
  },
  communication: {
    name: 'Network Configuration',
    missing: 'No subnetwork',
  },
  subnetwork: {
    name: 'Subnetwork',
    wizard: {
      nameHelper: 'Subnetwork name',
      descHelper: 'Subnetwork description',
      typeHelper: 'Network type (e.g. 8-MMS)',
      bitrateHelper: 'Bit rate',
      title: {
        add: 'Add subnetwork',
        edit: 'Edit subnetwork',
      },
    },
  },
  connectedap: {
    name: 'Connected access point',
    wizard: {
      addschemainsttype: 'Add XMLSchema-instance type',
    },
    action: {
      addaddress: 'Edit Address ({{iedName}} - {{apName}})',
    },
  },
  gse: {
    action: {
      addaddress: 'Edit GSE ({{identity}})',
    },
    missingaccp: 'AccessPoint is not connected. GSE cannot be created.',
  },
  smv: {
    action: {
      addaddress: 'Edit SMV ({{identity}})',
    },
    missingaccp: 'AccessPoint is not connected. SMV cannot be created.',
  },
  subscriber: {
    title: 'Subscriber update',
    description: 'Subscriber update: ',
    nonewitems: 'no new IEDName elements to add',
    message: '{{updatenumber}} IEDName elements added to the project',
  },
  commmap: {
    title: 'Communication mapping',
    connectCB: 'Connect {{cbType}}',
    connectToIED: 'Connect to {{iedName}}',
    sourceIED: 'Source IED',
    sinkIED: 'Sink IED',
  },
  updatesubstation: {
    title: 'Update substation',
  },
  code: {
    log: 'Changed element in XML editor: {{id}}',
  },
  updatedesc: {
    abb: 'Added signal descriptions to ABB IEDs',
    sel: 'Added signal descriptions to SEL IEDs',
  },
  sld: {
    substationSelector: 'Select a substation',
    wizard: {
      xCoordinateHelper: 'X-Coordinate for Single Line Diagram',
      yCoordinateHelper: 'Y-Coordinate for Single Line Diagram',
    },
  },
  dataset: {
    fcda: { add: 'Add Data Attributes' },
    fcd: { add: 'Add Data Objects' },
  },
  report: {
    wizard: { location: 'Select Report Control Location' },
    rptID: 'Report control block identifier',
  },
  cleanup: {
    unreferencedDataSets: {
      title: 'Unreferenced Datasets',
      deleteButton: 'Remove Selected Datasets',
      tooltip:
        'Datasets without a reference to an associated GOOSE, Log, Report or Sampled Value Control Block',
    },
    unreferencedControls: {
      title: 'Control Blocks with a Missing or Invalid Dataset',
      deleteButton: 'Remove Selected Control Blocks',
      tooltip:
        'Control Blocks without a reference to an existing DataSet. Note that this is normal in an ICD file or for an MMS ReportControl with a dynamically allocated DataSet',
      addressDefinitionTooltip:
        'An address definition exists for this control block in the Communication section',
      alsoRemoveFromCommunication: 'Also remove SMV/GSE Address',
    },
    unreferencedDataTypes: {
      title: 'Unreferenced Data Types',
      deleteButton: 'Remove Selected Data Types',
      tooltip:
        'Data Types which are not referenced in a Logical Node or other used Data Type',
      alsoRemoveSubTypes: 'Also remove subtypes',
      stackExceeded:
        'Max Stack Length Exceeded. Maximum allowed is {{maxStackDepth}}. Datatype cleaning incomplete and file damage may have occurred.',
    },
  },
  controlblock: {
    action: {
      edit: 'Edited {{type}} "{{name}}" in IED {{iedName}}',
      add: 'Added {{type}} "{{name}}" to IED {{iedName}}',
      remove:
        'Removed {{type}} "{{name}}" and its referenced elements from IED {{iedName}}',
    },
    hints: {
      source: 'Source IED',
      missingServer: 'Not A Server',
      exist: '{{type}} with name {{name}} already exist',
      noMatchingData: 'No matching data',
      valid: 'Can be copied',
    },
    label: { copy: 'Copy to other IEDs' },
  },
  gsecontrol: {
    wizard: { location: 'Select GOOSE Control Block Location' },
  },
  samvpledvaluecontrol: {
    wizard: { location: 'Select Sampled Value Control Block Location' },
  },
  publisher: {
    selectbutton: 'Select other {{type}}',
    nodataset: 'No DataSet referenced',
    smv: {
      commsetting: 'Communication Settings (SMV)',
      noconnectedap: 'No connection to SubNetwork',
      smvopts: 'Optional Fields',
    },
  },
  exportCommunication: {
    noCommunicationSection: 'No export as Communication section empty',
  },
  userinfo: {
    loggedInAs: 'Logged in as {{name}}',
  },
  add: 'Add',
  new: 'New',
  remove: 'Remove',
  delete: 'Delete',
  edit: 'Edit',
  move: 'Move',
  create: 'Create',
  save: 'Save',
  saveAs: 'Save as',
  open: 'Open',
  reset: 'Reset',
  cancel: 'Cancel',
  close: 'Close',
  filter: 'Filter',
  filters: 'Filters',
  undo: 'Undo',
  redo: 'Redo',
  duplicate: 'Clone',
  connect: 'Connect',
  disconnect: 'Disconnect',
  next: 'Next',

  compas: {
    loading: 'Loading...',
    comment: 'Comment',
    newLabel: 'Add new label',
    notExists: 'Project no longer exists in CoMPAS!',
    noSclTypes: 'No types found in CoMPAS',
    noScls: 'No projects found in CoMPAS',
    sclFilter: 'Filter on:',
    noFilteredScls: 'No projects found matching the filter(s)',
    noSclVersions: 'No versions found for this project in CoMPAS',
    sclType: 'SCL Type',
    error: {
      type: 'Unable to determine type from document name!',
      server: 'Error communicating with CoMPAS Ecosystem',
      serverDetails: '{{type}}: {{message}}',
    },
    changeset: {
      major: 'Major change',
      minor: 'Minor change',
      patch: 'Patch change',
    },
    import: {
      title: 'Import from API',
    },
    label: {
      selectLabels: 'Select labels to be show',
    },
    open: {
      title: 'Open project',
      localTitle: 'Local',
      selectFileButton: 'Open file...',
      compasTitle: 'CoMPAS',
      listSclTypes: 'Select type of project',
      listScls: 'Select project ({{ type }})',
      otherTypeButton: 'Other type...',
    },
    save: {
      saveTitle: 'Save project',
      saveAsTitle: 'Save as new project',
      saveAsVersionTitle: 'Save as new version to existing project',
      localTitle: 'Local',
      saveFileButton: 'Save to file...',
      compasTitle: 'CoMPAS',
      labelsTitle: 'CoMPAS Labels',
      addSuccess: 'Project added to CoMPAS.',
      updateSuccess: 'Project updated in CoMPAS',
    },
    updateSubstation: {
      title: 'Update substation',
    },
    importIEDS: {
      title: "Import IED's",
    },
    merge: {
      title: 'Merge project',
    },
    autoAlignment: {
      title: 'Auto align SLD for selected substations',
      button: 'Execute',
      missing: 'No substations',
      success: 'Updated X/Y Coordinates for substation(s)',
    },
    uploadVersion: {
      title: 'Upload new version of project to CoMPAS',
      selectButton: 'Select file...',
      filename: 'Filename',
      updateSuccess: 'Project uploaded in CoMPAS',
    },
    versions: {
      title: 'CoMPAS Versions',
      sclInfo: 'Current project - Name: {{name}}, Version: {{version}}',
      addVersionButton: 'Add version',
      confirmRestoreTitle: 'Restore version?',
      confirmRestore: 'Are you sure to restore version {{version}}?',
      restoreVersionSuccess: 'Restored version {{version}} of project',
      deleteProjectButton: 'Delete project',
      confirmDeleteTitle: 'Delete project?',
      confirmDelete: 'Are you sure to delete all version(s)?',
      deleteSuccess: 'Removed project from CoMPAS',
      confirmDeleteVersionTitle: 'Delete version?',
      confirmDeleteVersion: 'Are you sure to delete version {{version}}?',
      deleteVersionSuccess:
        'Removed version {{version}} of project from CoMPAS',
      confirmButton: 'Confirm',
      compareButton: 'Compare versions',
      selectTwoVersionsTitle: 'Select two versions?',
      selectTwoVersionsMessage:
        'Select maximum two versions to compare with each other. Currently selected: {{size}}.',
      compareCurrentButton: 'Compare version (current)',
      selectOneVersionsTitle: 'Select one version?',
      selectOneVersionsMessage:
        'Select maximum one version to compare the current project against. Currently selected: {{size}}.',
    },
    scl: {
      wizardTitle: 'Edit SCL',
      filenameHelper: 'Filename used by CoMPAS when saving to a filesystem',
      labelsTitle: 'CoMPAS Labels',
      updateAction: 'Updated CoMPAS Private Element for SCL Element',
    },
    compare: {
      title: 'Compare version {{newVersion}} against version {{oldVersion}}',
      titleCurrent: 'Compare current project against version {{oldVersion}}',
      noDiff: 'No difference between versions',
      attributes: 'Attributes from',
      children: 'Child elements from',
    },
    settings: {
      title: 'CoMPAS Settings',
      sclDataServiceUrl: 'CoMPAS SCL Data Service URL',
      sclValidatorServiceUrl: 'CoMPAS SCL Validator Service URL',
      cimMappingServiceUrl: 'CoMPAS CIM Mapping Service URL',
      sclAutoAlignmentServiceUrl: 'CoMPAS SCL Auto Alignment Service URL',
      useWebsockets: 'Use Websockets',
    },
    exportIEDParams: {
      noIEDs: 'No IEDs found',
    },
    session: {
      headingExpiring: 'Your session is about to expire!',
      explainExpiring:
        'Because of inactivity ({{expiringSessionWarning}} minutes), your session with the CoMPAS Systems is about to expire. <br>' +
        "If you want to continue working press the button 'Continue'. Otherwise the session will expire in {{timeTillExpire}} minutes.",
      continue: 'Continue',
      headingExpired: 'Your session is expired!',
      explainExpiredWithProject:
        'Because of inactivity ({{expiredSessionMessage}} minutes), your session with the CoMPAS Systems is expired. <br>' +
        'To continue working you need to reload the browser to login again, but modifications to the project are lost. <br>' +
        "To prevent this you can first save the project to your local filesystem using the button 'Save project'. <br>" +
        "After loading the original project from CoMPAS you can add this file as new version using the tab 'CoMPAS Versions'.",
      explainExpiredWithoutProject:
        'Because of inactivity ({{expiredSessionMessage}} minutes), your session with the CoMPAS Systems is expired. <br>' +
        'To continue working you need to reload the browser to login again.',
      saveProject: 'Save project',
    },
    autogensubstation: {
      substationAmount: 'Found {{amount}} substation(s) to be created!',
      voltagelevelAmount: `Generating {{amount}} Voltage Level(s) for {{substationname}} substation!`,
      bayAmount: `Generating {{amount}} Bay Element(s) for {{voltagelevelname}} Voltage Level!`,
      substationGen: `Generated {{substationname}} substation with content!`,
    },
  },
  locamation: {
    vmu: {
      ied: {
        title: 'Configure Locamation VMUs',
        missing: 'No Locamation IEDs with Logica Devices found',
        name: 'IED',
      },
      ldevice: {
        name: 'Logical Device',
      },
      ln: {
        title: 'Configure Locamation VMUs (IED)',
        editTitle: 'Edit VMU',
        name: 'Logical Node',
      },
      version: 'Locamation VMU Version',
      identifier: 'Identifier',
      identifierHelper:
        'The address of the sensor. The address is constructed of 3 numbers, separated by dots. The range of each number is 0-255.',
      sum: 'Sum',
      sumHelper:
        'The collection of three channel numbers for which the sum of currents or voltages will be calculated. The numbers are separated by commas. Values for the current sensor range from 0 - 5, for the voltage sensor 0-2.',
      channel: 'Channel',
      channelHelper:
        'The channel number on the sensor. Values for the current sensor range from 0 - 5, for the voltage sensor 0-2.',
      transformPrimary: 'TransformPrimary',
      transformPrimaryHelper:
        'The nominator of the ratio of the measement transformer.',
      transformSecondary: 'TransformSecondary',
      transformSecondaryHelper:
        'The denominator of the ratio of the measement transformer.',
      updateAction:
        'Locamation private fields updated for Logica Node {{lnName}}',
    },
  },
};
