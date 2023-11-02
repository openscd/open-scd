A `GOOSE` and `Sampled Value` is a service defined in `IEC 61850-8-1`, `IED 61850-9-2`, respectively. This services can be configured in a SCL file. Both the sending end and the receiving end can be configured - publisher/subscriber.  

## Send end configuration 
Sending end configuration means creating a GOOSE control block `GSEControl` and connect this to a `DataSet` with the attribute `datSet`.
The `DataSet` contains all the data (functional constrained data attributes `FCDA`) send with the GOOSE.  


## Receiving end
The receiving end - or subscriber - is defined with the SCL elements `ExtRef` (external reference) and `IEDName`. 

####  1) `IEDName`
The `IEDName` element is located in the publisher `IED` and contains a reference to the subscriber `IED`(s). It is optional and that is why not all tools have implemented it.  

#### 2) `ExtRef`
The element `ExtRef` is located in the subscriber IED and is containing the reference to the data attribute that is used (subscriber). 

> NOTE: With Edition 2 attributes have been introduced to `ExtRef` element to identify the control block that is carrying the information. Before that this information had to be parsed form the publisher IED. 


This what the function **Update subscriber** is designed for. With this feature you can add the missing `IEDName` elements into an SCL file. To use this feature follow the procedure
1. Open the project you want to update
2. Navigate to Menu -> **Update subscriber info**
3. Check the log to see how many `IEDName` element(s) are added to the project. 


The algorithm works as follows: 
1. Get `ExtRef`
2. Find connected `FCDA`
3. Find the control block that is connected to the `DataSet` of the `FCDA`
4. See if the `IEDName` information is in the control block
5. If not add them


> NOTE: Edition 1 only allowed to add the IED name to the element `IEDName`. With Edition 2 and higher you can also add the path until logical node level.


