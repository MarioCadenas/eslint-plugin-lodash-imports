# eslint-plugin-lodash-imports

## What's the purpose of this plugin?

Importing lodash incorrectly can come with an unexpected increase in the bundle size, for example, using any of the following
approaches:

```js
import { isEqual } from 'lodash';
```

```js
import isEqual from 'lodash.isequal';
```

```js
import _ from 'lodash';

_.isEqual('','');
```

will increase the bundle size unexpectedly when using only one function. As explained [here](https://lodash.com/per-method-packages)

Lodash provides a [babel plugin](https://github.com/lodash/babel-plugin-lodash) that transforms the code so you can directly import from 'lodash'.

The problem with this babel plugin is that it adds some KBs to your bundle.

This ESLint plugin will let you know when a Lodash import can be improved, and provides an autofixer so you don't have to do it yourself.

For example:

```js
import { isEqual, get } from 'lodash';
```

will be converted to:

```js
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
```

without adding more size than needed to your bundle.

It also supports default imports and per-method imports.


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
        "lodash-imports/no-direct-lodash-import": "error"
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


