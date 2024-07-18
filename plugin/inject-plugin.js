/**
 * 全局变量注入插件
 * @param {import('@babel/core')} babel
 * @param {{ [K: string]: string }} options
 * @returns {{ visitor: import('@babel/core').Visitor }} 插件对象
 *@example
 * ```js
 *
 *   plugins: [
 *    [
 *      "./plugin/inject-plugin",
 *      {
 *        // 添加全局变量 nav, 从 '@/common' 导入
 *        nav: `import { nav } from '@/common';`,
 *        // 添加全局变量 xxx, 从 '@/xxx' 导入
 *        xxx: `import { xxx } from '@/xxx';`,
 *      },
 *     ],
 *   ],
 * ```
 */
const plugin = function (babel, options = {}) {
  return {
    visitor: {
      Program(path) {
        path.traverse(traverseOptions, {
          importsAdded: new Set(),
          rootPath: path,
          options,
          babel,
        });
      },
    },
  };
};

/**
 * @type {import('@babel/core').Visitor}
 */
const traverseOptions = {
  Identifier(innerPath, state) {
    const {
      importsAdded,
      rootPath,
      options,
      babel: { template, types: t },
    } = state;
    const { name } = innerPath.node;
    const importValue = options[name];
    if (
      importValue &&
      !importsAdded.has(name) &&
      !innerPath.scope.hasBinding(name) &&
      innerPath.key === "object"
    ) {
      importsAdded.add(name);
      rootPath.node.body.unshift(template.ast(importValue));
    }
  },
};

module.exports = plugin;

/**
 * 附: 插件开发流程
 * 1. @link https://astexplorer.net/ 在线工具查看 AST 结构
 * 2. 根据节点类型编写插件
 */
