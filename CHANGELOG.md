# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.9.0](https://github.com/openscd/open-scd/compare/v0.8.2...v0.9.0) (2022-02-04)


### Features

* **settings:** load nsdoc to local storage ([#502](https://github.com/openscd/open-scd/issues/502)) ([659aa8e](https://github.com/openscd/open-scd/commits/659aa8ef3459ab8f513df2cf7971a02753a3a21b)), closes [#516](https://github.com/openscd/open-scd/issues/516)
* **wizards/reportcontrol:** added new IED wizard to update name/description ([#494](https://github.com/openscd/open-scd/issues/494)) ([110c83d](https://github.com/openscd/open-scd/commits/110c83d658f9c2a0f0c273249aefbee0f50fcfc1))
* **wizards/reportcontrol:** allow basic ReportControl manipulation capability ([#505](https://github.com/openscd/open-scd/issues/505)) ([943b8dc](https://github.com/openscd/open-scd/commits/943b8dc2b82e6039bd6de99aabbfd10e31527256)), closes [#438](https://github.com/openscd/open-scd/issues/438) [#492](https://github.com/openscd/open-scd/issues/492) [#493](https://github.com/openscd/open-scd/issues/493) [#499](https://github.com/openscd/open-scd/issues/499)
* **wizards/sampledvaluecontrol:** add edit wizards accessable from selection ([#510](https://github.com/openscd/open-scd/issues/510)) ([fa468b7](https://github.com/openscd/open-scd/commits/fa468b714b714623031fdd754a0056a9cd793214))
* **wizards/smv:** add edit wizard and allow access from sampledvaluecontrol wizard ([#519](https://github.com/openscd/open-scd/issues/519)) ([aff0367](https://github.com/openscd/open-scd/commits/aff036776eba7434d619de20a67f8f07b3b3c5c7))


### Bug Fixes

* **editors/SingleLineDiagram:** added check if a substation is available/selected before drawing ([4eabdb3](https://github.com/openscd/open-scd/commits/4eabdb3ac9fdc2f2db2ebb2058bd8675592e12d6))
* **editors:** In IED and SLD Editors fixed preserving the selection (IED or Substation) ([#501](https://github.com/openscd/open-scd/issues/501)) ([b10df43](https://github.com/openscd/open-scd/commits/b10df4364e4c5b8c1f4cb14766f1e50c1d6af567))
* **menu/Help:** incorrect import of markup parser ([#531](https://github.com/openscd/open-scd/issues/531)) ([b6f7ea1](https://github.com/openscd/open-scd/commits/b6f7ea1024a30d7ed0f1f3af5bf42536f0f82fb5))
* **wizards/fcda:** make sure lnInst is non empty string ([#512](https://github.com/openscd/open-scd/issues/512)) ([f8d2dc7](https://github.com/openscd/open-scd/commits/f8d2dc75a804b06c2e4f1178d0f9768b967ea806))

### [0.8.2](https://github.com/openscd/open-scd/compare/v0.8.1...v0.8.2) (2022-01-15)


### Bug Fixes

* **Help:** hot-fix incorrect import statement ([c3baa84](https://github.com/openscd/open-scd/commits/c3baa847e1446bf4f2d3b2ad74834228dfc96d08))

### [0.8.1](https://github.com/openscd/open-scd/compare/v0.8.0...v0.8.1) (2022-01-15)


### Features

* **editors/ied:** add read only data model structure ([#423](https://github.com/openscd/open-scd/issues/423)) ([fa15c7a](https://github.com/openscd/open-scd/commits/fa15c7a598f92c2af7237c3e9e1060d453b2162d)), closes [#454](https://github.com/openscd/open-scd/issues/454)
* **editors/ied:** Add toggle for LDevice child elements ([#484](https://github.com/openscd/open-scd/issues/484)) ([9385506](https://github.com/openscd/open-scd/commits/9385506d3f5356bf0523eb3678c13d6b38c17ba9))
* **editors/ied:** Changed icon of IED Editor ([#481](https://github.com/openscd/open-scd/issues/481)) ([be4c8ca](https://github.com/openscd/open-scd/commits/be4c8ca60e6817739094a92a77ef82c1c3911f2c))
* **editors/SingleLineDiagram:** allow selecting the Substation element ([#449](https://github.com/openscd/open-scd/issues/449)) ([d09efec](https://github.com/openscd/open-scd/commits/d09efec1eccdf2363ed1db22c2558b9cc25b9395))
* **editors/SingleLineDiagram:** allow updating X/Y coordinates in SLD for Busbar/ConductingEquipment/PowerTransformer ([#455](https://github.com/openscd/open-scd/issues/455)) ([dfae9b0](https://github.com/openscd/open-scd/commits/dfae9b0deda74cd12785b0a55a9298e91ec21b01))
* **foundation:** allow dynamic wizards ([#471](https://github.com/openscd/open-scd/issues/471)) ([64a27d5](https://github.com/openscd/open-scd/commits/64a27d5875d2362b1796e811f909e13af7995c33))
* **UpdateDescriptionSEL:** add menu type plugin for SEL specific IEDs ([#424](https://github.com/openscd/open-scd/issues/424)) ([12c9123](https://github.com/openscd/open-scd/commits/12c912301f8a918f27ef55b702a0334f76e96a45))
* **zeroline:** show SampledValueControl for IED and whole project ([#477](https://github.com/openscd/open-scd/issues/477)) ([0253adc](https://github.com/openscd/open-scd/commits/0253adc3d696cd806eff23534114c122d27bb979))


### Bug Fixes

* **editors/template/lnodetype:** fix incorrect pattern for lnClass ([#469](https://github.com/openscd/open-scd/issues/469)) ([55e0c7e](https://github.com/openscd/open-scd/commits/55e0c7e999536bbd58b574be1ab93237974dfb87))
* **wizards/fcda:** remove incorrect iedName from FCDA ([#446](https://github.com/openscd/open-scd/issues/446)) ([eae9f6e](https://github.com/openscd/open-scd/commits/eae9f6edc313bf293caa31ed3f82d5261a9ef5f3))

## [0.8.0](https://github.com/openscd/open-scd/compare/v0.7.1...v0.8.0) (2021-12-10)


### Features

* **menu/UpdateDescritionABB:** update ABB ExtRef with internal signal description ([#374](https://github.com/openscd/open-scd/issues/374)) ([a3aecf7](https://github.com/openscd/open-scd/commits/a3aecf739ce22abfc1243b1f94a069cc05ad9b86))
* **SingleLineDiagram:** open onclick ConductingEquipment edit wizard ([fd025a2](https://github.com/openscd/open-scd/commits/fd025a2b1b40e6fea11f91b2a4843ec665c179fa))
* **templates/dotype-wizard:** add cdc field in create wizard ([#330](https://github.com/openscd/open-scd/issues/330)) ([0298ac5](https://github.com/openscd/open-scd/commits/0298ac51f3c6494fac7d470eff8f1939a56bdb55))
* **validators/validatetemplate:** trigger validators with editor action ([#300](https://github.com/openscd/open-scd/issues/300)) ([13fbd18](https://github.com/openscd/open-scd/commits/13fbd1873f486aabc1e7c8de58b7544cf7da2eb8))
* **wizards/dataset:** delete deselected FCDA ([#358](https://github.com/openscd/open-scd/issues/358)) ([c94826d](https://github.com/openscd/open-scd/commits/c94826d856ae9d89224f9e56dbf0a67b4bb7977c))
* **wizards/fcda:** add data(FCDA) to existing DataSets ([#338](https://github.com/openscd/open-scd/issues/338)) ([423166e](https://github.com/openscd/open-scd/commits/423166ee728571d07d33887b55463799579fe72e)), closes [#339](https://github.com/openscd/open-scd/issues/339) [#345](https://github.com/openscd/open-scd/issues/345)


### Bug Fixes

* **editor-container:** minor UI issues ([#371](https://github.com/openscd/open-scd/issues/371)) ([81e1d3d](https://github.com/openscd/open-scd/commits/81e1d3d5c627d075386575253608f6cfe8abdbae))
* **editor-container:** some UI related issues ([#357](https://github.com/openscd/open-scd/issues/357)) ([1b054b6](https://github.com/openscd/open-scd/commits/1b054b66b91b97876ee79f746ee08b9b18c74cff))
* **templates/lnodetype-wizard:** deselect optional DOTypes at LNode creation ([#326](https://github.com/openscd/open-scd/issues/326)) ([09e7af5](https://github.com/openscd/open-scd/commits/09e7af5708dba8490ee60ecbe204f4a06dd7b7ce))

### [0.7.1](https://github.com/openscd/open-scd/compare/v0.7.0...v0.7.1) (2021-10-18)


### Features

* **editor-container:** add initial web-component ([3993bbd](https://github.com/openscd/open-scd/commits/3993bbd3aebbcfad969316dddc55d46c92ebcf3a))
* **Logging:** show Hitem from SCL ([#315](https://github.com/openscd/open-scd/issues/315)) ([51c3662](https://github.com/openscd/open-scd/commits/51c3662657615986400640abe0d6ffd939742a3c))
* **public/templates:** add logical node classes ([#320](https://github.com/openscd/open-scd/issues/320)) ([5d07886](https://github.com/openscd/open-scd/commits/5d0788643b6773a4bb62c182d59b9831535d3994))


### Bug Fixes

* **package.json:** license change ([e0d395f](https://github.com/openscd/open-scd/commits/e0d395fa00fbb2dd464cfe163ee68d01115ac311))
* **translation:** improve capitalization add missing menu.new ([#307](https://github.com/openscd/open-scd/issues/307)) ([b5e2621](https://github.com/openscd/open-scd/commits/b5e2621e19858aa49d7d40c198fd54495e179051)), closes [#306](https://github.com/openscd/open-scd/issues/306)
* **wizard/commap:** neglect ExtRef without valid source ([#298](https://github.com/openscd/open-scd/issues/298)) ([4881586](https://github.com/openscd/open-scd/commits/488158667a65713c229c7c676f136fe5ea0bfdad))
* **zeroline/conducting-equipment:** spell correction ([#319](https://github.com/openscd/open-scd/issues/319)) ([9bb51ec](https://github.com/openscd/open-scd/commits/9bb51ecbe979c1a9029773fd4ff21745c832ab37))

## [0.7.0](https://github.com/openscd/open-scd/compare/v0.6.0...v0.7.0) (2021-08-31)


### Features

* **Logging:** show validation issues in a seperate diagnostics pane ([#286](https://github.com/openscd/open-scd/issues/286)) ([f90039a](https://github.com/openscd/open-scd/commits/f90039a619bf5b79ec299c96b2ba91f30e1822ce))
* make all fonts available offline ([#294](https://github.com/openscd/open-scd/issues/294)) ([ee932a3](https://github.com/openscd/open-scd/commits/ee932a3139d3c265670a62a02b1a3749e37b06a9))
* **filtered-list:** select only visible items on checkAll ([#288](https://github.com/openscd/open-scd/issues/288)) ([db49745](https://github.com/openscd/open-scd/commits/db497452729ed2cff6d3c5aeffcd31d212c2ee58))
* **gsecontrol:** edit GSEControl and its referenced elements ([#278](https://github.com/openscd/open-scd/issues/278)) ([b5b39c4](https://github.com/openscd/open-scd/commits/b5b39c4cee790c2e6dc6dc00e981111c12398574))
* **templates:** add val manipulation capability ([#275](https://github.com/openscd/open-scd/issues/275)) ([259ce39](https://github.com/openscd/open-scd/commits/259ce39dea0ea61b2766dad30d1220a2f32f235a))


### Bug Fixes

* **ied-editor:** add tooltip with full IED name ([#291](https://github.com/openscd/open-scd/issues/291)) ([3ed474a](https://github.com/openscd/open-scd/commits/3ed474ae6a66936a102e9cccf671c204846675f8))
* **package:** copy .nojekyll to build dir ([3bf9a3f](https://github.com/openscd/open-scd/commits/3bf9a3fce272631e64a7858a7c62b9bb2728ce67))

## [0.6.0](https://github.com/openscd/open-scd/compare/v0.5.0...v0.6.0) (2021-07-30)


### Features

* **communicationmapping:** move to ied-editor ([#270](https://github.com/openscd/open-scd/issues/270)) ([d427ca4](https://github.com/openscd/open-scd/commits/d427ca4c34d44d877dcd008e5055ffb58b395a2b))
* **zeroline-pane:** add combined Substation and IED overview ([#251](https://github.com/openscd/open-scd/issues/251)) ([21ab8ce](https://github.com/openscd/open-scd/commits/21ab8cee8c9e3323311486422644002ebcfe4b1c))


### Bug Fixes

* **logging:** remove superfluous invisible reset filter ([#266](https://github.com/openscd/open-scd/issues/266)) ([b6294ef](https://github.com/openscd/open-scd/commits/b6294ef2aacae2c11661406661af977be938bc11))
* **package:** sync package-lock.json ([4394ef2](https://github.com/openscd/open-scd/commits/4394ef21328b948c53f7be635b594757862709ee))
* **plugging:** fix plugin auto-update ([#253](https://github.com/openscd/open-scd/issues/253)) ([#264](https://github.com/openscd/open-scd/issues/264)) ([79abfbe](https://github.com/openscd/open-scd/commits/79abfbe2462f11d6afeb3e91163a2af369d8effa))
* **templates:** add missing SwTyp and fix wrong cdc ([#263](https://github.com/openscd/open-scd/issues/263)) ([071add9](https://github.com/openscd/open-scd/commits/071add99f5e8c64ef46b0f8295d66d446b27fe7e))
* **validatetemplates:** don't require "Oper" if ctlModel=status-only ([#269](https://github.com/openscd/open-scd/issues/269)) ([2cef3d7](https://github.com/openscd/open-scd/commits/2cef3d75418d685c3b46c714c0bbdaaabcaa0b2b))

## [0.5.0](https://github.com/openscd/open-scd/compare/v0.4.1...v0.5.0) (2021-07-17)


### Features

* **help:** integrate user manual ([#249](https://github.com/openscd/open-scd/issues/249)) ([e5f4470](https://github.com/openscd/open-scd/commits/e5f44706e435c913c0fb9d503876f468a0cc5cb8))
* **templates/lnodetype-wizards:** add helper wizard for missing lnClass in templates ([#241](https://github.com/openscd/open-scd/issues/241)) ([07c8b3e](https://github.com/openscd/open-scd/commits/07c8b3e20b1f9e5aff1e18bcd8f515c540fdc17c))
* **wizard-select:** add nullable mwc-select web-component ([#250](https://github.com/openscd/open-scd/issues/250)) ([f118779](https://github.com/openscd/open-scd/commits/f1187798820dd7a67fbcc9db409e27177de7952d))


### Bug Fixes

* **help:** get version info from manifest.js ([35846aa](https://github.com/openscd/open-scd/commits/35846aa6f1cabbe79166328123c316b8a139f94a))
* **substation/lnodewizard:** localize LNode changes ([#245](https://github.com/openscd/open-scd/issues/245)) ([2a09fe0](https://github.com/openscd/open-scd/commits/2a09fe0dc3d91e313506a41a1550329e1690735c))

### [0.4.1](https://github.com/openscd/open-scd/compare/v0.4.0...v0.4.1) (2021-07-02)


### Bug Fixes

* **help:** wrong plugin name in plugin.js for help ([7301d28](https://github.com/openscd/open-scd/commits/7301d28badd463ddd8c2111833b9588743b840c1))

## [0.4.0](https://github.com/openscd/open-scd/compare/v0.3.0...v0.4.0) (2021-07-02)

> **NB** for plugin developers:
> * All menu item plugins in `public/js/plugins.js` are now listed under `kind: 'menu'` with a `position: 'top' | 'middle' | 'bottom'` determining positioning in the menu and `requireDoc: boolean` indicating whether the plugin requires a `doc` to be loaded in order to be clickable.
> * All menu item and validator plugins now use the unified method signature `run(): Promise<void>` to be triggered.

### Features

* **editors/templates/lnodetype-wizards:** add basic lnodetype manipulation capabilities ([#213](https://github.com/openscd/open-scd/issues/213)) ([48a3753](https://github.com/openscd/open-scd/commits/48a37537dc2f59da87060b96e1530db200909c74))
* **validators/validatetemplates:** add validation based on NSD files ([#229](https://github.com/openscd/open-scd/issues/229)) ([4397f9e](https://github.com/openscd/open-scd/commits/4397f9ee2d545d4f6b32a25d6b51282920186476))
* **wizard-dialog:** add code editor to wizards ([#233](https://github.com/openscd/open-scd/issues/233)) ([78cc0b6](https://github.com/openscd/open-scd/commits/78cc0b62d4a64be6ecef5d87bdc6ee65cfd2d516))


### Bug Fixes

* **templates:** adjustwidth setting to better fit to small portable devices ([#236](https://github.com/openscd/open-scd/issues/236)) ([df60ca7](https://github.com/openscd/open-scd/commits/df60ca7df7f581016622d19c8014dc4da5d951d6))
* **wizard-dialog:** remove button actions only after action was successful ([#231](https://github.com/openscd/open-scd/issues/231)) ([ba7cb33](https://github.com/openscd/open-scd/commits/ba7cb336e30785321c1a04d4c3b01254ac8344ed))

## [0.3.0](https://github.com/openscd/open-scd/compare/v0.2.0...v0.3.0) (2021-06-11)


### Features

* **editors/templates:** add read-only DOType section ([#208](https://github.com/openscd/open-scd/issues/208)) ([75cfbdf](https://github.com/openscd/open-scd/commits/75cfbdfc2a8c952e0f9d4d8428f1fcb6eb0ee83d))
* **templates:** add DAType basic manipulation capability ([#201](https://github.com/openscd/open-scd/issues/201)) ([f75dd55](https://github.com/openscd/open-scd/commits/f75dd558a020684d7c40b38a5105823c37560070))


### Bug Fixes

* **lit-element:** return to last working version ([3c3e084](https://github.com/openscd/open-scd/commits/3c3e0845a2eb69ce241cce0c3d7e9652ffee48d5))
* **package:** fix typescript version ([e6771c2](https://github.com/openscd/open-scd/commits/e6771c28af00f96d7d8e1bc7a21333d81de145e1))
* **package-lock:** downgrade typescript ([3441cad](https://github.com/openscd/open-scd/commits/3441cad3ca23e12928103e948cc40cac26c38cb7))
* **pluggin:** add missing import ied plugin in the plugins.js ([27d35f0](https://github.com/openscd/open-scd/commits/27d35f03d2b5aa448cb3400e570f0b8c41ed7fc3))
* **snowpack:** return to last working version ([3fcd2b4](https://github.com/openscd/open-scd/commits/3fcd2b48bcdb8ef80bacfd8448e47a604cda7731))

## [0.2.0](https://github.com/openscd/open-scd/compare/v0.1.0...v0.2.0) (2021-05-14)


### Features

* **importied:** allow import TEMPLATE IED ([0b017b1](https://github.com/openscd/open-scd/commits/0b017b1f8c6ae7ace827e67fee16ef043587b7ad))
* **importied:** move from mixin to plugin ([92c966e](https://github.com/openscd/open-scd/commits/92c966e6d012230f8cf5c0fa87bf0745975a2a86))
* **importing:** add communication section elements as well ([b419725](https://github.com/openscd/open-scd/commits/b419725e7ba13ec6bb653281345b560c1fb7d587))
* **importing:** allow multiple file import ([38fa1d2](https://github.com/openscd/open-scd/commits/38fa1d21ecfaab39ab48ae46d6018a5604f4b2e7))
* **importing:** generate reference automatically ([d6b11c8](https://github.com/openscd/open-scd/commits/d6b11c810e9936b00ff982283925f0fe896d2d09))
* **plugin:** reload official plugins without reset ([#196](https://github.com/openscd/open-scd/issues/196)) ([dd9c8d5](https://github.com/openscd/open-scd/commits/dd9c8d5111027702813e58176da8a0b4c4d6cefd))
* **subscriberinfo:** sampledvaluecontrol included, edition1 difference acknowledged ([#192](https://github.com/openscd/open-scd/issues/192)) ([7b6e363](https://github.com/openscd/open-scd/commits/7b6e3632382b3663b699f68f3c0493d0556f665a))


### Bug Fixes

* integrate getReference to follow the element order as defined in the schema ([#197](https://github.com/openscd/open-scd/issues/197)) ([a8c46da](https://github.com/openscd/open-scd/commits/a8c46da48d39ee00508aff9fbb6a69e2134547af))
* **communicationmappings:** remove leftover console.warn ([c210bfc](https://github.com/openscd/open-scd/commits/c210bfc71bd7f96d9f4ef646d967e1252dbfd993))
* **importing:** make sure id references are correct ([7bd9808](https://github.com/openscd/open-scd/commits/7bd98083ff6be7d5046338b6258de4a5ba03bf54))

## [0.1.0](https://github.com/openscd/open-scd/compare/v0.0.4...v0.1.0) (2021-04-30)


### Features

* **communication-editor:** show all connected ap within ied ([#189](https://github.com/openscd/open-scd/issues/189)) ([6bb9815](https://github.com/openscd/open-scd/commits/6bb98156a05f6f08d2ea4debb5a39ca948f44325))
* **filtered-list:** add check all to filtered-list ([#187](https://github.com/openscd/open-scd/issues/187)) ([d630a57](https://github.com/openscd/open-scd/commits/d630a5701507d3b480bc39fc3231f293f5e535d7))
* **foundation:** getreference function ([#180](https://github.com/openscd/open-scd/issues/180)) ([19680cc](https://github.com/openscd/open-scd/commits/19680ccb327109a4eee09315c15475f6075d9539))
* **logging:** show snackbars on info and warning ([#186](https://github.com/openscd/open-scd/issues/186)) ([dc6081b](https://github.com/openscd/open-scd/commits/dc6081b567f70827e8550ee0ccf28b22424baa1f))


### Bug Fixes

* **communicationmapping:** ClientLN handling for LNs reside in AccessPoint ([#173](https://github.com/openscd/open-scd/issues/173)) ([0fce19e](https://github.com/openscd/open-scd/commits/0fce19e1124ebb48b7b6a7227b1ecd546f16c27f))
* **logging:** respect mwc snackbar minimum timeout ([1fbbd93](https://github.com/openscd/open-scd/commits/1fbbd932230b553c846bbb0a7e9d8e553243c073))
* **open-scd:** fix createNewProject for Edition 2 ([#188](https://github.com/openscd/open-scd/issues/188)) ([ab786a0](https://github.com/openscd/open-scd/commits/ab786a0cdbf56b22163a9dd81fa2ed5328cddd8a))

### [0.0.4](https://github.com/openscd/open-scd/compare/v0.0.3...v0.0.4) (2021-04-12)


### Features

* **comm-mapping:** add commMappingWizard and cbConectionWizard ([fa48b7f](https://github.com/openscd/open-scd/commits/fa48b7fb8deceaae871d8ecbdd45a68f58471c11))
* **communication-mapping:** add commication mapping plugin ([11b0d23](https://github.com/openscd/open-scd/commits/11b0d23ff7389b7953cb8a6ef83ab858257dc54b))
* **communicationmapping:** add Connection filter function ([ad80859](https://github.com/openscd/open-scd/commits/ad80859bc15599730d270a3a0d0e2ca21de26fe9))
* **communicationmapping:** add getDataConnection function that allows filter for connections between FCDA and ExtRef element ([04a26cf](https://github.com/openscd/open-scd/commits/04a26cfd22ba7339681ab9d5c9cea7780b35d4eb))
* **communicationmapping:** create control block connections with clientln ([0cf0611](https://github.com/openscd/open-scd/commits/0cf0611bfc9890afc9965333b0f40c515d38b5a6))
* **filtered-list:** initial commit ([4d871ed](https://github.com/openscd/open-scd/commits/4d871ed138552e45b55a86098400c47e19ce092d))
* **foundation:** add getDataSink function returning array of ExtRefs connected to FCDA ([4e1440e](https://github.com/openscd/open-scd/commits/4e1440e4c317842134c53f02f85d910f40a82d39))
* **foundation:** add isEqual function ([54dfe5d](https://github.com/openscd/open-scd/commits/54dfe5d356257668cd2daeac8c9308a0907b2456))
* **foundation:** add isIdentical function to identify Elements ([7dc494b](https://github.com/openscd/open-scd/commits/7dc494b290a67e56a739964be0307ab6b193ca8d))
* **icons:** add goose, report and smv service icons ([87b25f9](https://github.com/openscd/open-scd/commits/87b25f9cc0e1cb6d6a57090b95d3f6746e5f22ab))
* **icons:** add iccons for communication mapping ([50b0e30](https://github.com/openscd/open-scd/commits/50b0e30bc9df183c43ec949962956f3a28d10ae7))
* **merge-plugin:** add general functionality to merge two SCL files ([610ec18](https://github.com/openscd/open-scd/commits/610ec180e9fdf8c613ec94eab5df58f06a3268c1)), closes [#156](https://github.com/openscd/open-scd/issues/156) [#156](https://github.com/openscd/open-scd/issues/156) [#168](https://github.com/openscd/open-scd/issues/168)
* **trigger/communicationmapping:** use identities instead of stringyfied values ([79e08e1](https://github.com/openscd/open-scd/commits/79e08e1f0536f27037129cbeeac0e79dc6a71c73))
* **triggered/communication-mapping:** IEDName handling on ExtRef disconnection ([06261bb](https://github.com/openscd/open-scd/commits/06261bb86258b7e58d3c9974aff88f04a9ef404d))
* **triggered/communicationmapping:** add clientlnwizard ([4b02df5](https://github.com/openscd/open-scd/commits/4b02df5de5836eb6249b31c8baddf26f3bb2955d))
* **triggered/merge:** add merge plugin ([#156](https://github.com/openscd/open-scd/issues/156)) ([15122e6](https://github.com/openscd/open-scd/commits/15122e6294f69d5fb1fca331b306b414f7d638e0))
* **updatesubstation:** add special merge functionality for substation section ([#168](https://github.com/openscd/open-scd/issues/168)) ([413ae0e](https://github.com/openscd/open-scd/commits/413ae0e893320b0a30e03f1b52ca6d2a0be9c894))
* **wizards:** initial merge wizard suggestion ([#156](https://github.com/openscd/open-scd/issues/156)) ([0f1d923](https://github.com/openscd/open-scd/commits/0f1d923ac19b8aca9659fe72ad77910d111f254a))
* **wizards/merge:** add 'value' merging option ([4dabfd7](https://github.com/openscd/open-scd/commits/4dabfd7447d7d2567857459ba82c06e9b990c881))
* **wizards/merge:** add default selected option ([ae09a53](https://github.com/openscd/open-scd/commits/ae09a530309a3212ed2d7c0949ca726bff57565b))


### Bug Fixes

* **foundation:** adopt identities in isSame and isEqual ([21238b5](https://github.com/openscd/open-scd/commits/21238b5f4b68a527cc02dd36299fe2d684c1ff43))
* **foundation:** fix lNSelector ([491fd52](https://github.com/openscd/open-scd/commits/491fd521406df76e3d6c3b280ba3f560de5cf99d))
* **translation:** minor imporvements ([055450a](https://github.com/openscd/open-scd/commits/055450a2bf9390c0e3f201dd7a22d89293ec5bfc))
* **triggered/communicationmapping:** fix foldered naming and import statements ([901c44d](https://github.com/openscd/open-scd/commits/901c44d9fd37bc0135e93d000ed9ba14138b3587))
* **triggered/mergeplugin:** use correct parent when attributes and children triggered at once ([272b60b](https://github.com/openscd/open-scd/commits/272b60b9283a718f35b8ed1698b4a0d73d7bdd17))
* **wizard-dialog,plugs.json,wizards.ts:** rebase on main was not correct ([65f34ad](https://github.com/openscd/open-scd/commits/65f34ada27f72db7c211e9173af3001049a372be))
* **wizards:** use new identities in mergeWizard ([21169e5](https://github.com/openscd/open-scd/commits/21169e5359909b26d63094b546fa15144e99f53b))
* **wizards/merge:** show 'merge value' option only when needed ([1c67db2](https://github.com/openscd/open-scd/commits/1c67db29336576d7fa3dc1f465e6ea1ff611be88))

### [0.0.3](https://github.com/openscd/open-scd/compare/v0.0.2...v0.0.3) (2021-03-19)


### Bug Fixes

* allow re-opening the same file again ([#7](https://github.com/openscd/open-scd/issues/7)) ([#160](https://github.com/openscd/open-scd/issues/160)) ([8b57883](https://github.com/openscd/open-scd/commits/8b57883cd191106dacabe5f8dbd8678c00cf92a4))
* **editors/substation:** remove horizontal scroll bar on overflow ([#159](https://github.com/openscd/open-scd/issues/159)) ([#161](https://github.com/openscd/open-scd/issues/161)) ([4723bcd](https://github.com/openscd/open-scd/commits/4723bcd123e6c5d24287404b2a95b0148d302b79))

### [0.0.2](https://github.com/openscd/open-scd/compare/v0.0.1...v0.0.2) (2021-03-05)


### Features

* **logging:** add buttons to filter log messages by kind ([#136](https://github.com/openscd/open-scd/issues/136)) ([f354e1e](https://github.com/openscd/open-scd/commits/f354e1ea741179d3bdea06a486460269c3a202b2))
* add extension manager ([#124](https://github.com/openscd/open-scd/issues/124)) ([7264148](https://github.com/openscd/open-scd/commits/726414874d93ab894efc9c9360f3b47c5f5e694b))
* **defaults/template:** add all enumerations defined in 7-3 and 7-4 ([df27785](https://github.com/openscd/open-scd/commits/df27785fdea51011bede7c302670954f136ded47))
* **editors/templates:** add enum editor ([fe3887e](https://github.com/openscd/open-scd/commits/fe3887ef4b29999a7836de437e30990b442f10ac))
* **editors/templates:** add some default EnumTypes ([acad00b](https://github.com/openscd/open-scd/commits/acad00b9a4e57e81336a05c49de489e131057529))
* **editors/templates/enum:** add EnumVal editor ([a165df1](https://github.com/openscd/open-scd/commits/a165df13b874aaa9d371ece81b00c23ba13f796f))
* **editors/templates/enum:** add remove functionality ([bdd3962](https://github.com/openscd/open-scd/commits/bdd39620b0ff5946467ec11dbf24f627b582811d))
* **package:** add build task without tests ([00fb203](https://github.com/openscd/open-scd/commits/00fb20305a2ab6549077cc477c34bbe3339b0971))
* **package:** add manual test option ([d47e82e](https://github.com/openscd/open-scd/commits/d47e82e069feed4966dfc7c14d6468f6c5cf9a2e))
* **package:** allow manual browser choice in test:watch ([e9e61a4](https://github.com/openscd/open-scd/commits/e9e61a4c332861eca450557341b00664ae94984c))
* **package:** generate coverage during test:watch ([d7bfd08](https://github.com/openscd/open-scd/commits/d7bfd08720ca5847f76fc550addb183e008aa4f6))
* **scl-transformation:** automatic IEDName subscriber auto-complete ([#126](https://github.com/openscd/open-scd/issues/126)) ([9875644](https://github.com/openscd/open-scd/commits/9875644e123cd2af7cc35a0db9ce7fcd8e3af6d9))
* **wizarding:** update wizard-dialog on editor-action ([47d262c](https://github.com/openscd/open-scd/commits/47d262ce274eb3319e0ffbf520db158bbb60f342))


### Bug Fixes

* **editing:** fix empty array check ([5058052](https://github.com/openscd/open-scd/commits/505805252959dfa95e916d11a9e94e9a7f21b2eb))
* **editing:** stop logging failed actions ([611d29f](https://github.com/openscd/open-scd/commits/611d29f162e1af0ad3aa0094d1e4cc74a8e4e742))
* **editors/communication:** update to new WizardAction API ([300f9ac](https://github.com/openscd/open-scd/commits/300f9ac46e842d599274cea5ae1364098afd7d01))
* **editors/styling:** add abbrevaition style ([#138](https://github.com/openscd/open-scd/issues/138)) ([377f389](https://github.com/openscd/open-scd/commits/377f3894bd2b4a86ed9e68ec29a83bfdec678f93))
* **editors/subnetwork:** update to new WizardAction API ([9490129](https://github.com/openscd/open-scd/commits/949012900d4989356d9d6fac52edea2542a0c3ff))
* **editors/substation/conducting-equipment:** overlapping icon buttons ([#140](https://github.com/openscd/open-scd/issues/140)) ([1d2f301](https://github.com/openscd/open-scd/commits/1d2f30111f755203ff460d17dadfce7ee2f09974))
* **editors/templates:** add missing translations ([f005e1a](https://github.com/openscd/open-scd/commits/f005e1a38c4c88f4be08159a5f38605aa1387352))
* **editors/templates:** decouple foundation from substation editor ([6948d2c](https://github.com/openscd/open-scd/commits/6948d2cd38d00a5db9f78385442c4bfaac361db0))
* **editors/templates/enum:** add updateIDNamingAction to editor foundation ([3a30d86](https://github.com/openscd/open-scd/commits/3a30d8697e1cff47bff1ef3a4593ada6e83ef076))
* **editors/templates/enum:** fix names and translations ([3f54a72](https://github.com/openscd/open-scd/commits/3f54a72fe483ea92539300d2ca4b63597fb142e1))
* **editors/templates/enum-type:** remove debug logging statements ([fb09f73](https://github.com/openscd/open-scd/commits/fb09f73ab43bc78a83899105852686b9c85bff0b))
* **editors/templates/enum-val:** harden Actions against empty ord ([86c5de9](https://github.com/openscd/open-scd/commits/86c5de903c4a5ba95aa5551111aa2f27d55d2bda))
* **json/plugins:** correct SubscriberInfo plugin path ([c1ee2a0](https://github.com/openscd/open-scd/commits/c1ee2a0db51c9aa751e9deb5a86dd9985fbcc175))
* **lnodewizard:** client lns saved with empty string instead of Client LN ([#131](https://github.com/openscd/open-scd/issues/131)) ([85059ff](https://github.com/openscd/open-scd/commits/85059ff40e8dc81ffef8729d0fffd3c2efdb23b3))
* **logging:** do not log results of long running processes twice ([#137](https://github.com/openscd/open-scd/issues/137)) ([0239760](https://github.com/openscd/open-scd/commits/023976004cb8a86fe478c56550598d0b618fd55e))
* **open-scd:** move service worker registration to index.html ([1e1254f](https://github.com/openscd/open-scd/commits/1e1254fe1519fcb256da765e2254ab526673994c))
* **templates.scd:** remove superfluous standalone ([6ce1e42](https://github.com/openscd/open-scd/commits/6ce1e42749fb1c4c524e0db736ed51fbb8cd10dc))
* **translations:** add enum-editor translations ([b61648e](https://github.com/openscd/open-scd/commits/b61648ed4a20817dff5ada6b9bfcb7a03d2c090e))
* **validating:** remove karma testing hack ([c9c62b0](https://github.com/openscd/open-scd/commits/c9c62b03c1d667a72db6def083ca24c53fc7d780))
* **validating,schemas:** fix schema selection logic ([c9d4e2e](https://github.com/openscd/open-scd/commits/c9d4e2e0d5292dff051c3190d468402db8d80f6a))
* **wizard-dialog:** reset pageIndex on updated wizard ([2658c09](https://github.com/openscd/open-scd/commits/2658c09482219ac3daa0406eb6fa8a7b663b04ad))
* **wizard-dialog:** show new dialog on wizard change ([fdbe081](https://github.com/openscd/open-scd/commits/fdbe0810135a40320714b4a667330b45ddcb0e1e))

### 0.0.1 (2021-02-19)


### Features

* **logging:** add tooltip to make long string readable ([#85](https://github.com/openscd/open-scd/issues/85)) ([34ed4b4](https://github.com/openscd/open-scd/commits/34ed4b4e49b0cd0169b6c714a03a5b349fdd491f))
* **open-scd:** activate 'validate' button ([9e16d81](https://github.com/openscd/open-scd/commits/9e16d81c8d26c8528fa18b52d25a849aceefc51c))
* **open-scd:** add project handling including landing dialog ([5776cfa](https://github.com/openscd/open-scd/commits/5776cfad70296ad34df63acba29c94845700771f))
* **open-scd:** add project handling including landing dialog ([#73](https://github.com/openscd/open-scd/issues/73)) ([0c9a12b](https://github.com/openscd/open-scd/commits/0c9a12b09ac14f15dcb1ff000f64805540d1bab4)), closes [#74](https://github.com/openscd/open-scd/issues/74)
* **open-scd:** add save functionality ([#54](https://github.com/openscd/open-scd/issues/54)) ([bb9a967](https://github.com/openscd/open-scd/commits/bb9a967111a12e3ddba46af5fe3798f76f6e1bcd))
* **open-scd:** remove landing dialog around buttons ([#74](https://github.com/openscd/open-scd/issues/74)) ([628d825](https://github.com/openscd/open-scd/commits/628d82520d8799e72609c4d1ac910ac427d334cf))
* **schemas:** add schemas for editor1 and edition 2.1 ([#71](https://github.com/openscd/open-scd/issues/71)) ([0d6f2d3](https://github.com/openscd/open-scd/commits/0d6f2d325eed49ba7d3d1afd96736e9e31ab5898))
* **substation/editors:** add tooltip to header icon buttons ([#69](https://github.com/openscd/open-scd/issues/69)) ([bf7931c](https://github.com/openscd/open-scd/commits/bf7931c68cdad17136af1bac4835b04bf4aaacb9))


### Bug Fixes

* **conducting-equipment-editor:** center name the conducting equipment ([#63](https://github.com/openscd/open-scd/issues/63)) ([8fddba2](https://github.com/openscd/open-scd/commits/8fddba29d24b0aa6a7c9ab57430c649cf5e0863a))
* **conducting-equipment-editor:** type select field shows all choices ([#65](https://github.com/openscd/open-scd/issues/65)) ([1e2f04b](https://github.com/openscd/open-scd/commits/1e2f04bb7fb35d3685f0ccd86c5075f7c731bbb2))
* **editors/substation:** pass correct reference in Delete Action ([0540a93](https://github.com/openscd/open-scd/commits/0540a93b3f5b30e30f0088e3a4aa6a9f1a96d93f))
* **laclization:** fix spelling error in en.ts ([a666a6d](https://github.com/openscd/open-scd/commits/a666a6d75822791a7dc4f6f864fa0bbc39407050))
* **lnodewizard:** add info if no IEDs loaded to the project ([f6ba177](https://github.com/openscd/open-scd/commits/f6ba17763a1d33494399393455cf84e0b12c51fd))
* **open-scd:** adjust spacing and styling ([928de3c](https://github.com/openscd/open-scd/commits/928de3cb6d554af3d5f3019360f4c5bda68d8dfe))
* **open-scd:** fix radio list item alignment ([bb6b23d](https://github.com/openscd/open-scd/commits/bb6b23d9f228c7067cd5e7243dc2a4c09d446220))
* **open-scd:** improve start page layout ([3301dde](https://github.com/openscd/open-scd/commits/3301dde42b08b3daccec34cc5c5a4ea2ccf8fc70))
* **substaiton/editors:** delete tailingIcon from desc and name textfield ([#66](https://github.com/openscd/open-scd/issues/66)) ([8f48a85](https://github.com/openscd/open-scd/commits/8f48a8580d55f98c48936ebfc46b378ce613c2b5))
* **substation/editors:** desc textfield default empty string ([#64](https://github.com/openscd/open-scd/issues/64)) ([d5d2973](https://github.com/openscd/open-scd/commits/d5d297380d6a6a49364ea81d62f46d5ab0fb8f8a))
* **themes:** add list-item text colors ([#122](https://github.com/openscd/open-scd/issues/122)) ([fbcf6d3](https://github.com/openscd/open-scd/commits/fbcf6d3931f1ae031c06c466b1038645e72fab4c)), closes [#80](https://github.com/openscd/open-scd/issues/80)
* **wizard-textfield:** reset custom validity ([#48](https://github.com/openscd/open-scd/issues/48)) ([f6fdc48](https://github.com/openscd/open-scd/commits/f6fdc48079880abe294b1017f6def4e2a0eb065f))
