# OpenSCD Glossary

This glossary introduces terms that have been developed and collectively endorsed by the OpenSCD community. Please note that terms specific to the SCL (Substation Configuration Language) fall outside the scope of this glossary, as they are thoroughly covered and explained by the relevant IEC standards; The goal of the glossary is helping to get a common understanding of the terms introduced into the OpenSCD project, with the aim of enhancing communication.

## Wizard
A wizard is a user-friendly interface that assists individuals in completing complicated tasks by breaking them into simpler, easy-to-follow steps. It typically offers guidance, instructions, and choices, making tasks more manageable and enabling users to accomplish them efficiently.

## Plug-in
An OpenSCD plug-in allows to extend OpenSCD functionality. E.g. support vendeor/organisational specific needs. It's crafted to seamlessly merge with the main OpenSCD-core API, broadening its capabilities without altering its fundamental structure. OpenSCD-core incorporates a selected set of plug-ins and settings (e.g. color scheme) to enhance its functionality. 

## Distribution
An OpenSCD distirbution is openSCD-core with a set of user/organsition selected plug-ins, styling and other environmental variables. An OpenSCD distribution allows to meet organisation/user needs. E.g. selection of open source and 3rd party plug-ins or the useage of organisation colors.

## Validator plug-in
The primary role of Validator plug-in is to ensure that the information provided meets certain criteria or requirements. In the context of our tool, this plug-in is essential for validating the IEC 61850 SCL file that's either created or modified by the tool. It acts as a quality checker, ensuring the integrity and compliance of the SCL file according to specified guidelines or standards.

## Menu plug-in
Menu Plug-in in OpenSCD refers to the functionalities accessible directly from the main menu of the tool. These options perform specific tasks within the tool without necessarily adding a new module or plug-in to the workspace. For instance:

- **Save Project:** Saves the current project.
- **Open Project:** Opens an existing project.
- **Create Virtual IED:** Adds a new IED (Intelligent Electronic Device).

These options facilitate essential tasks within OpenSCD without altering the tool's interface or adding new components to the workspace.


## Editor plug-in
**Editor Plug-ins** in OpenSCD are accessed through the Extensions section in the Menu. These plug-ins, found in the Editor tab of the Extensions section, are responsible for adding or removing modules within the tool's workspace. For instance: **IED**, **Substation** and **Single Line Diagram** plug-ins.

Editor Plug-ins extend the functionality of OpenSCD by adding modules or components to the workspace, providing users with additional tools and features for more specialized tasks or configurations.


