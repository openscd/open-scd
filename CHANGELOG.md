# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.1](https://github.com/openscd/open-scd/compare/v0.4.0...v0.4.1) (2021-07-02)


### Bug Fixes

* **help:** wrong plugin name in plugin.js for help ([7301d28](https://github.com/openscd/open-scd/commits/7301d28badd463ddd8c2111833b9588743b840c1))

## [0.4.0](https://github.com/openscd/open-scd/compare/v0.3.0...v0.4.0) (2021-07-02)


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
