This editor plugin _Subscriber (GOOSE)_ allows to connect a complete GOOSE message to a subscriber IED. This means in detail that the plugin connects all the data within a GOOSE - the so-called `FCDA` - to a sink IED.

> NOTE: For detail explanation what happens under the hood to the SCL file see [subscriber basics](https://github.com/openscd/open-scd/wiki/Subscriber-basics)

There are two different views that allow you to work in your preferred way.

**Show subscriber IED per selected GOOSE**

This view shows all GOOSE control blocks per IED on the left hand side and on the right hand side shows all IEDs that are either fully subscribed, partially subscribed or not subscribed to the selected GOOSE control block.
![grafik](https://user-images.githubusercontent.com/66802940/182098255-5e953de6-e9f0-4ea3-b823-fe33304c0167.png)

1. To subscribed to a not yet subscribed IED navigate to the _Available to subscribe_ list an click on the IED you want to subscribe to.
2. To unsubscribe to a already subscribed IED navigate to the _Subscribed_ list and click in the IED you want to un-subscribe
3. To fully subscribe a partially subscribed IED navigate to the _Partially subscribed_ list and click on the IED you want to fully subscribe to.
   > NOTE: If a IED is partially subscribed this might be on purpose because a vendor of an IED maybe only be capable of working with partially subscribed information. Before you change it make sure this does not lead to export/import issues in a later process step.
4. To un-subscribe a partially subscribed IED you need to first make it fully subscribed (3) and then un-subscribe again (1)

**Show subscribed GOOSE publisher for selected IED**

This view shows all IEDs in the project on the left hand side and on the right hand side all GOOSE publishers that are either fully subscribed, partially subscribed or not subscribed to the selected IED.
![grafik](https://user-images.githubusercontent.com/66802940/182098679-4cd28ff6-09ba-42a3-a810-c8d7012b038b.png)

1. To subscribed to a not yet subscribed GOOSE navigate to the _Available to subscribe_ list an click on the GOOSE you want to subscribe to the selected sink IED.
2. To un-subscribe to a already subscribed GOOSE navigate to the _Subscribed_ list and click in the GOOSE you want to un-subscribe from the selected sink IED
3. To fully subscribe a partially subscribed GOOSE navigate to the _Partially subscribed_ list and click on the GOOSE you want to fully subscribe to in the selected sink IED.
   > NOTE: If a GOOSE is partially subscribed to an IED this might be on purpose because a vendor of an IED maybe only be capable of working with partially subscribed information. Before you change it make sure this does not lead to export/import issues in a later process step.
4. To un-subscribe a partially subscribed GOOSE you need to first make it fully subscribed (3) and then un-subscribe again (1)
