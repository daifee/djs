import typescript from '@rollup/plugin-typescript';
import fs from 'node:fs';

function readJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const result = JSON.parse(data);

  return result;
}

const pkg = readJSON('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [typescript()]
};
