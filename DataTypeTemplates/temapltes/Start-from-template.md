
The template database offers a growing number of pre-defined `LNodeType`, `DOType`, `DAType` and `EnumType`. `EnumType`. You can add any of them from the templates database to your project and use re-use whoever you need it. 

If you look into the template database and compare the numbers of the different types you will see that they are growing from `EnumType`, `DAType`, `DOType` to `LNodeType`. The reason for this is the number of possibilities that are growing with each component. 

`EnumType`s for example are pretty straight forward. The Parts 7-3 and 7-4 defines a bunch of those and in most cases you just use them. You might need to reduce the number of the values within your `EnumType` but you will rarely define your owns during this step. 

For the `DAType` this becomes a bit more complicated. Here the child element might be present or not or one of those must be present. As an example lets look at the `AnalogueValue`. This potentially can have two children, a float and/or a integer attribute. This means that potentially there are three different types of `AnalogueValue`. This becomes more complicated with let's say a `Vector`. This consists of one or two AnalogueValues,`mag` and/or `ang`, and there are therefore 9 different possibilities. 

It becomes even more complicated dealing with `DOType` and `LNodeType`. The complexity and the theoretical possibilities grow here as well. What does this mean for OpenSCD? We cannot provide any possible combination for every data defined within the namespace of the IEC&#8239;61850. This would just create a insanely big XML file that makes it difficult to navigate trough it. What is does give is a most common most general type that is used by most users. 

You can add all types from the template database:
- [LNodeType](https://github.com/openscd/open-scd/wiki/Add-LNodeType-from-templates)
- [DOType](https://github.com/openscd/open-scd/wiki/Add-DOType-from-templates)
- [DAType](https://github.com/openscd/open-scd/wiki/Add-DAType-from-templates)
- [EnumType](https://github.com/openscd/open-scd/wiki/Add-EnumType-from-templates)

However, we suggest you to start from the `LNodeType`. This will automatically add a valid element into your project, you cannot make so many mistakes along the way and you have the minimum element in your `DataTypeTemplates` section. 

Please be aware though that in some cases you will need to adapt the element imported from the template database. You can see [here]() how to do that.
