const fs = require('fs');
const p = require('path');

function isInvalidValidLodashImport(node, path) {
    if (node.importKind === 'type') {
        return false;
    }

    return ['lodash'].includes(path);
}

function isLodashPerMethod(node, path) {
    if (node.importKind === 'type') {
        return false;
    }

    return path.startsWith('lodash.');
}

function fixImport(node, fixer) {
    const specifiers = node.specifiers;
    const newImports = [];

    for (const specifier of specifiers) {
        newImports.push(
            `import ${specifier.local.name} from 'lodash/${specifier.imported.name}';`
        );
    }

    return fixer.replaceTextRange(node.range, newImports.join('\n'));
}

function fixPackageImport(token, replacement, fixer) {
    return fixer.replaceText(token, `'${replacement}'`);
}

function fixDefaultImport(node, imports, fixer) {
    return fixer.replaceText(node, imports.join('\n'));
}

function fixDefaultImportUsage(node, fixer) {
    return fixer.replaceTextRange([node.range[0], node.range[1] + 1], ``);
}

const memo = {};

const getReplacementsForRoot = () => {
    const lodashPath = p.resolve(process.cwd(), 'node_modules', 'lodash');

    if (memo[lodashPath]) {
        return memo[lodashPath];
    }

    if (!fs.existsSync(lodashPath)) {
        memo[lodashPath] = new Map();

        return memo[lodashPath];
    }

    const modules = fs.readdirSync(lodashPath);

    memo[lodashPath] = new Map(
        modules
            .map((file) => {
                const match = /^(.*)\.js$/.exec(file);
                if (match)
                    return [match[1].toLowerCase(), `lodash/${match[1]}`];
            })
            .filter((pair) => pair)
    );

    return memo[lodashPath];
};

const packagesReplacement = getReplacementsForRoot();

module.exports = {
    meta: {
        type: 'problem',
        fixable: 'code',
        messages: {
            noDirectLodashImport:
                'Do not import directly from lodash, use lodash/{{name}} instead to avoid increasing bundle size.',
            noPerMethodLodashImport:
                'Do not use lodash.{{name}}, use {{replacement}} instead to avoid increasing bundle size.',
            noDefaultLodashImport:
                'Do not import lodash as default, use lodash/module instead to avoid increasing bundle size.'
        },
        schema: []
    },

    create: function (context) {
        return {
            ImportDeclaration(node) {
                if (isInvalidValidLodashImport(node, node.source.value)) {
                    const isDefaultImport =
                        node.specifiers.length === 1 &&
                        [
                            'ImportDefaultSpecifier',
                            'ImportNamespaceSpecifier',
                        ].includes(node.specifiers[0].type);

                    if (isDefaultImport) {
                        const [vars] = context.getDeclaredVariables(node);

                        const newImports = [];

                        for (const usage of vars.references) {
                            const usageNode = usage.identifier;
                            const methodName = usageNode.parent.property.name;

                            newImports.push(
                                `import ${methodName} from 'lodash/${methodName}';`
                            );

                            context.report({
                                messageId: 'noDefaultLodashImport',
                                fix: fixDefaultImportUsage.bind(
                                    null,
                                    usageNode
                                ),
                                node: usageNode,
                            });
                        }

                        context.report({
                            fix: fixDefaultImport.bind(null, node, newImports),
                            messageId: 'noDefaultLodashImport',
                            node,
                        });
                    } else {
                        const packages = node.specifiers.map(
                            (sp) => sp.imported.name
                        );
                        const fix = fixImport.bind(null, node);

                        for (const name of packages) {
                            context.report({
                                fix,
                                messageId: 'noDirectLodashImport',
                                node,
                                data: {
                                    name,
                                },
                            });
                        }
                    }
                }

                if (isLodashPerMethod(node, node.source.value)) {
                    const [, name] = node.source.value.split('.');
                    const replacement = packagesReplacement.get(name);
                    const fix = fixPackageImport.bind(
                        null,
                        node.source,
                        replacement
                    );

                    context.report({
                        messageId: 'noPerMethodLodashImport',
                        fix,
                        node,
                        data: {name, replacement},
                    });
                }
            },
        };
    },
};
