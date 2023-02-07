import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import * as babel from '@babel/core';
import plugin from '../src';

const TEST_DIR = path.resolve(process.cwd(), 'test');

function enforceFileExist(file): void {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '', 'utf-8');
  }
}

function testCase(filename: string): void {
  const srcFile = path.resolve(TEST_DIR, '__codes__', `${filename}.js`);
  const expectedFile = path.resolve(TEST_DIR, '__codes__', `${filename}.js.expected`);
  const receivedFile = path.resolve(TEST_DIR, '__codes__', `${filename}.js.output`);

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

test.skip('case-1 fxDefine ', () => {
  testCase('case-1');
});

test('case-2 fxRequire ', () => {
  testCase('case-2');
});

test.skip('case-3 fxRequire.async ', () => {
  testCase('case-3');
});

test.skip('case-4', () => {
  testCase('case-4');
});
