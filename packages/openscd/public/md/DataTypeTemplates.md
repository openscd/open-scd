All top-down projects start here. You can define your data model in a green field approach with the **Template editor** of OpenSCD. If you are looking at this section of the wiki your job is probably the definition of a data model. For most users this means the transition of an existing signal list to IEC&#8239;61850 data model references.

The difference between a signal list and the data model defined in the IEC&#8239;61850 is, that the data model is hierarchically structured into the following levels:

1. Logical node
2. Data object
3. Data attribute
4. (Enumeration)

This hierarchical structure can be defined in the `DataTypeTemplates` section of a SCL file by defining and referencing four elements `LNodeType`, `DOType`, `DAType` and `EnumType`. One builds upon the other. In other words, if you want to define a `LNodeType` or let's say a LLN0 logical node class you need some already defined `DOType`s and for those you need some already existing `DAType`s and for some of those - ENx - you also need some already existing `EnumType`s.

This is why this process is so hard for beginners to wrap their mind around. To help users that are not so experienced with this part of the standard as well as others that you need to know, e.g. 7-4, 7-3, 8-1, OpenSCD offers so-called templates.

The template database is nothing else than a pre-define data model. Here a lot and a growing number of logical node classes are defined with its proper references to `DOType`, `DAType` and `EnumType`.

You can see, if OpenSCD does have a template for a logical node class you need in the **Add LNodeType** wizard (_Pre-defined lnClasses from templates_). For more detail please refer to [start from templates](https://github.com/openscd/open-scd/wiki/Start-from-template)

If this option is disabled you have to start the process [from scratch](https://github.com/openscd/open-scd/wiki/Start-from-scratch)

In addition to that you can read/manipulate any element and their attributes using the wizards for

- [LNodeType](https://github.com/openscd/open-scd/wiki/Logical-node-type-LNodeType)
- [DO](https://github.com/openscd/open-scd/wiki/Logical-node-type-child-DO)
- [DOType](https://github.com/openscd/open-scd/wiki/Data-object-type-DOType)
- [SDO](https://github.com/openscd/open-scd/wiki/Data-object-type-child-SDO)
- [DA](https://github.com/openscd/open-scd/wiki/Data-object-type-child-DA)
- [DAType](https://github.com/openscd/open-scd/wiki/Data-attribute-type-DAType)
- [BDA](https://github.com/openscd/open-scd/wiki/Data-attribute-type-child-BDA)
- [EnumType](https://github.com/openscd/open-scd/wiki/Enumeration-EnumType)
- [EnumVal](https://github.com/openscd/open-scd/wiki/Enumeration-EnumVal)
