#!/usr/bin/env node
/**
 * 支持功能：
 * - 创建新包
 * - 执行测试
 * - 执行构建
 * - 执行项目引导
 */

// import inquirer from 'inquirer';
import { Command } from 'commander';

const program = new Command();

const DESCRIPTIONS = {
  PACKAGE_NAME: '包名称（不需要@scope前缀）',
  PACKAGE_VERSION: '版本号'
};

program
  .name('项目工具')
  .description('处理工作流程任务：创建新包、测试、构建、引导、发布...');

/**
 * 创建新包
 */
program
  .command('create-package')
  .description('创建新包')
  .argument('<name>', DESCRIPTIONS.PACKAGE_NAME)
  .option('--version <version>', '版本号', '1.0.0')
  .action(async function (name, opts) {
    const { default: createPackage } = await import('./scripts/create-package/index.js');

    createPackage({ name, ...opts });
  });

/**
 * 移除旧包
 */
program
  .command('remove-package')
  .description('移除旧包（删除目录）')
  .argument('<name>', DESCRIPTIONS.PACKAGE_NAME)
  .action(async function (name) {
    const { default: removePackage } = await import('./scripts/remove-package.js');

    removePackage(name);
  });

/**
 * 执行项目引导
 */
program
  .command('bootstrap')
  .description('项目引导')
  .action(async () => {
    const { default: bootstrap } = await import('./scripts/bootstrap.js');
    bootstrap();
  });

// 测试

// 构建

// 发布

program.parseAsync();
