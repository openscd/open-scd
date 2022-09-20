This editor plugin _Subscriber (SMV)_ allows to connect a complete sampled value message to a subscriber IED. This means in detail that the plugin connects all the data within a sampled value control block - the so-called `FCDA` - to a sink IED.

> NOTE: For detail explanation what happens under the hood to the SCL file see [subscriber basics](https://github.com/openscd/open-scd/wiki/Subscriber-basics)

There are two different views that allow you to work in your preferred way.

**Show subscriber IED per selected Sampled Value**

This view shows all sampled value control blocks per IED on the left hand side and on the right hand side shows all IEDs that are either fully subscribed, partially subscribed or not subscribed to the selected sampled value control block.
![grafik](https://user-images.githubusercontent.com/66802940/182143252-c1ee2c48-0453-463c-b14b-b47d2e482544.png)

1. To subscribed to a not yet subscribed IED navigate to the _Available to subscribe_ list an click on the IED you want to subscribe to.
2. To unsubscribe to a already subscribed IED navigate to the _Subscribed_ list and click in the IED you want to un-subscribe
3. To fully subscribe a partially subscribed IED navigate to the _Partially subscribed_ list and click on the IED you want to fully subscribe to.
   > NOTE: If a IED is partially subscribed this might be on purpose because a vendor of an IED maybe only be capable of working with partially subscribed information. Before you change it make sure this does not lead to export/import issues in a later process step.
4. To un-subscribe a partially subscribed IED you need to first make it fully subscribed (3) and then un-subscribe again (1)

**Show subscribed Sampled Value(s) publisher for selected IED**

This view shows all IEDs in the project on the left hand side and on the right hand side all sampled value publishers that are either fully subscribed, partially subscribed or not subscribed to the selected IED.
![grafik](https://user-images.githubusercontent.com/66802940/182143377-c4c0cd72-d8ab-4bac-a654-1058e791a624.png)

1. To subscribed to a not yet subscribed sampled value control block navigate to the _Available to subscribe_ list an click on the sampled value control block you want to subscribe to the selected sink IED.
2. To un-subscribe to a already subscribed sampled value control block navigate to the _Subscribed_ list and click in the sampled value control block you want to un-subscribe from the selected sink IED
3. To fully subscribe a partially subscribed sampled value control block navigate to the _Partially subscribed_ list and click on the sampled value control block you want to fully subscribe to in the selected sink IED.
   > NOTE: If a sampled value control block is partially subscribed to an IED this might be on purpose because a vendor of an IED maybe only be capable of working with partially subscribed information. Before you change it make sure this does not lead to export/import issues in a later process step.
4. To un-subscribe a partially subscribed sampled value control block you need to first make it fully subscribed (3) and then un-subscribe again (1)
