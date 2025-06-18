import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import { readdirSync } from 'fs';

const locales = readdirSync('locales').map(locale =>
  ({
    input: `locales/${locale}`,
    output: {
      sourcemap: true,        // Add source map to build output
      format:'es',            // ES module type export
      file: `dist/locales/${locale}`.slice(0,-3) + '.js',  // Keep filename
    },
    preserveEntrySignatures: 'strict', // leaves export of the plugin entry point

    plugins: [
      nodeResolve(),
      typescript(),
    ]
  }));

export default [{
  input: 'open-scd.ts',
  output: {
    sourcemap: true,        // Add source map to build output
    format:'es',            // ES module type export
    dir: 'dist',            // The build output folder
    // preserveModules: true,  // Keep directory structure and files
  },
  preserveEntrySignatures: 'strict', // leaves export of the plugin entry point

  plugins: [
    /** Resolve bare module imports */
    nodeResolve(),
    typescript(),
   ],
},{
  input: 'foundation.ts',
  output: {
    sourcemap: true,        // Add source map to build output
    format:'es',            // ES module type export
    dir: 'dist',            // The build output folder
    preserveModules: true,  // Keep directory structure and files
  },
  preserveEntrySignatures: 'strict', // leaves export of the plugin entry point

  plugins: [
    /** Resolve bare module imports */
    nodeResolve(),
    typescript(),
   ],
}].concat(locales);
