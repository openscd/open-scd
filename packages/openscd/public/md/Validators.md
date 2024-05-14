Validators are the backbone of this editor. It is very tricky to handle the complexity of an SCL file without it. This is especially true for people just working with SCL files and OpenSCD. In most cases, we try to avoid producing invalid files, but especially in **expert mode**, it is not always possible.

There are two validation functions implemented at the moment. Both are triggered on opening an project or creating a new project. So every time the project basis change. And all validators are triggered on every editor action. That means every time there are changes in the project basis. All results are displayed in the **diagnostics** pane (Ctrl D) and are group by the validation function


1. [Schema validator](https://github.com/openscd/open-scd/wiki/Validate-schema)
2. [Templates validator](https://github.com/openscd/open-scd/wiki/Validate-template)