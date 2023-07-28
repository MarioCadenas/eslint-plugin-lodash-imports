const {RuleTester} = require("eslint");
const lodashImportRule = require("../../../lib/rules/no-direct-lodash-import");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
});

ruleTester.run(
  "no-direct-lodash-import",
  lodashImportRule,
  {
    valid: [
        {
            code: "import isEqual from 'lodash/isEqual'",
        },
        {
            code: "import get from 'lodash/get';",
        },
        {
            code: "import memoize from 'lodash/memoize'",
        },
    ],

    invalid: [
        {
            code: `
import * as _ from 'lodash';

_.isEqual('a', 'b');
_.get({}, 'a.b');`,
            errors: [
                {
                    messageId: 'noDefaultLodashImport',
                },
                {
                    messageId: 'noDefaultLodashImport',
                },
                {
                    messageId: 'noDefaultLodashImport',
                },
            ],
            output: `
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

isEqual('a', 'b');
get({}, 'a.b');`,
        },
        {
            code: `
import _ from 'lodash';
            
_.isEqual('a', 'b');
_.get({}, 'a.b');`,
            errors: [
                {
                    messageId: 'noDefaultLodashImport',
                },
                {
                    messageId: 'noDefaultLodashImport',
                },
                {
                    messageId: 'noDefaultLodashImport',
                },
            ],
            output: `
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
            
isEqual('a', 'b');
get({}, 'a.b');`,
        },
        {
            code: "import { isEqual as equal, get, memoize } from 'lodash';",
            errors: [
                {
                    messageId: 'noDirectLodashImport',
                    data: {name: 'isEqual'},
                },
                {
                    messageId: 'noDirectLodashImport',
                    data: {name: 'get'},
                },
                {
                    messageId: 'noDirectLodashImport',
                    data: {name: 'memoize'},
                },
            ],
            output: `import equal from 'lodash/isEqual';
import get from 'lodash/get';
import memoize from 'lodash/memoize';`,
        },
        {
            code: "import { isEqual } from 'lodash';",
            errors: [
                {
                    messageId: 'noDirectLodashImport',
                },
            ],
            output: "import isEqual from 'lodash/isEqual';",
        },
        {
            code: "import chunk from 'lodash.chunk';",
            errors: [
                {
                    messageId: 'noPerMethodLodashImport',
                    data: {name: 'chunk', replacement: 'lodash/chunk'},
                },
            ],
            output: "import chunk from 'lodash/chunk';",
        },
        {
            code: "import isEqual from 'lodash.isequal';",
            errors: [
                {
                    messageId: 'noPerMethodLodashImport',
                    data: {name: 'isequal', replacement: 'lodash/isEqual'},
                },
            ],
            output: "import isEqual from 'lodash/isEqual';",
        },
    ],
}
);

