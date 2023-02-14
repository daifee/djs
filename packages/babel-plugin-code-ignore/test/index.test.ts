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

function testCase(filename: string, options): void {
  const srcFile = path.resolve(TEST_DIR, '__codes__', `${filename}.js`);
  const expectedFile = path.resolve(TEST_DIR, '__codes__', `${filename}.js.expected`);
  const receivedFile = path.resolve(TEST_DIR, '__codes__', `${filename}.js.output`);

  enforceFileExist(srcFile);
  enforceFileExist(expectedFile);
  enforceFileExist(receivedFile);

  const result = babel.transformFileSync(srcFile, options);

  fs.writeFileSync(receivedFile, result?.code == null ? '' : result?.code, 'utf-8');
  const expected = fs.readFileSync(expectedFile, 'utf-8');

  expect(result?.code).toEqual(expected);
}

describe('case-1-*', () => {
  test.skip('case-1-1', () => {
    testCase('case-1-1', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-1-2', () => {
    testCase('case-1-2', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-1-3', () => {
    testCase('case-1-3', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-1-4', () => {
    testCase('case-1-4', {
      plugins: [
        [plugin, { platform: 'kugou' }]
      ]
    });
  });

  test('case-1-5', () => {
    testCase('case-1-5', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-1-6', () => {
    testCase('case-1-6', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-1-7', () => {
    testCase('case-1-7', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });
});
