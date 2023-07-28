const npmPlugin = '@semantic-release/npm';
const githubPlugin = {
  path: '@semantic-release/github',
};
const changelogPlugin = {
  path: '@semantic-release/changelog',
  changelogFile: 'CHANGELOG.md',
};
const gitPlugin = {
  path: '@semantic-release/git',
  assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
  message:
    'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
};

module.exports = {
  verifyConditions: [npmPlugin, githubPlugin],
  prepare: [npmPlugin, changelogPlugin, gitPlugin],
  publish: [npmPlugin, githubPlugin],
  success: [githubPlugin],
  fail: [githubPlugin],
  commitVersion: true,
};