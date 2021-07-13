A `GOOSE` is a service defined in `IEC 61850-8-1`. This services can be configured in a SCL file. Both the sending end and the receiving end can be configured. 

## Send end configuration 
Sending end configuration means creating a GOOSE control block `GSEControl` and connect this to a `DataSet` with the attribute `datSet`.
The `DataSet` contains all the data (functional constrained data attributes `FCDA`) send with the GOOSE.  


## Receiving end
The receiving end - or subscriber - is defined with the SCL elements `ExtRef` (external reference) and `IEDName`. 

####  1) `IEDName`
The `IEDName` element is located in the sending end IED and contains a reference to the subscriber IED(s). It is optional and that is why not all tools have implemented it.  

#### 2) `ExtRef`
The element `ExtRef` is located in the subscriber IED and is containing the reference to the data attribute that is used (subscriber on) but with Edition1 not the reference to the service that is carrying this data (e.g the GOOSE control block). This means that it is tricky to find if and when yes which IED is subscribing on a GOOSE.

### Update the receiving end configuration with OpenSCD
OpenSCD can help you here by updating the the subscriber information by adding the missing `IEDName` elements into the project:
1. Open the project you want to update
2. Navigate to Menu -> `Update subscriber info`
3. Check the log to see how many `IEDName` element(s) are added to the project. 


