A `ClientLN` is one of 3 elements that are describing connections between IEDs in a SCL file.

**HowTo connect Report with ClientLNs**

OpenSCD allows you to connect `ReportControl` via `ClientLN`. The starting point is the **IED** in the **Substation** editor.

<img src="https://user-images.githubusercontent.com/66802940/133250977-03eb956f-fde7-43bc-994c-790b7ec33a2a.png" alt="alt text" width="250">

- Click on an **IED**
- Click on **Add connection** button
- The `ClientLN` wizard open
- On the left hand side you can select the `ReportControl` element(s) in the project
- On the right hand side you can see all logical node in the receiving IED (client).
- All so-called client logical nodes - logical nodes allocated to `AccessPoint` are sorted be be on top.
- `LN0` element are sorted to be at the bottom
- Click on `CONNECT`

![grafik](https://user-images.githubusercontent.com/66802940/133251594-7d552b24-e64f-4875-932a-07c990c0c7ac.png)

> NOTE: When `ClientLN` connections are already present in the `Report Control` block the wizard does not close on **CONNECT**

> NOTE: If the `RptEnabled` `max` attribute is smaller or equal to the `ClientLN` a connection is not possible. The `ReportControl` on the right hand side is disabled.

> TIP: You can filter for several terms at same time. The space between terms is acting as a logical AND.
