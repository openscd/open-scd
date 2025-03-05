# Changelog

## [0.38.1](https://github.com/openscd/open-scd/compare/v0.38.0...v0.38.1) (2025-03-05)


### Bug Fixes

* Attach release files in release please ([#1636](https://github.com/openscd/open-scd/issues/1636)) ([f2e6a1d](https://github.com/openscd/open-scd/commit/f2e6a1d8b8fc49b03c75e94dfeed565eeb1bda2f))
* Build entire project and attach distribution to build output ([#1639](https://github.com/openscd/open-scd/issues/1639)) ([bd554e7](https://github.com/openscd/open-scd/commit/bd554e72f308a3c6e60f4ee1d98fa4884fc5d8f8))
* continue to upload assets job even if npm publish step fails ([#1638](https://github.com/openscd/open-scd/issues/1638)) ([bc7571e](https://github.com/openscd/open-scd/commit/bc7571e8351d2a1770e19c58eabf91404cf1726e))
* rename releases_created into release_created for release_please_action@V4 ([#1641](https://github.com/openscd/open-scd/issues/1641)) ([81801cc](https://github.com/openscd/open-scd/commit/81801cc776311ff996c512ea2f441b2b9cc5e2cd))

## [0.38.0](https://github.com/openscd/open-scd/compare/v0.37.1...v0.38.0) (2025-02-26)


### Features

* change release please Workflow trigger ([#1624](https://github.com/openscd/open-scd/issues/1624)) ([53f24cb](https://github.com/openscd/open-scd/commit/53f24cbc9b2be8407aa1420b5665d2a09e9051ea))
* update release please action ([#1635](https://github.com/openscd/open-scd/issues/1635)) ([06b8356](https://github.com/openscd/open-scd/commit/06b8356485940f2841b01293de5bea2a6fa1399d))


### Bug Fixes

* inconsistent plugin activation behaviour caused by refactoring ([#1626](https://github.com/openscd/open-scd/issues/1626)) ([00c4dc0](https://github.com/openscd/open-scd/commit/00c4dc06f6d0cf1c39e4822a5b21d650d698785e))
* update release please version to 0.37.2 ([#1632](https://github.com/openscd/open-scd/issues/1632)) ([a3d6d2f](https://github.com/openscd/open-scd/commit/a3d6d2f68952e98d62375b037b5b36bca63f325a))

## [0.37.1](https://github.com/openscd/open-scd/compare/v0.37.0...v0.37.1) (2025-02-04)


### Features

* Programatic Plugin Activation ([#1611](https://github.com/openscd/open-scd/issues/1611)) ([d3b2a0a](https://github.com/openscd/open-scd/commit/d3b2a0a7b2d08d0ce5484567ebfe6c6d4e548c5e))

## [0.37.0](https://github.com/openscd/open-scd/compare/v0.36.0...v0.37.0) (2025-01-27)


### Features

* Edit api v3 ([#1615](https://github.com/openscd/open-scd/issues/1615)) ([ce39e2b](https://github.com/openscd/open-scd/commit/ce39e2b7bfcda40659f36e40659b1efd571f2a53))
* **monorepo:** Add contributing guide ([#1588](https://github.com/openscd/open-scd/issues/1588)) ([dd692a8](https://github.com/openscd/open-scd/commit/dd692a8d9784aaf5f8509fdad5298293195d1465))

## [0.36.0](https://github.com/openscd/open-scd/compare/v0.35.0...v0.36.0) (2024-11-14)


### ⚠ BREAKING CHANGES

* Edit API v1 validation is no longer supported (e.g. edit api v1 checked if an elements id was unique in the document)
* Edit event v1 properties `derived` and `checkValidity` will be ignored

### Features

* Allow .fsd file creation ([d9a4a0c](https://github.com/openscd/open-scd/commit/d9a4a0c6f6a0c9c86927d80bf5c81b4e9f6fc6d5))
* Edit events v1 will be converted event v2 ([14e933e](https://github.com/openscd/open-scd/commit/14e933ed776ec5592c3c38e84b9884fa41a05e81))
* Editor plugins can be rendered without an active document ([8b06a37](https://github.com/openscd/open-scd/commit/8b06a375ecfbc6275c5238d4a95383f4e80449b8))
* Handle Config Plugin Events ([a510664](https://github.com/openscd/open-scd/commit/a5106648367dad831a248b734cd5c34aa1043d89))
* render plugin download UI on event ([44a51f0](https://github.com/openscd/open-scd/commit/44a51f05797e8dd6345215c177a2e7b68e189d69))
* Support edit api v2 ([#1581](https://github.com/openscd/open-scd/issues/1581)) ([14e933e](https://github.com/openscd/open-scd/commit/14e933ed776ec5592c3c38e84b9884fa41a05e81))


### Bug Fixes

* 1553 LN LN0 wizards read only attributes ([#1568](https://github.com/openscd/open-scd/issues/1568)) ([87aa759](https://github.com/openscd/open-scd/commit/87aa75961c7ef0bfe11810d2fa5d4e08704da033)), closes [#1553](https://github.com/openscd/open-scd/issues/1553)
* correct plug-ins' paths ([a7a14ce](https://github.com/openscd/open-scd/commit/a7a14ced59294d8a24daabf5ecdc76a5dbb75237))

## [0.35.0](https://github.com/openscd/open-scd/compare/v0.34.0...v0.35.0) (2024-07-17)

### Features

* **104:** added descriptions to control ti numbers ([#1400](https://github.com/openscd/open-scd/issues/1400)) ([758a3b8](https://github.com/openscd/open-scd/commit/758a3b887b75b1eabdda7add0b3abf4cbe2df949))
* **104:** added descriptions to ti numbers ([#1378](https://github.com/openscd/open-scd/issues/1378)) ([0e74294](https://github.com/openscd/open-scd/commit/0e742944e4e834c515488ad1f75cecf88d234a8a))
* **104:** implement enc cdc support ([#1391](https://github.com/openscd/open-scd/issues/1391)) ([fa4142b](https://github.com/openscd/open-scd/commit/fa4142b4b85085f092533dd54097d3c4efbf5441))
* **104:** implement wye and del cdc support ([#1390](https://github.com/openscd/open-scd/issues/1390)) ([43b8285](https://github.com/openscd/open-scd/commit/43b82853f877a8eb080db2b4ea99898f861c8418))
* add ISD file extension ([#1351](https://github.com/openscd/open-scd/issues/1351)) ([1c2ef60](https://github.com/openscd/open-scd/commit/1c2ef606a64f1af75af1c88dcdd3a5659b35d2aa))
* add missing editor icons ([#1495](https://github.com/openscd/open-scd/issues/1495)) ([d404464](https://github.com/openscd/open-scd/commit/d404464444a0f03fbe0ca3d0774e1cc1bc704e38))
* added acd as a supported cdc type ([#1371](https://github.com/openscd/open-scd/issues/1371)) ([5ee353c](https://github.com/openscd/open-scd/commit/5ee353cf85e61ce9edd6f48268d198adfdc3f0b2))
* added acd as a supported ens type ([#1384](https://github.com/openscd/open-scd/issues/1384)) ([cebcd37](https://github.com/openscd/open-scd/commit/cebcd37ecbc0230561018c4bb2a8c5e58de3b807))
* Added Settings Addon ([#1441](https://github.com/openscd/open-scd/issues/1441)) ([7ab3553](https://github.com/openscd/open-scd/commit/7ab355340a64cc2afaf6118ea8ca1ea7acc2a319))
* Added Waiter addon ([#1439](https://github.com/openscd/open-scd/issues/1439)) ([91a2ca9](https://github.com/openscd/open-scd/commit/91a2ca97998551aa07e96452ce3c73ddea6b1641))
* Added XML Package for OpenSCD ([#1536](https://github.com/openscd/open-scd/issues/1536)) ([ca60c2a](https://github.com/openscd/open-scd/commit/ca60c2a63c304a5e1c88095ea2f24b597fc5a2ad))
* allow for plugins being passed down as props to `&lt;open-scd&gt;` ([#1486](https://github.com/openscd/open-scd/issues/1486)) ([01bcc01](https://github.com/openscd/open-scd/commit/01bcc017c373185fa34036ea4d80c5ef105d5ee2))
* **editors/ied:** Improve IED editor UI for IED and LN selection ([#1288](https://github.com/openscd/open-scd/issues/1288)) ([e5bc0b8](https://github.com/openscd/open-scd/commit/e5bc0b8509a40950188e2f4bcf52569932309c69))
* make use of lerna nx ([#1462](https://github.com/openscd/open-scd/issues/1462)) ([94d68d7](https://github.com/openscd/open-scd/commit/94d68d7e395b545c699ead584266231085cffeac))
* optional nsd upload button ([#1474](https://github.com/openscd/open-scd/issues/1474)) ([a6c5d3e](https://github.com/openscd/open-scd/commit/a6c5d3e55e7fd13ada773be7f56d7869e06f30c0))
* Provide ability to see Services section XML ([#1346](https://github.com/openscd/open-scd/issues/1346)) ([83d1d61](https://github.com/openscd/open-scd/commit/83d1d611eeeb79082c7f0eb7934ee045b25fe0c2))
* set up PR preview ([#1547](https://github.com/openscd/open-scd/issues/1547)) ([fede42b](https://github.com/openscd/open-scd/commit/fede42b43272e4fbf036e18df299a45fe52741cc))
* support ldname attribute ([#1401](https://github.com/openscd/open-scd/issues/1401)) ([c0972f3](https://github.com/openscd/open-scd/commit/c0972f33b7e386c39a127739b4c2962f9c9a60f4))

### Bug Fixes

* **104:** change options between different tis when selecting a doi ([#1380](https://github.com/openscd/open-scd/issues/1380)) ([cb80080](https://github.com/openscd/open-scd/commit/cb800808e9679e673e987038678e4c9f2da9fdf3))
* **action:** correct source folder ([2ae1cd3](https://github.com/openscd/open-scd/commit/2ae1cd316743b912551c245da15533bcb9ec2426))
* add node release type and core path ([#1437](https://github.com/openscd/open-scd/issues/1437)) ([d1bde4e](https://github.com/openscd/open-scd/commit/d1bde4e8077f378a5f6e1cc6ebc62561be37db04))
* added editcount to reflect made changes ([#1321](https://github.com/openscd/open-scd/issues/1321)) ([802dd41](https://github.com/openscd/open-scd/commit/802dd4174fb49fc969e601ba04f3ca1966adedbb))
* allow address update for new entries ([#1331](https://github.com/openscd/open-scd/issues/1331)) ([d1f4ff9](https://github.com/openscd/open-scd/commit/d1f4ff90e211bc8ba8c2e9fc4e900fb093acfad5))
* **ci:** remove unneeded permission check ([8d5de2d](https://github.com/openscd/open-scd/commit/8d5de2d93714cef7f5a725704a6adf38602b581c))
* do and da wizard lnclass textfield correction ([#1444](https://github.com/openscd/open-scd/issues/1444)) ([ad08ff2](https://github.com/openscd/open-scd/commit/ad08ff2f4ea51655da5fd158c7106680b6b68506))
* **editors/communication,wizards:** Fix P-type names and display of BitRate ([#1277](https://github.com/openscd/open-scd/issues/1277)) ([2706f82](https://github.com/openscd/open-scd/commit/2706f82283cc7a58a8da5ca4cb775bfec7c6b986))
* **editors/IED:** Allow IEDs to be updated after edit count change (closes [#1272](https://github.com/openscd/open-scd/issues/1272)) ([#1275](https://github.com/openscd/open-scd/issues/1275)) ([1df6842](https://github.com/openscd/open-scd/commit/1df6842002891223cf7a58821494731c01be73a5))
* **editors/subscription:** Increase timeout for failing subscriber/fcda-binding-list test, closes [#1257](https://github.com/openscd/open-scd/issues/1257) ([#1274](https://github.com/openscd/open-scd/issues/1274)) ([8c620eb](https://github.com/openscd/open-scd/commit/8c620eb97fb34a0a01e2ac21cefbb87950e5a6b4))
* fixed dotype-wizarding test for correct translation ([#1464](https://github.com/openscd/open-scd/issues/1464)) ([4517106](https://github.com/openscd/open-scd/commit/4517106c3e651d930fd6c53b4df34f6fc7a065f4))
* **gh-action:** build-and-deploy should first build core before building OpenSCD ([#1427](https://github.com/openscd/open-scd/issues/1427)) ([e25e5f8](https://github.com/openscd/open-scd/commit/e25e5f8c94457deeed207891fec3234201fb1a03))
* **menu/importIEDs:** Allow importing multiple IEDs from multiple SCD files ([#1222](https://github.com/openscd/open-scd/issues/1222)) ([8bdd990](https://github.com/openscd/open-scd/commit/8bdd990a1d0c77b50743281d71b61489709e433a))
* Moved towards get function from lit-translate ([#1471](https://github.com/openscd/open-scd/issues/1471)) ([03dabf9](https://github.com/openscd/open-scd/commit/03dabf94bf3e57f012bb078415ba0c284ce7b1e8))
* **open-scd:** Make linear progress bar Github stylez, closes [#1269](https://github.com/openscd/open-scd/issues/1269) ([ebde770](https://github.com/openscd/open-scd/commit/ebde77000373780dccfa6f345126732667be1c43))
* **open-scd:** Make linear progress bar Github stylez, closes [#1269](https://github.com/openscd/open-scd/issues/1269) ([#1276](https://github.com/openscd/open-scd/issues/1276)) ([ebde770](https://github.com/openscd/open-scd/commit/ebde77000373780dccfa6f345126732667be1c43))
* re-enable input fields in custom plugins dialog ([#1541](https://github.com/openscd/open-scd/issues/1541)) ([38b490d](https://github.com/openscd/open-scd/commit/38b490d1ca7988cebef8513fb640eb077c6246a0))
* recover ace editor files in packages/distribution ([#1544](https://github.com/openscd/open-scd/issues/1544)) ([34a58c0](https://github.com/openscd/open-scd/commit/34a58c04e496716f6a7107e082814fbd8ed053fe))
* Removed Custom web components in tests ([#1445](https://github.com/openscd/open-scd/issues/1445)) ([183717b](https://github.com/openscd/open-scd/commit/183717b2aa90a44a6ffc4b404e79b98fd6bcc917))
* splitting up open-scd and plugins ([#1469](https://github.com/openscd/open-scd/issues/1469)) ([200c030](https://github.com/openscd/open-scd/commit/200c0308a96899a7bc06a4f0357423901c1fff49))
* stale issue action ([a170e8b](https://github.com/openscd/open-scd/commit/a170e8b4e06f6871b1895d64dd710ccdcf76bc1a))
* Subscribing on minimal ExtRef definition ([#1551](https://github.com/openscd/open-scd/issues/1551)) ([29483e6](https://github.com/openscd/open-scd/commit/29483e6562061ae1edd69b2dccf33a512a8aef93))
* supervision updates after ied rename ([#1338](https://github.com/openscd/open-scd/issues/1338)) ([2066e4c](https://github.com/openscd/open-scd/commit/2066e4c71d8ab888cc04f1628c30b39582033fcb))
* use materialized icons for primary apparatus ([#1498](https://github.com/openscd/open-scd/issues/1498)) ([fa07ec2](https://github.com/openscd/open-scd/commit/fa07ec2e12392f0973a138f8260837eec746a64d))
* **wizards/doTypes:** Adjust regular expressions for v flag in template editor ([#1273](https://github.com/openscd/open-scd/issues/1273)) ([baa9bdc](https://github.com/openscd/open-scd/commit/baa9bdcd73bb6db9ab2956dfd58344bc8859262d))
* **wizards/foundation:** Added missing DAI bTypes ([#1320](https://github.com/openscd/open-scd/issues/1320)) ([0bff5aa](https://github.com/openscd/open-scd/commit/0bff5aa448bdfd94956aa602b74a3f44099facd1))
* **wizards/foundation:** Escape limit regexes, closes [#1271](https://github.com/openscd/open-scd/issues/1271) ([baa9bdc](https://github.com/openscd/open-scd/commit/baa9bdcd73bb6db9ab2956dfd58344bc8859262d))

### Miscellaneous Chores

* Add @nx/nx-linux-x64-gnu as optional dependency ([#1557](https://github.com/openscd/open-scd/issues/1557)) ([64f73ac](https://github.com/openscd/open-scd/commit/64f73ace8701e17c1a51b335d76735f7793c210c))
* Release 0.34.0, core 0.1.2 ([#1555](https://github.com/openscd/open-scd/issues/1555)) ([e8fe207](https://github.com/openscd/open-scd/commit/e8fe20739267ea14b74c3d2be0fbf5fa4faa546b))
* Release 0.34.0, core 0.1.2 attempt 3 ([#1558](https://github.com/openscd/open-scd/issues/1558)) ([62a7918](https://github.com/openscd/open-scd/commit/62a79183f7f5b6a55c0ebf500d94c05c0d348ac1))
* Release 0.34.0, core 0.1.2 attempt 4 ([#1559](https://github.com/openscd/open-scd/issues/1559)) ([85d6433](https://github.com/openscd/open-scd/commit/85d6433f4105a6b0bc06e8059755e1b9311f4c4f))
