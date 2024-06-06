import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  installPackagesTask,
} from '@nx/devkit';
import * as path from 'path';

import { kebabCase, pascalCase } from '../../utils/change-case';

import { AddonGeneratorSchema } from './schema';

export async function addonGenerator(
  tree: Tree,
  options: AddonGeneratorSchema
) {
  const projectRoot = `addons/${kebabCase(options.name)}`;
  addProjectConfiguration(tree, kebabCase(options.name), {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });

  const model: {
    selectorName: string;
    className: string;
    packageName: string;
  } = {
    selectorName: kebabCase(options.name),
    packageName: options.packageName,
    className: pascalCase(options.name),
  };

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, model);
  await formatFiles(tree);
  await installPackagesTask(tree);
}

export default addonGenerator;
