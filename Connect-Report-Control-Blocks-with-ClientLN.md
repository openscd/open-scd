### HowTo connect Report with ClientLNs
OpenSCD allows you to connect Report Control Blocks via `ClientLN`. The starting point is the so-called 
- communication mapping wizard (`Menu->Communication Mapping`). Here you can find a button (`+ CONNECT REPORT`).
- Select one or multiple source IEDs (left hand side) and then click on the sink IED on the right hand side.
- Select one or more Report Control Blocks you want connect on the left hand side and the logical node on the right hand side.
- Click on `CONNECT`
Tipps:

### HowTo disconnect Report - delete ClientLN's  

### Connection based on `ClientLN`
It is very common to describe Report connections in a SCL file with `ClientLN`s. A `ClientLN` a child element of the report control block and allows to specify which is controlling the report and which functionality (logical node) shall be connected to the report control block. It is very common to connect logical node of the class IHMI, ITCI to report control blocks but any other logical node even those reside in servers can be connected to the report control block.    

### Connections based on `ExtRef`
An external reference is an element that is in the sink IED and pointing to data in the source IED. In addition to that it can reference to the internal address and with Edition there is a pointer or reference to the control block carrying the information. With Edition 2.1 there is even a possibility to define restriction for the external reference. 
This connection is primarily used by `GOOSE` and `SampledValues`. 