A `ClientLN` is one of 3 elements that are describing connections between IEDs in a SCL file. 

### HowTo connect Report with ClientLNs
OpenSCD allows you to connect Report Control Blocks via `ClientLN`. The starting point is the so-called 
- communication mapping wizard (`Menu->Communication Mapping`). Here you can find a button (`+ CONNECT REPORT`).
- Select one or multiple source IEDs (left hand side) and then click on the sink IED on the right hand side.
- Select one or more Report Control Blocks you want connect on the left hand side and the logical nodes on the right hand side.
- Click on `CONNECT`

### HowTo disconnect Report Control Blocks - delete ClientLN's  
The starting point is the so-called 
- communication mapping wizard (`Menu->Communication Mapping`). The wizard shows all connections in the SCL files including GOOSE and SampledValues connections. Each line represents all connections per control block. The number on the right hand side shows the number of connections per control bock and sink IED. (A control block can have additional connection to other IEDs).
- click in the connection you want to disconnect. This opens another page with more detail. The icons in this page indicate the type of connection (ClientLN or ExtRef). 
- Select the connections and then in `DISCONNECT`

### Tipps: 
You can filter for several terms at same time. The space between terms is acting as a logical AND.

### Connection based on `ClientLN`
It is very common to describe Report connections in a SCL file with `ClientLN`s. A `ClientLN` a child element of the report control block and allows to specify which is controlling the report and which functionality (logical node) shall be connected to the report control block. It is very common to connect logical node of the class IHMI, ITCI to report control blocks but any other logical node even those reside in servers can be connected to the report control block.    

### Connections based on `ExtRef`
An external reference is an element that is in the sink IED and pointing to data in the source IED. In addition to that it can reference to the internal address and with Edition there is a pointer or reference to the control block carrying the information. With Edition 2.1 there is even a possibility to define restriction for the external reference. 
This connection is primarily used by `GOOSE` and `SampledValues`. 