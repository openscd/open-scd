Schema validation is the most important validation tool. It is crucial to make sure that there are no schema related issues latest on saving the project, as the schema defines the SCL structure it therefore ensures interoperability and should be a minimal requirement.

Under the hood we are using the industry standard to do schema validation [libxml2](https://en.wikipedia.org/wiki/Libxml2). The external library can be used by other web based tools as well. We have create another repository [xmlvalidate.js](https://github.com/openscd/xmlvalidate.js) that allows you to use the schema validation. 

The results/issues are show in the **diagnostics** pane and als important when there are no issues and the schema validation is successful. This at the end what you want to see :).