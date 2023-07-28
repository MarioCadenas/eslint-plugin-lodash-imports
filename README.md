# eslint-plugin-lodash-imports

Fix your lodash imports to avoid increasing bundle size

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-lodash-imports`:

```sh
npm install eslint-plugin-lodash-imports --save-dev
```

## Usage

Add `lodash-imports` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lodash-imports"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "lodash-imports/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                             | 🔧 |
| :--------------------------------------------------------------- | :- |
| [no-direct-lodash-import](docs/rules/no-direct-lodash-import.md) | 🔧 |

<!-- end auto-generated rules list -->


