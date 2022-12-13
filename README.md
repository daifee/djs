# djs

![main branch](https://github.com/daifee/djs/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/daifee/djs/branch/main/graph/badge.svg?token=CIGVVJP1NN)](https://codecov.io/gh/daifee/djs)

## 开发

依赖环境：

- Nodes.js >=16.17.1

初始化项目依赖：

```sh
yarn install
yarn run bootstrap
```

创建新包：

- name: 包的名称（不需要@scope前缀）

```sh
yarn run create-package <name>
```

移除不要的包：

- name: 包的名称（不需要@scope前缀）

```sh
yarn run remove-package <name>
```
