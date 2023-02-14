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
  test('case-1-1', () => {
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
        [plugin, { platform: 'kuwo' }]
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

  test('case-1-8', () => {
    testCase('case-1-8', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-1-9', () => {
    testCase('case-1-9', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ],
      comments: false
    });
  });

  test('case-1-10', () => {
    testCase('case-1-10', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });
});

describe('case-2-*', () => {
  test('case-2-1', () => {
    testCase('case-2-1', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-2-2', () => {
    testCase('case-2-2', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-2-3', () => {
    testCase('case-2-3', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-2-4', () => {
    testCase('case-2-4', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-2-5', () => {
    testCase('case-2-5', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });

  test('case-2-6', () => {
    testCase('case-2-6', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });
});

describe('case-3-*', () => {
  test('case-3-1', () => {
    testCase('case-3-1', {
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });
});

describe('case-4-*', () => {
  test('case-4-1', () => {
    testCase('case-4-1', {
      presets: ['@babel/preset-react'],
      plugins: [
        [plugin, { platform: 'kuwo' }]
      ]
    });
  });
});
