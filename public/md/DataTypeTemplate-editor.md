# Add a `CSWI` functionality logical node template (`LNodeType`) to an empty project

* click the DataTypeTemplate editor tab
* click the "add LNodeType" button
* choose "CSWI" from the "lnType" dropdown menu
* choose possible values for your "ENS" behavior `Beh` enumeration (default all, i.e. `on`, `on-blocked`, `test`, `test-blocked`, `off`)
  > Enumerations may be assumed zero-indexed unless otherwise noted.

  * choose data attributes for optional substitution services (`subEna`, `subVal`, `subQ`, `subID`, `blkEna`)
  * choose additional optional data attributes (default none of `d`, `dU`, `cdcName="ENS"`*) *fixed value if selected
* choose possible values for your "ENC" mode `Mod` enumeration (default all, i.e. `on`, `on-blocked`, `test`, `test-blocked`, `off`)
  * choose possible values for your "ctlModel" enumeration (default all, i.e. `status-only`, `direct-with-normal-security`, `direct-with-enhanced-security`, `sbo-with-normal-security`, `sbo-with-enhanced-security`)
  * choose possible originator categories (default all, i.e. `not-supported`, `bay-control`, `station-control`, `remote-control`, `automatic-bay`, `automatic-station`, `automatic-remote`, `maintenance`, `process`)
  * choose data attributes for control services (`sboTimeout`, `sboClass`, `operTimeout`, `stSeld`, `ctlNum`)
  * choose data attributes for optional substitution services (`subEna`, `subVal`, `subQ`, `subID`, `blkEna`)
  * choose remaining optional data attributes (`opRcvd`, `opOk`, `tOpOk`, `d`, `dU`, `cdcName="ENC"`*) *fixed value if selected
* choose optional data attributes for the "LPL" name plate (`paramRev`, `valRev`, `d`, `dU`, `configRev`, `cdcName="LPL"`*)
* choose possible values for your "ENS" health `Health` enumeration (default all, i.e. 1. `ok`, 2. `warning`, 3. `alarm`)
  * choose data attributes for optional substitution services (`subEna`, `subVal`, `subQ`, `subID`, `blkEna`)
  * choose additional optional data attributes (default none of `d`, `dU`, `cdcName="ENS"`*) *fixed value if selected
* add a "DPC" position `Pos` double point controllable
  * choose main data attributes (`ctlModel`, `origin`, `ctlNum`, `stSeld`, `opRcvd`, `opOk`, `tOpOk`, `sboTimeout`, `sboClass`, `operTimeout`, `pulseConfig`)
  * choose data attributes for optional substitution services (`subEna`, `subVal`, `subQ`, `subID`, `blkEna`)
  * choose additional optional data attributes (default none of `d`, `dU`, `cdcName="DPC"`*) *fixed value if selected