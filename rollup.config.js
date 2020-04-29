import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/groonga-command.ts',
  output: {
    file: './lib/groonga-command.js',
    format: 'cjs',
    sourcemap: true,
    sourcemapExcludeSources: true,
  },
  external: [],

  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015',
          sourceMap: true,
          declaration: false,
        },
      },
    }),
  ],
}
