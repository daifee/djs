import inquirer from 'inquirer';
import {
  execChildProcessSync,
  exit,
  getAllPackageNames,
  readPackageFile,
  writePackageFile
} from './utils.js';

const questions = [
  {
    name: 'packageName',
    type: 'list',
    message: '包的名称',
    choices() {
      return getAllPackageNames();
    }
  },
  {
    name: 'version',
    type: 'list',
    message: '选择版本',
    choices: [
      { name: 'major: x.0.0', value: 'major' },
      { name: 'minor: 0.x.0', value: 'minor' },
      { name: 'patch: 0.0.x', value: 'patch' },
      { name: '自定义版本号', value: 'custom' }
    ]
  },
  {
    name: 'version',
    type: 'input',
    message: '自定义版本（X.X.X）',
    when(answers) {
      return answers.version === 'custom';
    },
    askAnswered: true,
    validate(input) {
      if (!input) {
        return '请输入版本号';
      }

      const reg = /^\d+\.\d+\.\d$/;
      if (!reg.test(input)) {
        return '输入格式不对';
      }

      return true;
    }
  }
];

export default function run() {
  // 必须在main分支
  assertBranch('main');
  // 工作目录必须干净
  assertClean();
  // 判断登录状态
  assertLogined();
  // lint
  execChildProcessSync('yarn run lint');
  inquirer
    .prompt(questions)
    .then((answers) => {
      // test
      execChildProcessSync(`yarn workspace ${answers.packageName} run test`);
      // build
      execChildProcessSync(`yarn workspace ${answers.packageName} run build`);
      publish(answers);
    });
}

run();

// 发布版本
function publish({ version, packageName }) {
  // 更新版本号
  version = updateVersion(packageName, version);
  // 新 commit
  execChildProcessSync('git add --all');
  execChildProcessSync(`git commit -m "publish: ${packageName}@${version}"`);
  execChildProcessSync('git push --all');
  // git tag
  execChildProcessSync(`git tag ${packageName}@${version}`);
  execChildProcessSync('git push --tags');

  // npm publish
  execChildProcessSync(`yarn workspace ${packageName} npm publish --access=public`);
}

// 修改版本号
function updateVersion(packageName, version) {
  const pkgObj = readPackageFile(packageName);

  const actions = {
    major(versionSnippts) {
      versionSnippts[0] = versionSnippts[0] + 1;
      return versionSnippts.join('.');
    },
    minor(versionSnippts) {
      versionSnippts[1] = versionSnippts[1] + 1;
      return versionSnippts.join('.');
    },
    patch(versionSnippts) {
      versionSnippts[2] = versionSnippts[2] + 1;
      return versionSnippts.join('.');
    }
  };

  const action = actions[version];
  if (action) {
    const versionSnippts = pkgObj.version.split('.').map((snippt) => {
      return parseInt(snippt);
    });
    pkgObj.version = action(versionSnippts);
  } else {
    pkgObj.version = version;
  }

  writePackageFile(packageName, pkgObj);

  return pkgObj.version;
}

// 判断仓库是否干净
function assertClean() {
  const stdout = execChildProcessSync('git status -s', {
    stdio: 'pipe',
    encoding: 'utf-8'
  });

  if (stdout) {
    exit(1, `Git仓库必须是clean状态\n下列文件未commit: \n${stdout}`);
  }
}

// 检测分支
function assertBranch(targetBranch) {
  const stdout = execChildProcessSync('git branch --show-current', {
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  const reg = new RegExp(`^${targetBranch}`);
  if (!reg.test(stdout)) {
    exit(1, `必须在 ${targetBranch} 分支下发布`);
  }
}

// 检测是否已经登录
function assertLogined() {
  execChildProcessSync('yarn npm whoami');

  if (process.exitCode) {
    exit(process.exitCode, '未登录NPM');
  }
}
