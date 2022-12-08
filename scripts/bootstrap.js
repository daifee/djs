#!/use/bin/env node
import process from 'node:process';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const ROOT_PATH = process.cwd();

function getWorkspaces() {
  const workspacesJSON = execSync('yarn workspaces list --json', {
    cwd: ROOT_PATH,
    encoding: 'utf-8'
  });

  const workspaces = workspacesJSON.split('\n')
    .map((json) => {
      try {
        return JSON.parse(json);
      } catch (err) {
        return null;
      }
    })
    .filter((obj) => {
      return obj !== null;
    });

  return workspaces;
}

//
getWorkspaces().forEach(build);

function build({ location, name }) {
  const cwd = path.resolve(ROOT_PATH, location);

  if (checkBuildScript(cwd)) {
    console.log(`cwd: ${cwd}`);
    execSync('yarn run build', {
      cwd,
      stdio: ['pipe', process.stdout, process.stderr]
    });
  }
}

function checkBuildScript(packageDir) {
  const pkg = parseJSONFile(path.resolve(packageDir, 'package.json'));

  return !!pkg?.scripts?.build;
}

function parseJSONFile(filePath) {
  const json = readFileSync(filePath, { encoding: 'utf-8' });
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}
