module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        ['feat', 'fix', 'docs', 'chore', 'refactor', 'test', 'revert', 'build'],
      ],
      'scope-empty': [2, 'never'],
      'scope-case': [2, 'always', 'pascal-case'],
      'subject-case': [2, 'always', ['start-case', 'sentence-case']],
    },
  };