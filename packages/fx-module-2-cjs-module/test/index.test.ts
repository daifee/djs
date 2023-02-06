import * as babel from '@babel/core';
import fs from 'node:fs';
import * as url from 'node:url';
import path from 'node:path';
import plugin from '../src';

const DIR = url.fileURLToPath(new URL('.', import.meta.url));

function enforceFileExist(file): void {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '', 'utf-8');
  }
}

function testCase(filename: string): void {
  const srcFile = path.resolve(DIR, '__codes__', `${filename}.src.txt`);
  const expectedFile = path.resolve(DIR, '__codes__', `${filename}.expected.txt`);
  const receivedFile = path.resolve(DIR, '__codes__', `${filename}.received.txt`);

  enforceFileExist(srcFile);
  enforceFileExist(expectedFile);
  enforceFileExist(receivedFile);

  const result = babel.transformFileSync(srcFile, {
    plugins: [plugin]
  });

  fs.writeFileSync(receivedFile, result?.code == null ? '' : result?.code, 'utf-8');
  const expected = fs.readFileSync(expectedFile, 'utf-8');

  expect(result?.code).toEqual(expected);
}

test('case-1', () => {
  testCase('case-1');
});
