{
  "name": "@daifee/<%= name %>",
  "version": "<%= version %>",
  "homepage": "https://github.com/daifee/djs/tree/main/packages/<%= name %>#readme",
  "bugs": {
    "url": "https://github.com/daifee/djs/issues",
    "email": "mr_zhangjiayong@163.com"
  },
  "type": "module",
  "scripts": {
    "build": "rollup --config ./rollup.config.js",
    "test": "jest ./test/**/*.test.ts"
  },
  "main": "./dist/<%= name %>.cjs",
  "module": "./dist/<%= name %>.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "src"
  ],
  "devDependencies": {
    "@babel/core": "^7.20.2",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-typescript": "^7.18.6",
    "@rollup/plugin-typescript": "^9.0.2",
    "@types/jest": "^29.2.2",
    "babel-jest": "^29.3.1",
    "jest": "^29.3.1",
    "rollup": "^3.2.5",
    "rollup-plugin-delete": "^2.0.0",
    "typescript": "^4.8.4"
  },
  "packageManager": "yarn@3.2.4",
  "engines": {
    "node": ">=16.17.1"
  }
}
