Dear user of OpenSCD.

You are about to enter the deep rabbit holes of IEC 61850. Be sure to not get lost :).

If you looking at this section of the wiki your job is probably the definition of a data model. For most users this means the translation of an existing signal list to IEC 61850 data model references.

The difference between a signal list and the data model defined in the IEC 61850, however, is that the data model is a hierarchical structure with the following levels:

1. Logical node
2. Data object
3. Data attribute
4. (Enumeration)

This hierarchical structure can be defined in the `DataTypeTemplate` section of an SCL file by defining and referencing four element `LNodeType`, `DOType`, `DAType` and `EnumType`. One builds upon the other. In other terms, if you want ot define a `LNodeType` of lets say a LLN0 logical node class you need already some defined `DOType`s and for those you need already some `DAType`s and for some of those - ENx - you also need some `EnumType`s.

This is why this process is so hard for beginners to wrap their mind around. To help users that are not so in detail with this part of the standard as well as other that you need to know as 7-4 and 7-3, OpenSCD offers so-called templates.

A template is nothing als than a pre-define data model. Here a lot and a growing number of logical node classes are defined with its proper references to `DOType`, `DAType` and `EnumType`.

You can see, if OpenSCD does have a template for a logical node class you need in the `Add LNodeType` wizard. Select the class you need and see if the option `Use LN class from OpenSCD template` is available. If this option is disabled you have to start the precess from [scratch](https://github.com/openscd/open-scd/wiki/StartFromScratch)

For those want to know what is happing under the hood

1. Start with a blanc project
2. Navigate to `Template` editor
3. Add `DataTypeTemplate`
4. Click add `LNodeType`
5. Select e.g. logical node class CSWI
6. Make sure option `Use LN class from OpenSCD template` is enabled
7. Click on save
8. Add require id
9. See result in all the element `LNodeType`, `DOType`, `DAType` and `EnumType`

As you should see all required, necessary elements are added to the project.
