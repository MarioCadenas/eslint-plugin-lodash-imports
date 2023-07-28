# lodash-imports/no-direct-lodash-import

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

For example:

|  Import                                                                             | Result                                                                                                                      | 
|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------        |
| `import { isEqual as equal, get, memoize } from 'lodash';`                          | `import equal from 'lodash/isEqual';`<br>`import get from 'lodash/get';`<br>`import memoize from 'lodash/memoize';`         |
| `import _ from 'lodash';`<br><br>`_.isEqual('a', 'b');`<br>`_.get({}, 'a.b');` | `import isEqual from 'lodash/isEqual';`<br>`import get from 'lodash/get';`<br><br>`isEqual('a', 'b');`<br>`get({}, 'a.b');` |
| `import isEqual from 'lodash.isequal';`                                             | `import isEqual from 'lodash/isEqual';`