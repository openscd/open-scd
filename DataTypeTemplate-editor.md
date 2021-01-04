# Add a `CSWI` functionality logical node template (`LNodeType`) to an empty project

* click the DataTypeTemplate editor tab
* click the "add LNodeType" button
* choose "CSWI" from the "lnType" dropdown menu
* choose possible values for your "ENS" behavior enumeration (default all, i.e. `on`, `on-blocked`, `test`, `test-blocked`, `off`)
  * choose data attributes for optional substitution services (`subEna`, `subVal`, `subQ`, `subID`, `blkEna`)
  * choose additional optional data attributes (default none of `d`, `dU`, `cdcName="ENS"`*) *fixed value if selected
* choose possible values for your "ENC" mode enumeration (default all, i.e. `on`, `on-blocked`, `test`, `test-blocked`, `off`)
  * choose possible values for your "ctlModel" enumeration (default all, i.e. `status-only`, `direct-with-normal-security`, `direct-with-enhanced-security`, `sbo-with-normal-security`, `sbo-with-enhanced-security`)
  * choose possible originator categories (default all, i.e. `not-supported`, `bay-control`, `station-control`, `remote-control`, `automatic-bay`, `automatic-station`, `automatic-remote`, `maintenance`, `process`)
  * choose data attributes for control services (`sboTimeout`, `sboClass`, `operTimeout`, `stSeld`, `ctlNum`)
  * choose data attributes for optional substitution services (`subEna`, `subVal`, `subQ`, `subID`, `blkEna`)
  * choose remaining optional data attributes (`opRcvd`, `opOk`, `tOpOk`, `d`, `dU`, `cdcName="ENC"`*) *fixed value if selected
