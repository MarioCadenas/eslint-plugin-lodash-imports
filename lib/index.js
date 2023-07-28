/**
 * @fileoverview Fix your lodash imports to avoid increasing bundle size
 * @author Mario Cadenas
 */
"use strict";

const noDirectLodashImport = require('./rules/no-direct-lodash-import');

module.exports = {
    configs: {
        plugins: ['lodash-imports'],
        rules: {
            'lodash-imports/no-direct-lodash-import': 'error',
        },
    },
    rules: {
        'no-direct-lodash-import': noDirectLodashImport,
    },
};