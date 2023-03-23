const babel = require('@rollup/plugin-babel');
const css = require('rollup-plugin-css-only');
const copy = require('rollup-plugin-copy');
const typescript = require('rollup-plugin-typescript2');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

module.exports = {
    input: './src/index.tsx',
    output: {
        dir: 'lib',
        format: 'es',
        sourcemap: false
    },
    external: ['jsoneditor', 'react', 'prop-types'],
    plugins: [
        typescript({
            tsconfig: "tsconfig.json",
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
                '.tsx'
            ]
        }),
        css({ output: 'css/editor.css' }),
        copy({
            targets: [
                {
                    src: './node_modules/jsoneditor/dist/img/*', dest: 'lib/img',
                },
            ],
            verbose: true
        })
    ]
};