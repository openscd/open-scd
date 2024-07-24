# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.34.0](https://github.com/openscd/open-scd/compare/open-scd-v0.33.1...open-scd@v0.34.0) (2024-01-10)


### ✨ Features

* **104:** added descriptions to control ti numbers ([#1400](https://github.com/openscd/open-scd/issues/1400)) ([758a3b8](https://github.com/openscd/open-scd/commit/758a3b887b75b1eabdda7add0b3abf4cbe2df949))
* **104:** added descriptions to ti numbers ([#1378](https://github.com/openscd/open-scd/issues/1378)) ([0e74294](https://github.com/openscd/open-scd/commit/0e742944e4e834c515488ad1f75cecf88d234a8a))
* added acd as a supported cdc type ([#1371](https://github.com/openscd/open-scd/issues/1371)) ([5ee353c](https://github.com/openscd/open-scd/commit/5ee353cf85e61ce9edd6f48268d198adfdc3f0b2))
* added acd as a supported ens type ([#1384](https://github.com/openscd/open-scd/issues/1384)) ([cebcd37](https://github.com/openscd/open-scd/commit/cebcd37ecbc0230561018c4bb2a8c5e58de3b807))


### 🐞 Bug Fixes

* **104:** change options between different tis when selecting a doi ([#1380](https://github.com/openscd/open-scd/issues/1380)) ([cb80080](https://github.com/openscd/open-scd/commit/cb800808e9679e673e987038678e4c9f2da9fdf3))


### 📦 Miscellaneous Chores

* **104:** validate IOA number in address-wizard ([#1370](https://github.com/openscd/open-scd/issues/1370)) ([dff67ba](https://github.com/openscd/open-scd/commit/dff67ba53eb740f912f51dbae21d83a41e1c3332))
* add await in front of snapshot comparison ([#1395](https://github.com/openscd/open-scd/issues/1395)) ([7edd551](https://github.com/openscd/open-scd/commit/7edd55197e611ef7d2e7a333eea1bda30bd04cc0))
* Added additional properties ([#1369](https://github.com/openscd/open-scd/issues/1369)) ([754c301](https://github.com/openscd/open-scd/commit/754c3019a71b8c23a4fc166bfa557d6405d892e2))

## [0.33.0](https://github.com/openscd/open-scd/compare/v0.32.0...v0.33.0) (2023-06-22)


### Features

* **openscd:** Move progress indicator beneath plugin tabs ([#1181](https://github.com/openscd/open-scd/issues/1181)) ([a7a7081](https://github.com/openscd/open-scd/commits/a7a7081a32ee14998d0ead75ffb89ba2726631f8)), closes [#1178](https://github.com/openscd/open-scd/issues/1178)


### Bug Fixes

* **editing:** use editCount property for change propagation ([#1233](https://github.com/openscd/open-scd/issues/1233)) ([548f63b](https://github.com/openscd/open-scd/commits/548f63b5b35dac6772230004e6ca7859cf3337b8))
* escaped symbols in regex patterns ([#1266](https://github.com/openscd/open-scd/issues/1266)) ([de2dd0d](https://github.com/openscd/open-scd/commits/de2dd0dc2351c8feb6a70da62e43640334df571b))
* goose subscription reflects state incorrectly ([#1261](https://github.com/openscd/open-scd/issues/1261)) ([4440bff](https://github.com/openscd/open-scd/commits/4440bff63c0ebe816a9fdc25f8af6da1ca6645f4))

## [0.31.0](https://github.com/openscd/open-scd/compare/v0.30.0...v0.31.0) (2023-05-02)


### Features

* **editors/binding:** Allow filtering of subscribed/unsubscribed data in binding editors ([#1149](https://github.com/openscd/open-scd/issues/1149)) ([874be45](https://github.com/openscd/open-scd/commits/874be4518c7574846abbaed4cf597c779c747d5e)), closes [#1062](https://github.com/openscd/open-scd/issues/1062)

## [0.30.0](https://github.com/openscd/open-scd/compare/v0.29.0...v0.30.0) (2023-03-08)


### Features

* **editors/ied:** show all instantiated setting group values ([#1155](https://github.com/openscd/open-scd/issues/1155)) ([d9680fa](https://github.com/openscd/open-scd/commits/d9680fa1195650aeef6a5ec0290ec6cc321303ef))
* **editors/subscription:** Support valKind and valImport on first instances, improve instance use counting and allow Val updates ([#1169](https://github.com/openscd/open-scd/issues/1169)) ([aaab451](https://github.com/openscd/open-scd/commits/aaab451ca01bcd29b1bb2dc73299a0b171b30389)), closes [#1161](https://github.com/openscd/open-scd/issues/1161) [#1162](https://github.com/openscd/open-scd/issues/1162)
* **wizards/services:** add read-only wizard on access point and ied ([#1109](https://github.com/openscd/open-scd/issues/1109)) ([81088f0](https://github.com/openscd/open-scd/commits/81088f06bbae8ca022525fe29d59589ba87647a9))


### Bug Fixes

* added translation key for phase ([#1186](https://github.com/openscd/open-scd/issues/1186)) ([479c499](https://github.com/openscd/open-scd/commits/479c49991a2f4e3e0b70ddd39e90deda3ec935ec))
* **editors/substation/guess-wizard:** make sure guessed content is added to the substation ([#1148](https://github.com/openscd/open-scd/issues/1148)) ([cc0051f](https://github.com/openscd/open-scd/commits/cc0051f54a89984af9676ed2209a0481f49fa7a2))
* **menu/save-project:** Add missing XML prolog on document save ([#1173](https://github.com/openscd/open-scd/issues/1173)) ([6cae0da](https://github.com/openscd/open-scd/commits/6cae0da557ef69029312a854e94bc5ecc9558909)), closes [#1163](https://github.com/openscd/open-scd/issues/1163)

## [0.29.0](https://github.com/openscd/open-scd/compare/v0.28.0...v0.29.0) (2023-02-08)


### Features

* **editors/later-binding:** Improve supervision visibility and remove clutter ([#1141](https://github.com/openscd/open-scd/issues/1141)) ([845d1a5](https://github.com/openscd/open-scd/commits/845d1a5200e54b1d7e2a470604b553c519d5f6dd)), closes [#1024](https://github.com/openscd/open-scd/issues/1024) [#1037](https://github.com/openscd/open-scd/issues/1037)
* **editors/laterbinding:** Filter later binding GOOSE/SMV by serviceType (closes [#1150](https://github.com/openscd/open-scd/issues/1150)) ([#1151](https://github.com/openscd/open-scd/issues/1151)) ([ea59f70](https://github.com/openscd/open-scd/commits/ea59f702546f1b9186054d77ec61f4ca57de5b10))
* **editors/substation/transformerwinding:** add remove button  ([#1157](https://github.com/openscd/open-scd/issues/1157)) ([a01e0ed](https://github.com/openscd/open-scd/commits/a01e0ed5f1e34cc93a041c57400ae306db5228e4))
* **general-equipment-editor:** add remove button ([#1107](https://github.com/openscd/open-scd/issues/1107)) ([b3def87](https://github.com/openscd/open-scd/commits/b3def87e33d9a47a9bfb8872b35161e59ded4a80))
* **substation/transformerwinding:** add create wizard ([#1154](https://github.com/openscd/open-scd/issues/1154)) ([51e19a7](https://github.com/openscd/open-scd/commits/51e19a75d3cadaf9c61969a54e0a67d9e9fd1fda))
* **wizards/generalequipment:** Add_create_wizard_GeneralEquipment_and_test ([#1102](https://github.com/openscd/open-scd/issues/1102)) ([2d1464f](https://github.com/openscd/open-scd/commits/2d1464fa3446d459aa411f82080241ebf0ff379a))
* **wizards/transformerwinding:** add edit wizard ([#1137](https://github.com/openscd/open-scd/issues/1137)) ([cf65a50](https://github.com/openscd/open-scd/commits/cf65a50366cb0659c3a510e3664ea4226c4c26d4))


### Bug Fixes

* add missing code editor to edit wizards ([#1136](https://github.com/openscd/open-scd/issues/1136)) ([2171569](https://github.com/openscd/open-scd/commits/2171569a9885cd105804cf342906799e678f8009))
* close menu after open project ([#1111](https://github.com/openscd/open-scd/issues/1111)) ([0e047a3](https://github.com/openscd/open-scd/commits/0e047a377f0eedd81996da24c5da80c9b67cbee3))
* **editors/cleanup:** quote input in selector of control blocks cleanup editor, closes [#1145](https://github.com/openscd/open-scd/issues/1145)  ([ae26764](https://github.com/openscd/open-scd/commits/ae26764c5be29667114e35fb6ac1e16f5e3704a4))
* **ieds-import:** multiple IEDs import ([#1103](https://github.com/openscd/open-scd/issues/1103)) ([af0f5a3](https://github.com/openscd/open-scd/commits/af0f5a3f4c2648a9538ce7c7e6eca5a73746b784))
* opened menu cut off ([#1125](https://github.com/openscd/open-scd/issues/1125)) ([0c3bd0c](https://github.com/openscd/open-scd/commits/0c3bd0c838c75a6ef9ca575894bbc410a40ac36f))
* styling issue with SubEquipment editor ([#1130](https://github.com/openscd/open-scd/issues/1130)) ([d0e9657](https://github.com/openscd/open-scd/commits/d0e96572f3d57c84674f12d2eeeca93afbe667ad))

## [0.28.0](https://github.com/openscd/open-scd/compare/v0.27.0...v0.28.0) (2022-11-30)


### Features

* **editor/subscription:** add supervision indication ([#1082](https://github.com/openscd/open-scd/issues/1082)) ([8ebac53](https://github.com/openscd/open-scd/commits/8ebac53bbf86b86e6b8cdb9d79b28957d4a7b5fc)), closes [#1037](https://github.com/openscd/open-scd/issues/1037)
* **editors/substation:** Add read-only transformer winding editor ([#1073](https://github.com/openscd/open-scd/issues/1073)) ([e57b5c2](https://github.com/openscd/open-scd/commits/e57b5c20ae3117a971d8b0b2854281c05f034ef5))
* **editors/substation:** redirect LNode's on clone ([#1079](https://github.com/openscd/open-scd/issues/1079)) ([cfd16d6](https://github.com/openscd/open-scd/commits/cfd16d66e2efe13930d3537486750b8bc46b3d87))
* **menu/exportCommunication:** Allow XML export of communication section  ([#1044](https://github.com/openscd/open-scd/issues/1044)) ([e4d4e24](https://github.com/openscd/open-scd/commits/e4d4e2414c2f3e9fafe82d9e634772f7d14d0236)), closes [#1042](https://github.com/openscd/open-scd/issues/1042)
* **substation/general-equipment-editor:** edit wizard ([#1089](https://github.com/openscd/open-scd/issues/1089)) ([95ba5ab](https://github.com/openscd/open-scd/commits/95ba5aba9df7348da92011c2f091b0b2b317260b))


### Bug Fixes

* **menu/importieds:** import TEMPLATE IEDs with Communication section ([#1075](https://github.com/openscd/open-scd/issues/1075)) ([013bfa5](https://github.com/openscd/open-scd/commits/013bfa53a6524fc62a755320fa81d86c3573a523)), closes [#1074](https://github.com/openscd/open-scd/issues/1074)
* **menu/importieds:** Transfer namespaces to document element for ied import ([#1081](https://github.com/openscd/open-scd/issues/1081)) ([eccc3fc](https://github.com/openscd/open-scd/commits/eccc3fc0d39e926176e9177058385851ab4f8f35)), closes [#1060](https://github.com/openscd/open-scd/issues/1060)
* **plain-compare-list:** swap list relations ([#1096](https://github.com/openscd/open-scd/issues/1096)) ([9fbfbcd](https://github.com/openscd/open-scd/commits/9fbfbcd0880b6d68ee892614e302bb298571c059))

## [0.27.0](https://github.com/openscd/open-scd/compare/v0.26.0...v0.27.0) (2022-11-21)


### Features

* **editor/substation:** Add read-only view for General Equipment ([#1050](https://github.com/openscd/open-scd/issues/1050)) ([d3baa74](https://github.com/openscd/open-scd/commits/d3baa7479eeb54121e975cc1a89038c0769acade))
* **editors/subscription:** add subscription supervision support ([#1010](https://github.com/openscd/open-scd/issues/1010)) ([3f6b659](https://github.com/openscd/open-scd/commits/3f6b6597bfeb854a1a96e6cbff8044526a6c7f5f))
* **sub-equipment-editor:** edit wizard ([#1063](https://github.com/openscd/open-scd/issues/1063)) ([4778e7d](https://github.com/openscd/open-scd/commits/4778e7d4146c4ce7f8a26bbf953f8494d56cd32a))

## [0.26.0](https://github.com/openscd/open-scd/compare/v0.25.0...v0.26.0) (2022-11-03)


### Features

* **editor/substation:** read-only editor for SubEquipment element ([#1030](https://github.com/openscd/open-scd/issues/1030)) ([f6e96b5](https://github.com/openscd/open-scd/commits/f6e96b5d2bbb5014b4951299e55ae1462b9b1c33))
* **editors/subscriber/later-binding:** add input requirement check ([#1049](https://github.com/openscd/open-scd/issues/1049)) ([26f7fe5](https://github.com/openscd/open-scd/commits/26f7fe56ecbc216495ddb747e75fb28d002f9447))


### Bug Fixes

* **Editing:** set false attribute values on update ([#899](https://github.com/openscd/open-scd/issues/899)) ([0b414e1](https://github.com/openscd/open-scd/commits/0b414e1687f9a796e7ec161237ad1ab78f04e87e))
* **editor/subscriber:** filtering on FCDAs retains the parent ([#1048](https://github.com/openscd/open-scd/issues/1048)) ([d5f8bb7](https://github.com/openscd/open-scd/commits/d5f8bb7ed8ceeb9c2ca14a91d3624afda7a43513))
* **Logging:** broken toggle button styling ([81da900](https://github.com/openscd/open-scd/commits/81da900c5d3850143961c23e197e19fb2cb02ad1))
* **validate-schema:** cache validator workers ([#901](https://github.com/openscd/open-scd/issues/901)) ([2de7d26](https://github.com/openscd/open-scd/commits/2de7d269b15012af84927de90689e95ca901d05a))

## [0.25.0](https://github.com/openscd/open-scd/compare/v0.24.0...v0.25.0) (2022-10-17)


### Features

* **editor/subscriber:** Added plugin for Subscriber Logical Nodes (GOOSE/SMV) ([#1036](https://github.com/openscd/open-scd/issues/1036)) ([971f0c1](https://github.com/openscd/open-scd/commits/971f0c10d112b4c68791daa1aada2c94cbc3b20b))
* **editor/subscriber:** Show counter for Subscriber Plugins (Logical Nodes / Later) (GOOSE/SMV) ([#1040](https://github.com/openscd/open-scd/issues/1040)) ([02ec714](https://github.com/openscd/open-scd/commits/02ec714e7ac44204a972b55a872e0445eab66e72))
* **editor/subscriber:** Subscribe and unsubscribe for Subscriber Logical Nodes (GOOSE/SMV) ([#1039](https://github.com/openscd/open-scd/issues/1039)) ([1c55aed](https://github.com/openscd/open-scd/commits/1c55aede2f89eb85a069b213a6a4ea709e171b02))
* **editors/communication:** add GSE and SMV editor type elements ([#1021](https://github.com/openscd/open-scd/issues/1021)) ([81487c1](https://github.com/openscd/open-scd/commits/81487c184d610def07fec4a8919f9be8f133c730))
* **filter-button:** Added option to disable filter button ([205449b](https://github.com/openscd/open-scd/commits/205449b019f31c4b412e8e41379133f2846478c3))
* **filtered-list:** Add ? and * wildcards to filtered-search, closes [#1006](https://github.com/openscd/open-scd/issues/1006). ([#1007](https://github.com/openscd/open-scd/issues/1007)) ([48ef7ea](https://github.com/openscd/open-scd/commits/48ef7ea26d772573027f9627612fb56e3a982d67))
* **wizard/connectedap:** auto create GSE and SMV elements ([#1019](https://github.com/openscd/open-scd/issues/1019)) ([984652a](https://github.com/openscd/open-scd/commits/984652ae435729b20b3939624e1b88924684454b))


### Bug Fixes

* **editors/later-binding:** Resolve absent prefix in ExtRef for later binding subscription ([#1026](https://github.com/openscd/open-scd/issues/1026)) ([31fd177](https://github.com/openscd/open-scd/commits/31fd1777eebce8ff5627d70559127d2458915571)), closes [#1005](https://github.com/openscd/open-scd/issues/1005)
* **editors/subscriber-later-binding:** Add GOOSE icon to later binding editor, closes [#1017](https://github.com/openscd/open-scd/issues/1017) ([#1022](https://github.com/openscd/open-scd/issues/1022)) ([49e9007](https://github.com/openscd/open-scd/commits/49e9007d072bd2832fcfc513c2b592d91543f4ff))
* **menu/importieds:** allow import to new projects ([#1012](https://github.com/openscd/open-scd/issues/1012)) ([216226c](https://github.com/openscd/open-scd/commits/216226c0a8497b048ff6d1dc3c9e6157c9a67eec))

## [0.24.0](https://github.com/openscd/open-scd/compare/v0.23.0...v0.24.0) (2022-09-19)


### Features

* **editor/ied:** Filter for logical nodes ([#990](https://github.com/openscd/open-scd/issues/990)) ([629cbcc](https://github.com/openscd/open-scd/commits/629cbcc2590b22c052e16778c919ac365a2886c6))
* **editors/subscriber-later-binding:** Show connected and available ExtRef on FCDA selection (GOOSE) ([#995](https://github.com/openscd/open-scd/issues/995)) ([d88b7d2](https://github.com/openscd/open-scd/commits/d88b7d24cd50682cca4eb39e37f547fcc6702ce0))
* **menu/compareied:** Compare View redesign to make it more clear ([#996](https://github.com/openscd/open-scd/issues/996)) ([342c30f](https://github.com/openscd/open-scd/commits/342c30ff826c10ff54ae9205f12841f7b02824c6))


### Bug Fixes

* **editors/plugin:** disable read-only inputs ([#1000](https://github.com/openscd/open-scd/issues/1000)) ([e399e7e](https://github.com/openscd/open-scd/commits/e399e7e3685ad0ee5fee351eed0f53703a0f6528))

## [0.23.0](https://github.com/openscd/open-scd/compare/v0.22.0...v0.23.0) (2022-09-05)


### Features

* **editors/cleanup:** Support DataTypeTemplates ([#701](https://github.com/openscd/open-scd/issues/701)) ([1db5169](https://github.com/openscd/open-scd/commits/1db5169b2139f4fa1b423f7f13b7609af3e0e058)), closes [#910](https://github.com/openscd/open-scd/issues/910)
* **editors/subscriber-later-binding:** Add plugin with filterable FCDA list ([#945](https://github.com/openscd/open-scd/issues/945)) ([758da72](https://github.com/openscd/open-scd/commits/758da723193b069ca5772a9be25c4fc39659713b))
* **wizard/dai:** Set/Update a value for a type 'Timestamp' of Data Attribute Instance ([#959](https://github.com/openscd/open-scd/issues/959)) ([4d52a9a](https://github.com/openscd/open-scd/commits/4d52a9a3e3aee64ee695606b046b85afdbddb2a8))

## [0.22.0](https://github.com/openscd/open-scd/compare/v0.21.0...v0.22.0) (2022-08-22)


### Features

* **editor/laterbinding:** Added first part for SMV Later Binding Editor ([#927](https://github.com/openscd/open-scd/issues/927)) ([5bfc3aa](https://github.com/openscd/open-scd/commits/5bfc3aa5f5e91c8a313875beb6b225a81f88f663))
* **editor/laterbinding:** Show connected and available ExtRef Element from selected FCDA Element ([#941](https://github.com/openscd/open-scd/issues/941)) ([d06d0b4](https://github.com/openscd/open-scd/commits/d06d0b463a5cc150bfdf1d9ea24739c8f96d3f4f))
* **editor/laterbinding:** Subscribe and unsubscribe from ExtRef for Later Binding (SMV) ([#944](https://github.com/openscd/open-scd/issues/944)) ([b25f9a6](https://github.com/openscd/open-scd/commits/b25f9a67d541583678a19f5a5a211cc8ef5d0d2a))
* **menu/compareied:** ignore attributes/elements when comparing IED Elements ([#926](https://github.com/openscd/open-scd/issues/926)) ([7e25149](https://github.com/openscd/open-scd/commits/7e2514929d3997f598990d41a01696e567b5d6a6))
* **menu/history:** move history from log to own menu plugin ([30d568f](https://github.com/openscd/open-scd/commits/30d568fd7596df307f301170b96a74b47af5053a))

## [0.21.0](https://github.com/openscd/open-scd/compare/v0.20.0...v0.21.0) (2022-08-08)


### Features

* **editors/publisher:** add read only gse-control-element-editor ([#917](https://github.com/openscd/open-scd/issues/917)) ([2aee3cc](https://github.com/openscd/open-scd/commits/2aee3ccb78cbe1c18a2b55769b130e196bc45869))
* **editors/publisher:** add sampled-value-control-element-editor ([#920](https://github.com/openscd/open-scd/issues/920)) ([e95dfc5](https://github.com/openscd/open-scd/commits/e95dfc509b710dafc53f2980f5ac93e303cc995d))
* **plugin:** add read-only report-control-element-editor ([#913](https://github.com/openscd/open-scd/issues/913)) ([21732c9](https://github.com/openscd/open-scd/commits/21732c984c5af0e1a31424f3485cb98ccaa70f6a))


### Bug Fixes

* **editors/cleanup:** Fix filter issue with in cleanup plugin ([#910](https://github.com/openscd/open-scd/issues/910)) ([92e7390](https://github.com/openscd/open-scd/commits/92e7390a9cfb42d25858578b71bf935304cc4691))

## [0.20.0](https://github.com/openscd/open-scd/compare/v0.19.0...v0.20.0) (2022-07-31)


### Features

* **editors/publisher:** add read only data set element editor ([#911](https://github.com/openscd/open-scd/issues/911)) ([45b5440](https://github.com/openscd/open-scd/commits/45b5440970b515e6d344f53f851c974267eaf961))
* **filtered-list:** filter on list item value ([#876](https://github.com/openscd/open-scd/issues/876)) ([9d7916b](https://github.com/openscd/open-scd/commits/9d7916bc684b338a076a84060ae317e4bf00cb83))
* **menu/compareied:** compares two IED elements with one another ([#903](https://github.com/openscd/open-scd/issues/903)) ([cb07c07](https://github.com/openscd/open-scd/commits/cb07c071a554ee46780472566f2cfe5fa4b7dd10))


### Bug Fixes

* Adding Subnetwork to a configuration without a Communication Element failed for the first time ([c1d2086](https://github.com/openscd/open-scd/commits/c1d2086ec5b12edef0b3c16e3e1855cf40fbf7b3))
* Adding Subnetwork to a configuration without a Communication Element failed for the first time ([4af30c2](https://github.com/openscd/open-scd/commits/4af30c29765a3658b25d639bac6133ca1fd8595a))
* Adding Subnetwork to a configuration without a Communication Element failed for the first time ([617e72d](https://github.com/openscd/open-scd/commits/617e72d210869450611f5c8c75a41dbc2b6be9d1))
* Adding Subnetwork to a configuration without a Communication Element failed for the first time ([5a8e659](https://github.com/openscd/open-scd/commits/5a8e6592dd5e2e8410c4e5e949f66b8e3890bf99))
* **editing:** don't validate after no-op action ([#889](https://github.com/openscd/open-scd/issues/889)) ([b93dab2](https://github.com/openscd/open-scd/commits/b93dab2a3367807959fd4fe7fe33f5ce99bfea41))
* **editing:** wait for new doc before validating ([#879](https://github.com/openscd/open-scd/issues/879)) ([1548282](https://github.com/openscd/open-scd/commits/1548282e124285b1cfd4bdaf1e58d8b815ff93bd))
* **editor/104:** Small improvements and fix. ([#874](https://github.com/openscd/open-scd/issues/874)) ([eb22280](https://github.com/openscd/open-scd/commits/eb222802b70162c7748938b593b15dd35312b96c))
* **editor/ied:** fixed styling how DA(I) values are displayed. ([#872](https://github.com/openscd/open-scd/issues/872)) ([7a12d77](https://github.com/openscd/open-scd/commits/7a12d77447fcf2f24a8b7f3e2549ce1626f41774))
* **editor/SingleLineDiagram:** Fixed redrawing when new document loaded ([ccd8ff0](https://github.com/openscd/open-scd/commits/ccd8ff031ac73d9882a98a8a3d80b940e31cf84b))
* **editor/substation:** Updated IED name is shown in IED container ([cff0bb7](https://github.com/openscd/open-scd/commits/cff0bb71a9a0cc404115ec52fd4302921bc45f35))
* **editors/substation:** make sure add new child menu always open its create wizard ([#912](https://github.com/openscd/open-scd/issues/912)) ([ed0e71d](https://github.com/openscd/open-scd/commits/ed0e71d5579cfc539036adc6120ae62a4d763ab6))
* **menu/importieds:** Accept multiple IEDs from same file in import IEDs. Closes [#897](https://github.com/openscd/open-scd/issues/897) ([#900](https://github.com/openscd/open-scd/issues/900)) ([44b4f87](https://github.com/openscd/open-scd/commits/44b4f87c64ef1311fcfa8cbd6f9771301dd5be19))
* **mergeWizard:** insert element at valid position ([#888](https://github.com/openscd/open-scd/issues/888)) ([027462c](https://github.com/openscd/open-scd/commits/027462cedaa419c2832741563721d5b8d9c49652))

## [0.19.0](https://github.com/openscd/open-scd/compare/v0.18.0...v0.19.0) (2022-07-11)


### Features

* **editors/publisher:** filter for control blocks and DataSets ([#844](https://github.com/openscd/open-scd/issues/844)) ([4c663d0](https://github.com/openscd/open-scd/commits/4c663d0374129894eb61168404e0d47aab28694f))
* **editors:** Show label of Action Pane also as tool-tip ([#838](https://github.com/openscd/open-scd/issues/838)) ([492778f](https://github.com/openscd/open-scd/commits/492778ff02812a06e96df775f1040f96b24642be))
* **menu/VirtualTemplateIED:** automatically create virtual IEDs ([#806](https://github.com/openscd/open-scd/issues/806)) ([dc59736](https://github.com/openscd/open-scd/commits/dc59736111c73450cebb3b1f9963886f3dc94d90))


### Bug Fixes

* **editor/subscriber:** make sure to add all mendatory attributes to ExtRef ([b814c00](https://github.com/openscd/open-scd/commits/b814c007514e18f1aacb6698eb2c747459d6f5da))
* **editors/substation:** update on action ([#852](https://github.com/openscd/open-scd/issues/852)) ([7af5b5c](https://github.com/openscd/open-scd/commits/7af5b5c2e74841cb75629b10f1349dd96ae86ab2))
* **editors/template:** make sure that edit wizards are always opened ([#845](https://github.com/openscd/open-scd/issues/845)) ([15c2d3b](https://github.com/openscd/open-scd/commits/15c2d3b08c1d2ef20e0b7e239c1e0a6056ed4d30))
* **Pluggin/Hosting:** allow using own dialogs in menu plugins ([#843](https://github.com/openscd/open-scd/issues/843)) ([a9bad36](https://github.com/openscd/open-scd/commits/a9bad366bec77060a1f4efa4622a3d5b356753fc))

## [0.18.0](https://github.com/openscd/open-scd/compare/v0.17.0...v0.18.0) (2022-06-30)


### Features

* **104-plugin:** add some German translations ([5b0a43b](https://github.com/openscd/open-scd/commits/5b0a43bd7d438580007c52db7057b1cce4b55ba5))
* **104/values:** Added List of IEDs and 104-related DAI to values screen. ([adbc4a4](https://github.com/openscd/open-scd/commits/adbc4a4da06f9b5dadd27de686e70409ea86c57d))
* **editors/104:** Show/edit subnetworks without redundancy ([638fbf4](https://github.com/openscd/open-scd/commits/638fbf42ffa74eb63f83f5033dd25ddf32e04c5e))
* **plugins/SampledValues:** Switch publisher and subscriber in SV subscription editor ([a5ce813](https://github.com/openscd/open-scd/commits/a5ce813fb27c597b7f8bd8399b92c5d884ba1b5e))
* prevent losing data on user navigation ([#800](https://github.com/openscd/open-scd/issues/800)) ([8ffcbbb](https://github.com/openscd/open-scd/commits/8ffcbbb21263e70f43d791434d88a9e21641fc30))
* **wizards/ied:** added new textfields for IED properties  ([#822](https://github.com/openscd/open-scd/issues/822)) ([1cd6fb7](https://github.com/openscd/open-scd/commits/1cd6fb72b0ecae47106425ecff1b1d8523f7d50e))
* **wizards/sampledvaluecontrol:** add create wizard ([#744](https://github.com/openscd/open-scd/issues/744)) ([f510446](https://github.com/openscd/open-scd/commits/f510446da42d20b45c57b41c4463a663b6bc712d))


### Bug Fixes

* **communication:** display changes to ConnectedAPs in SubNetworks ([#819](https://github.com/openscd/open-scd/issues/819)) ([f082d20](https://github.com/openscd/open-scd/commits/f082d20871641f4819fc9623eb88d5b126bb5936))
* **editing:** reactively update after changes to doc ([#814](https://github.com/openscd/open-scd/issues/814)) ([78e8f0f](https://github.com/openscd/open-scd/commits/78e8f0f655e039580e2c26f4d42517a6d40f3862))
* **iededitor:** Refreshing components after update IED or DAI Element ([67f5ed4](https://github.com/openscd/open-scd/commits/67f5ed43931c807b1f244f8cc5dd291919020abf))

## [0.17.0](https://github.com/openscd/open-scd/compare/v0.16.0...v0.17.0) (2022-05-30)


### Features

* **editor/substation/l-node-editor:** add remove button ([#771](https://github.com/openscd/open-scd/issues/771)) ([7966f0f](https://github.com/openscd/open-scd/commits/7966f0f383bee611b1f840f3222075b56dbe9498))
* **editors/substation:** add read-only l-node-editor ([#730](https://github.com/openscd/open-scd/issues/730)) ([ecfeb5d](https://github.com/openscd/open-scd/commits/ecfeb5d03a7b36493a10193541afbd3a2edd0e9a)), closes [#752](https://github.com/openscd/open-scd/issues/752)
* **editors/substation:** remove button to function type editors ([#761](https://github.com/openscd/open-scd/issues/761)) ([ce9dea1](https://github.com/openscd/open-scd/commits/ce9dea1ce9365ff115b14e1174166c466e884539))
* **editors/subtation:** allow instantiation of LNode from LNodeType's ([#766](https://github.com/openscd/open-scd/issues/766)) ([8ee23fc](https://github.com/openscd/open-scd/commits/8ee23fc8a5c3b3f9dfd57f4d445e9da744edd850))
* **wizards/function:** add create wizards for Function, SubFunction, EqFunction and EqSubFunction element ([#731](https://github.com/openscd/open-scd/issues/731)) ([774add7](https://github.com/openscd/open-scd/commits/774add7510c4b909fab4e0d09f173cf7d3726027)), closes [#733](https://github.com/openscd/open-scd/issues/733) [#737](https://github.com/openscd/open-scd/issues/737) [#757](https://github.com/openscd/open-scd/issues/757)
* **wizards/lnode:** add edit wizard ([#778](https://github.com/openscd/open-scd/issues/778)) ([965f10a](https://github.com/openscd/open-scd/commits/965f10a1d7a9c66fdc4e74265e265fdc950c3a09))
* **wizards/substation/l-node-editor:** add duplicate button ([#782](https://github.com/openscd/open-scd/issues/782)) ([7470e2d](https://github.com/openscd/open-scd/commits/7470e2d0f657002222d771243d4cb609649f5f80))
* **wizards:** add function type create wizards ([#768](https://github.com/openscd/open-scd/issues/768)) ([6e9c928](https://github.com/openscd/open-scd/commits/6e9c928bc09f7e05282d88c7967840e0b441d811)), closes [#762](https://github.com/openscd/open-scd/issues/762) [#763](https://github.com/openscd/open-scd/issues/763) [#764](https://github.com/openscd/open-scd/issues/764) [#765](https://github.com/openscd/open-scd/issues/765)


### Bug Fixes

* **menu/subscriberinfo:** fix lnInst attribute for lnClass LLN0 ([#749](https://github.com/openscd/open-scd/issues/749)) ([2f0bad9](https://github.com/openscd/open-scd/commits/2f0bad905cdc6450c1eec95d3c3a4755afb3098a))
* **wizard-diagram, wizard-select, wizard-checkbox:**  disabled attribute ([#781](https://github.com/openscd/open-scd/issues/781)) ([528db27](https://github.com/openscd/open-scd/commits/528db27992173630a22056e50bd7c56903a6a283))
* **wizards/conductingequipment:** on create earth switch add missing ground cNode ([#753](https://github.com/openscd/open-scd/issues/753)) ([8f89f27](https://github.com/openscd/open-scd/commits/8f89f27c6a66316c1b7941fa313ba85d08b1256d))

## [0.16.0](https://github.com/openscd/open-scd/compare/v0.15.0...v0.16.0) (2022-05-16)


### Features

* **editor/ied:** Add wizard/action to remove IED including references ([#732](https://github.com/openscd/open-scd/issues/732)) ([bba9b3c](https://github.com/openscd/open-scd/commits/bba9b3c7154a6e7d81a0776d10b1a41738bad388))
* **editor/ied:** Show the technical path to a DO/DA ([15c4f7b](https://github.com/openscd/open-scd/commits/15c4f7bd3124c4f734b00f1b52d579eec1c08d89))
* **editors/substation:** show read-only `EqFunction` and `EqSubFunction` ([#720](https://github.com/openscd/open-scd/issues/720)) ([52a49ce](https://github.com/openscd/open-scd/commits/52a49cec947332204ffb519c47ee4aca27b5af05)), closes [#722](https://github.com/openscd/open-scd/issues/722) [#726](https://github.com/openscd/open-scd/issues/726)
* **Subscription:** Add edit button or hyperlink to GSEControl dialog in the Subscription Editor ([5c19822](https://github.com/openscd/open-scd/commits/5c1982220504092e666ed177a05a295b2ce4130c))
* **Subscription:** Select by Subscriber in Subscriptions Editor ([b1f2d12](https://github.com/openscd/open-scd/commits/b1f2d1295343002dd440ef3b8cc369d168be456d))

## [0.15.0](https://github.com/openscd/open-scd/compare/v0.14.0...v0.15.0) (2022-05-02)


### Features

* **iededitor:** Added implementation to change enum values in IED Editor. ([865f7ab](https://github.com/openscd/open-scd/commits/865f7ab33f7361b8f481be2c47f77b0fe1f05e81))
* **substation:** read only Function and SubFunction container ([#700](https://github.com/openscd/open-scd/issues/700)) ([3d7b2ef](https://github.com/openscd/open-scd/commits/3d7b2ef5c4950d2341973bac70ae4a658a00f859)), closes [#706](https://github.com/openscd/open-scd/issues/706)
* **wizards/dai:** Change DAI values ([#687](https://github.com/openscd/open-scd/issues/687)) ([3689ef2](https://github.com/openscd/open-scd/commits/3689ef26253ba3c352f0bd758b9abdbc17fe9c33))
* **wizards/gsecontrol:** add create wizards ([#654](https://github.com/openscd/open-scd/issues/654)) ([887f46f](https://github.com/openscd/open-scd/commits/887f46f5e3bc885cfad1f9e18a2d5f58161fbb44))
* **wizards:** Changed label of rptID ([#697](https://github.com/openscd/open-scd/issues/697)) ([10f3f0b](https://github.com/openscd/open-scd/commits/10f3f0bdea05328838196914f62290e4ca6c76bc))


### Bug Fixes

* **wizard-dialog:** avoid header overlap with extra action buttons ([#703](https://github.com/openscd/open-scd/issues/703)) ([ffe7859](https://github.com/openscd/open-scd/commits/ffe7859b4d67873339658d1a216cc0a8dabfb687))
* **wizard-dialog:** remove initialFocus from action buttons ([#702](https://github.com/openscd/open-scd/issues/702)) ([a4783ab](https://github.com/openscd/open-scd/commits/a4783ab46e350e5ed1af64102bd3a78e95fc2c93))

## [0.14.0](https://github.com/openscd/open-scd/compare/v0.13.0...v0.14.0) (2022-04-21)


### Features

* **editors/cleanup:** remove unused control blocks ([#620](https://github.com/openscd/open-scd/issues/620)) ([e63f11f](https://github.com/openscd/open-scd/commits/e63f11f9e5e2130b273506eff2567ec31a890f57))
* **editors/Subscription:** When undo / redo actions Subscription / SMV plugin, lists are not refreshed ([7889be9](https://github.com/openscd/open-scd/commits/7889be93b7d8f76042cc08656392b83f1b82dada))


### Bug Fixes

* **editors/subscription:** several styling issues ([#661](https://github.com/openscd/open-scd/issues/661)) ([b9f5555](https://github.com/openscd/open-scd/commits/b9f5555c4c01c7ba29cfca12dd5f0b318abee861))
* **editors:** Changed selectors in Substation and IED Editors and updated IED and Substation Wizards. ([#671](https://github.com/openscd/open-scd/issues/671)) ([33b590a](https://github.com/openscd/open-scd/commits/33b590abdedca12d1029d950654d8d6673124e8f))
* **filtered-list:** allow filter nested list-item s ([#660](https://github.com/openscd/open-scd/issues/660)) ([1ea37c5](https://github.com/openscd/open-scd/commits/1ea37c5c490de52b538201d3a4fb39291b239771))

## [0.13.0](https://github.com/openscd/open-scd/compare/v0.11.0...v0.13.0) (2022-04-04)


### Features

* **Editing:** check globally for ID uniqueness ([c2b14fb](https://github.com/openscd/open-scd/commits/c2b14fb337adb9f55874dbb3add0aefda8622946))
* **editors/cleanup:** unreferenced DataSet ([#568](https://github.com/openscd/open-scd/issues/568)) ([edc133c](https://github.com/openscd/open-scd/commits/edc133cdecce61abf53d043bc45292d1a1a36c7c))
* **editors/subscriber:** use filtered lists ([#638](https://github.com/openscd/open-scd/issues/638)) ([f255bfb](https://github.com/openscd/open-scd/commits/f255bfb4f205239413f12f7c47e221e739cefdce))
* **editors/Substation:** Add PowerTransformer Components to Substation Editor ([22555b6](https://github.com/openscd/open-scd/commits/22555b6713c9f2c8e882269ffce9a826d016e87b))
* **editors/template/lnodetype-wizards:** make use of -7-420 NSD ([0a2d5a4](https://github.com/openscd/open-scd/commits/0a2d5a40c50d5a0cc66fd7c5b31f6493aa7c4600))
* **ied-editor/ln-node:** Changed description of LN Node in IED Editor ([#647](https://github.com/openscd/open-scd/issues/647)) ([9a655e8](https://github.com/openscd/open-scd/commits/9a655e88d1a8341ec56a83c6af540e77f4e9c280))
* **plugins/IED:** Add icon set to IED editor containers ([9878259](https://github.com/openscd/open-scd/commits/9878259665be2e34bd99dd1d5f72c1944b3dca1f))
* **plugins/SampledValues:** Create Sampled Values tab in Subscription plugin ([f94b042](https://github.com/openscd/open-scd/commits/f94b0422253940785a0982ae72910f1bbbc2ac62))
* **plugins/SampledValues:** Small bug fix + Added Integration tests ([a58f305](https://github.com/openscd/open-scd/commits/a58f305c78a65c056c617e9f09e8d648f4aaf610))
* **plugins/Subscription:** Create 'Subscription' plugin for GOOSE subscriptions  ([25fae6f](https://github.com/openscd/open-scd/commits/25fae6fc42ad76f269ef029848d5cae6329eee33))
* **wizard-dialog:** allow used-defined actions in menu ([f8c5a93](https://github.com/openscd/open-scd/commits/f8c5a93100e4c7e922627337ffee32f6169b12cf))
* **wizard-dialog:** wizard-dialog content definition through `WizardInput` objects ([5f3a7a7](https://github.com/openscd/open-scd/commits/5f3a7a7c4a74bffb5e800b8c75bffdbdb3213e15))
* **wizards/reportcontrol:** add copy to other IEDs  ([#632](https://github.com/openscd/open-scd/issues/632)) ([1850dfa](https://github.com/openscd/open-scd/commits/1850dfa6c77669fd47ac36379a32267dc54ef913))


### Bug Fixes

* **action-pane:** adjust css rules for icon slot ([#594](https://github.com/openscd/open-scd/issues/594)) ([8bc0549](https://github.com/openscd/open-scd/commits/8bc0549bc791ef6b7fe0b1dfd4d5a6f1dfccde2d))
* **editors/template:** on id attribute update adopt references as well ([#590](https://github.com/openscd/open-scd/issues/590)) ([af246dd](https://github.com/openscd/open-scd/commits/af246ddcde907688081aaa20d295faeb978b0a6f))
* **editors/template:** properly update xxxType list after add/editing ([#582](https://github.com/openscd/open-scd/issues/582)) ([2e11cc8](https://github.com/openscd/open-scd/commits/2e11cc8c277d31dd693ae54656e1c3b4cd23f8f3))
* **wizard-dialog:** make sure to close on non empty editor action ([8fb125c](https://github.com/openscd/open-scd/commits/8fb125c1c353feb37a4c988d59a608090fb0425b))
* **wizards/subnetwork:** incorrect title for create wizard ([#645](https://github.com/openscd/open-scd/issues/645)) ([0210913](https://github.com/openscd/open-scd/commits/0210913cc8eef9cf06d1071a146072ba24e80df0))

## [0.12.0](https://github.com/openscd/open-scd/compare/v0.11.0...v0.12.0) (2022-03-21)


### Features

* **Editing:** check globally for ID uniqueness ([c2b14fb](https://github.com/openscd/open-scd/commits/c2b14fb337adb9f55874dbb3add0aefda8622946))
* **editors/cleanup:** unreferenced DataSet ([#568](https://github.com/openscd/open-scd/issues/568)) ([edc133c](https://github.com/openscd/open-scd/commits/edc133cdecce61abf53d043bc45292d1a1a36c7c))
* **editors/Substation:** Add PowerTransformer Components to Substation Editor ([22555b6](https://github.com/openscd/open-scd/commits/22555b6713c9f2c8e882269ffce9a826d016e87b))
* **editors/template/lnodetype-wizards:** make use of -7-420 NSD ([0a2d5a4](https://github.com/openscd/open-scd/commits/0a2d5a40c50d5a0cc66fd7c5b31f6493aa7c4600))
* **plugins/IED:** Add icon set to IED editor containers ([9878259](https://github.com/openscd/open-scd/commits/9878259665be2e34bd99dd1d5f72c1944b3dca1f))
* **plugins/SampledValues:** Create Sampled Values tab in Subscription plugin ([f94b042](https://github.com/openscd/open-scd/commits/f94b0422253940785a0982ae72910f1bbbc2ac62))
* **plugins/SampledValues:** Small bug fix + Added Integration tests ([a58f305](https://github.com/openscd/open-scd/commits/a58f305c78a65c056c617e9f09e8d648f4aaf610))
* **plugins/Subscription:** Create 'Subscription' plugin for GOOSE subscriptions  ([25fae6f](https://github.com/openscd/open-scd/commits/25fae6fc42ad76f269ef029848d5cae6329eee33))
* **wizard-dialog:** allow used-defined actions in menu ([f8c5a93](https://github.com/openscd/open-scd/commits/f8c5a93100e4c7e922627337ffee32f6169b12cf))


### Bug Fixes

* **action-pane:** adjust css rules for icon slot ([#594](https://github.com/openscd/open-scd/issues/594)) ([8bc0549](https://github.com/openscd/open-scd/commits/8bc0549bc791ef6b7fe0b1dfd4d5a6f1dfccde2d))
* **editors/template:** on id attribute update adopt references as well ([#590](https://github.com/openscd/open-scd/issues/590)) ([af246dd](https://github.com/openscd/open-scd/commits/af246ddcde907688081aaa20d295faeb978b0a6f))
* **editors/template:** properly update xxxType list after add/editing ([#582](https://github.com/openscd/open-scd/issues/582)) ([2e11cc8](https://github.com/openscd/open-scd/commits/2e11cc8c277d31dd693ae54656e1c3b4cd23f8f3))
* **wizard-dialog:** make sure to close on non empty editor action ([8fb125c](https://github.com/openscd/open-scd/commits/8fb125c1c353feb37a4c988d59a608090fb0425b))

## [0.11.0](https://github.com/openscd/open-scd/compare/v0.10.0...v0.11.0) (2022-03-08)


### Features

* **plugins/IED:** Added Functional Constraint value to DA Container. ([f389c2c](https://github.com/openscd/open-scd/commits/f389c2cf7595f9c2486dff0ef0f40a5feff028fb))
* **wizards/reportcontrol:** add create wizard ([#544](https://github.com/openscd/open-scd/issues/544)) ([546419f](https://github.com/openscd/open-scd/commits/546419f31afe82ebf1315e2acce59e11f97d8ca8))
* **wizards/smvopts:** add edit wizard ([#547](https://github.com/openscd/open-scd/issues/547)) ([10343c6](https://github.com/openscd/open-scd/commits/10343c605bcaf31c59d108b33838990a9615eaa4))


### Bug Fixes

* **editors/template:** create element with NS definition ([#567](https://github.com/openscd/open-scd/issues/567)) ([6fe49d2](https://github.com/openscd/open-scd/commits/6fe49d234df4730bc7838f6e597312e60171b0d5))
* **editors/template:** three minor issues ([#565](https://github.com/openscd/open-scd/issues/565)) ([f00092a](https://github.com/openscd/open-scd/commits/f00092a96d78f2c86c94d4978b2886489e14c952))
* **Settings:** remove 'undefined' when no NSDoc version can be read ([d557d26](https://github.com/openscd/open-scd/commits/d557d264ed7a65370d774f174b0ad77c01ba934d))
* **wizard/foundation/limits:** abstractDataAttributeName ([#573](https://github.com/openscd/open-scd/issues/573)) ([179cad1](https://github.com/openscd/open-scd/commits/179cad1f0d05846111a9d868b800465c7e2bc0a5))

## [0.10.0](https://github.com/openscd/open-scd/compare/v0.9.0...v0.10.0) (2022-02-21)


### Features

* **editors/IED:** display IED data attributes namespace description ([#522](https://github.com/openscd/open-scd/issues/522)) ([02b8d97](https://github.com/openscd/open-scd/commits/02b8d97ddb066a1c0134b97aa1e50243f2628048)), closes [#516](https://github.com/openscd/open-scd/issues/516)
* **Settings:** Handle difference in version before uploading nsdoc file ([#541](https://github.com/openscd/open-scd/issues/541)) ([2e470cb](https://github.com/openscd/open-scd/commits/2e470cb3da26adc46c111840d4c9322eb3af14b1))
* **wizard-checkbox:** web component for xs:boolean XML attributes ([#537](https://github.com/openscd/open-scd/issues/537)) ([2b11ae8](https://github.com/openscd/open-scd/commits/2b11ae8ddcfb43a01f7b5d6fe7dae1bee128da39))
* **wizard/sampledvaluecontrol:** allow removing including referenced elements ([#536](https://github.com/openscd/open-scd/issues/536)) ([1940571](https://github.com/openscd/open-scd/commits/194057113de4398209f963262fb8135fd9f5bc03))

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
