The process step in the system configuration that is called `subscribing` does allow to connect data of an sending IED to inputs of an receiving IED. The sending data can either be stored in a control block - `ReportControl`, `GSEControl` or `SampledValueControl`, respectively or can be a reference to some data within the data model of the sending IED - for polling. The receiving IEDs input is modelled with the SCL element `ExtRef`. What we call subscription becomes nothing more than updating/creating `ExtRef` element in the receiving IED. The connection between the sending data and receiving input is made with the several attributes within the `ExtRef` element: 

- `iedName`: the name of the sending IED
- `ldName`: the name of the logical device the sending data resides in
- `prefix`: the prefix of the logical node the sending data receives in
- `lnClass`: the class of the logical node the sending data resides in
- `lnInst`: the instance if the logical node the sending data resides in
- `doName`: the path through the structure of data objects names the data resides in (e.g. `Pos` or `A.phsA` for a structured data object)
- `daName`: the path through the structure of the data attribute names the data resides in (e.g. `stVal` for simple type of `cVal.mag.f` for complex types)

For a connection to send data with `Report`, `GOOSE` or `SMV` (Sampled Values) and for projects Ed2 and higher some more attributes can be written:

- `srcLDInst`: the instance of the logical the sending control block resides in
- `srcPrefix`: the prefix of the logical node the sending control bloc resides in
- `srcLNClass`: the class of the logical node the sending control block resides in
- `srcLNInst`: the instance of the logical node the sending control block resides in
- `srcCBName`: the name of the sending control block carrying the information
- `serviceType`: either `GOOSE`, `Report` or `SMV` depending on the service sending the data

> NOTE: Reports are rarely connected to receiving IED using the subscription process. OpenSCD does only support to subscribe `GOOSE` and `SMV` for the time being

OpenSCD will over three type of basic subscription plugins for `GOOSE` and three for `SMV`. They differ in the way/how(many) `ExtRef`s are created/updated.

**Connecting the complete GOOSE/SMV**

> NOTE: See [subscribe to GOOSE](https://github.com/openscd/open-scd/wiki/Subscribe-complete-GOOSE) or [subscribe to sampled value stream](https://github.com/openscd/open-scd/wiki/Subscribe-complete-SMV) to see how to do this with OpenSCD

In this case OpenSCD writes for every data point the `GOOSE`/`SMV` is carrying one `ExtRef` in the receiving IED. It does this in the first logical device in the logical node `LN0`. Let's see an example for `GOOSE` further down. There are two `ExtRef` each for one of the `FCDA` element in the `DataSet` connected to the GOOSE control block or `GSEControl`. `FCDA` share the date that defines the reference to the data point in the data model: `ldInst`, `prefix`, `lnClass`, `lnInst`, `doName`, `daName`. In addition the sending IED name is written to `ExtRef`. The rest of the attributes are identifying the control block the `FCDA`s are connected with/are carried by.

> NOTE: The fact that both the `FCDA` are connected is a matter of choice and must not necessary be done as well as the fact that the `ExtRef` are allocated to the first logical node `LN0` in the receiving IED. This is what differentiates this type of connection to the others further down below.

```xml
<IED name="sendingIED" ...>
    <AccessPoint ...>
        <Server>
            <LDevice inst="sendingLD">
                <LN0 prefix="" lnClass="LLN0" lnInst="">
                    <DataSet name="someDS">
                        <FCDA ldInst="CircuitBreaker" prefix="CB" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                        <FCDA ldInst="Meas" prefix="Meas" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" fc="ST"/>
                    </DataSet>
                    <GSEControl name="gooseCB" datSet="someDS">
                        ...
                    <GSEControl>
                </LN0>
                ...
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
...
<IED name="receivingIED" ...>
    <AccessPoint ...>
        <Server>
            <LDevice inst="receivingLD">
                <LN0 prefix="" lnClass="LLN0" lnInst="">
                    ...
                    <Inputs name="someDS">
                        <ExtRef iedName="sendingIED" ldInst="CircuitBreaker" prefix="CB" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="sendingLD" srcPrefix="" srcLNClass="LLN0" srcLNInst="" srcCBName="gooseCB"/>
                        <ExtRef iedName="sendingIED" ldInst="Meas" prefix="Meas" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" serviceType="GOOSE" srcLDInst="sendingLD" srcPrefix="" srcLNClass="LLN0" srcLNInst="" srcCBName="gooseCB" />
                    </Inputs>
                </LN0>
                ...
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
```

**Connecting the single data from GOOSE/SMV**

> NOTE: Not implemented yet in OpenSCD!

In this case OpenSCD writes for the _selected_ data point in a `GOOSE`/`SMV` control block one `ExtRef` in the receiving IED. The location of the `ExtRef` can be selected by the user and can be any logical node in the server. Let's see an example for `GOOSE` further down.

There is only one`ExtRef` representing the connection to the selected `FCDA` element in the `DataSet` connected to the GOOSE control block or `GSEControl`. `FCDA` share the date that defines the reference to the data point in the data model: `ldInst`, `prefix`, `lnClass`, `lnInst`, `doName`, `daName`. The allocation to the logical node is done by the user and allows to better sort in the project.

> NOTE: The connection of single `FCDA` element and the free choice fo the allocation of the `ExtRef` in the receiving IED differentiates this method from the other two.

```xml
<IED name="sendingIED" ...>
    <AccessPoint ...>
        <Server>
            <LDevice inst="sendingLD">
                <LN0 prefix="" lnClass="LLN0" lnInst="">
                    <DataSet name="someDS">
                        <FCDA ldInst="CircuitBreaker" prefix="CB" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                        <FCDA ldInst="Meas" prefix="Meas" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" fc="ST"/>
                    </DataSet>
                    <GSEControl name="gooseCB" datSet="someDS">
                        ...
                    <GSEControl>
                </LN0>
                ...
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
...
<IED name="receivingIED" ...>
    <AccessPoint ...>
        <Server>
            <LDevice inst="receivingLD">
                ...
                <LN prefix="someLN" lnClass="CILO" lnInst="1">
                    ...
                    <Inputs name="someDS">
                        <ExtRef iedName="sendingIED" ldInst="CircuitBreaker" prefix="CB" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="sendingLD" srcPrefix="" srcLNClass="LLN0" srcLNInst="" srcCBName="gooseCB"/>
                    </Inputs>
                </LN>
                ...
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
```

**Connecting on later binding type inputs**

> NOTE: Not implemented yet in OpenSCD!

Later binding is a concept that allows to predefine `ExtRef` elements in the IED configuration Tool (ICT) prior to system configuration. You can see, if a `ExtRef` is predefined by the attribute `intAddr`. This is a string set by the ICT to identify which internal function is using this specific input. This means that the OpenSCD does not create a new `ExtRef` element but updates existing ones.

Let's see an example for `GOOSE` further down. There is only one`ExtRef` representing the connection to the selected `FCDA` element in the `DataSet` connected to the GOOSE control block or `GSEControl`. `FCDA` share the date that defines the reference to the data point in the data model: `ldInst`, `prefix`, `lnClass`, `lnInst`, `doName`, `daName`. The `intAddr` is already predefined and must not be altered nor can OpenSCD delete such an `ExtRef`

> NOTE: The connection of single `FCDA` element to an existing `ExtRef` with `instAddr` set makes this type of plugin unique compared to the others.

```xml
<IED name="sendingIED" ...>
    <AccessPoint ...>
        <Server>
            <LDevice inst="sendingLD">
                <LN0 prefix="" lnClass="LLN0" lnInst="">
                    <DataSet name="someDS">
                        <FCDA ldInst="CircuitBreaker" prefix="CB" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                        <FCDA ldInst="Meas" prefix="Meas" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" fc="ST"/>
                    </DataSet>
                    <GSEControl name="gooseCB" datSet="someDS">
                        ...
                    <GSEControl>
                </LN0>
                ...
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
...
<IED name="receivingIED" ...>
    <AccessPoint ...>
        <Server>
            <LDevice inst="receivingLD">
                ...
                <LN prefix="someLN" lnClass="CILO" lnInst="1">
                    ...
                    <Inputs name="someDS">
                        <ExtRef intAddr="someIntAddr" iedName="sendingIED" ldInst="CircuitBreaker" prefix="CB" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="sendingLD" srcPrefix="" srcLNClass="LLN0" srcLNInst="" srcCBName="gooseCB"/>
                    </Inputs>
                </LN>
                ...
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
```
