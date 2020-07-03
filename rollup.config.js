import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'esm'
    },
    plugins: [
        resolve(),
        production && terser()
    ]
};