const Module = require("module");

/**
 * 预执行插件
 * @param {import('@babel/core')} babel
 * @param {{ value: string | Array<string> }} options
 * @returns {{ visitor: import('@babel/core').Visitor }} 插件对象
 *@example
 * ```js
 *
 *   plugins: [
 *    [
 *       "./plugin/pre-call-plugin",
 *       {
 *         value: 'precall',
 *       },
 *     ],
 *   ],
 * ```
 */
const plugin = function (babel, options = {}) {
  const { value = "precall" } = options;
  const keyMap = (Array.isArray(value) ? value : [value]).reduce((sum, v) => {
    sum[v] = true;
    return sum;
  }, {});

  return {
    visitor: {
      Program(rootPath, state) {
        rootPath.traverse(traverseOptions, {
          filename: state.filename,
          keyMap,
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
  Identifier(path, state) {
    /**
     * @type {{ babel: import('@babel/core') }}
     */
    const {
      filename = "p.js",
      keyMap,
      babel: { template, types: t, transformSync },
    } = state;

    const { name } = path.node;
    if (
      keyMap[name] &&
      path.key === "callee" &&
      t.isCallExpression(path.parent) &&
      !path.scope.hasBinding(name)
    ) {
      const n = path.parent.arguments[0];
      let moduleValue = "";
      if (t.isTemplateLiteral(n)) {
        moduleValue = n.quasis[0].value.raw;
      } else if (t.isStringLiteral(n)) {
        moduleValue = n.value;
      }

      if (moduleValue) {
        const { code } = transformSync(moduleValue, {
          filename,
        });
        const m = new Module(filename);
        m._compile(code, filename);
        const newValue = m.exports;
        // path.parentPath.replaceWith(
        //   template.ast(
        //     newValue === undefined
        //       ? "undefined"
        //       : typeof newValue === "function"
        //       ? String(newValue)
        //       : JSON.stringify(newValue)
        //   )
        // );
        path.parentPath.replaceWithSourceString(
          newValue === undefined
            ? "undefined"
            : typeof newValue === "function"
            ? String(newValue)
            : JSON.stringify(newValue)
        );
      } else {
        path.parentPath.replaceWith(t.identifier("undefined"));
      }
    }
  },
};

module.exports = plugin;

/**
 * 附: 插件开发流程
 * 1. @link https://astexplorer.net/ 在线工具查看 AST 结构
 * 2. 根据节点类型编写插件
 */
