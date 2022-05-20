'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var generate = _interopDefault(require('@babel/generator'));
var traverse = _interopDefault(require('@babel/traverse'));
var utils = _interopDefault(require('@babel/types'));
var parser = require('@babel/parser');
var loaderUtils = require('loader-utils');
var schemaUtils = require('schema-utils');

var schema = {
  type: 'object',
  properties: {
    importPath: {
      type: 'string'
    },
    isPage: {
      "instanceof": 'Function'
    },
    componentName: {
      type: 'string'
    }
  },
  additionalProperties: false
};
function index (source) {
  // @ts-ignore
  var webpackEnv = this;
  var options = loaderUtils.getOptions(webpackEnv);
  schemaUtils.validate(schema, options, {
    name: 'taro-inject-component-loader'
  });

  var _ref = options || {},
      _ref$importPath = _ref.importPath,
      importPath = _ref$importPath === void 0 ? '' : _ref$importPath,
      _ref$componentName = _ref.componentName,
      componentName = _ref$componentName === void 0 ? 'WebpackInjected' : _ref$componentName,
      _ref$isPage = _ref.isPage,
      isPage = _ref$isPage === void 0 ? defaultJudgePage : _ref$isPage; // 获取原始文件地址


  var filePath = webpackEnv.resourcePath;

  if (typeof isPage === 'function' && isPage(filePath)) {
    // 生成 AST
    var ast = parser.parse(source, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties']
    }); // 如果有导入申明，则默认表示已手动导入了组件

    var insert = false; // 保存所有顶层的声明

    var declarations = new Map();
    traverse(ast, {
      // 查找是否有导入
      ImportDeclaration: function ImportDeclaration(path) {
        if (path.node.source.value === importPath) {
          insert = true;
        }
      },
      // 收集页面文件里的所有申明
      // 类组件
      ClassDeclaration: function ClassDeclaration(path) {
        // 如果不是顶层的申明，则直接返回
        if (path.parent.type !== 'Program') return;
        var type = path.node.type;
        var name = path.node.id.name;
        declarations.set(name, type);
      },
      // 函数申明
      FunctionDeclaration: function FunctionDeclaration(path) {
        var _path$node$id;

        // 如果不是顶层的申明，则直接返回
        if (path.parent.type !== 'Program') return;
        var type = path.node.type;
        var name = (_path$node$id = path.node.id) == null ? void 0 : _path$node$id.name;
        if (!name) return;
        declarations.set(name, type);
      },
      // 表达式申明
      VariableDeclaration: function VariableDeclaration(path) {
        // 如果不是顶层的申明，则直接返回
        if (path.parent.type !== 'Program') return;
        path.node.declarations.forEach(function (declaration) {
          var _declaration$init, _declaration$init3, _declaration$init4;

          // const a = () => {}
          if (((_declaration$init = declaration.init) == null ? void 0 : _declaration$init.type) === 'ArrowFunctionExpression') {
            var _declaration$init2, _declaration$id;

            var type = (_declaration$init2 = declaration.init) == null ? void 0 : _declaration$init2.type;
            var name = (_declaration$id = declaration.id) == null ? void 0 : _declaration$id.name;
            declarations.set(name, type);
          } // const a = function(){}


          if (((_declaration$init3 = declaration.init) == null ? void 0 : _declaration$init3.type) === 'FunctionExpression') {
            var _type = declaration.init.type;
            var _name = declaration.id.name;
            declarations.set(_name, _type);
          } // const a = class {}


          if (((_declaration$init4 = declaration.init) == null ? void 0 : _declaration$init4.type) === 'ClassExpression') {
            var _type2 = declaration.init.type;
            var _name2 = declaration.id.name;
            declarations.set(_name2, _type2);
          }
        });
      }
    });

    if (!insert) {
      // 记录组件插入状态
      var state = {
        importedDeclaration: false,
        importedComponent: false
      };
      traverse(ast, {
        // 添加申明
        ImportDeclaration: function ImportDeclaration(path) {
          if (!state.importedDeclaration) {
            state.importedDeclaration = true;
            path.insertBefore(utils.importDeclaration([utils.importDefaultSpecifier(utils.identifier('' + componentName))], utils.stringLiteral('' + importPath)));
          }
        },
        // 默认导出的为页面组件
        ExportDefaultDeclaration: function ExportDefaultDeclaration(path) {
          // 如果默认导出的是函数
          if (path.node.declaration.type === 'FunctionDeclaration') {
            var mainFnBody = path.node.declaration.body.body;
            var length = mainFnBody.length;
            var last = mainFnBody[length - 1];
            insertComponent(last, '' + componentName, state);
          } // 默认导出箭头函数


          if (path.node.declaration.type === 'ArrowFunctionExpression') {
            // export default () => { return <View></View> }
            if (path.node.declaration.body.type === 'BlockStatement') {
              var _mainFnBody = path.node.declaration.body.body;
              var _length = _mainFnBody.length;
              var _last = _mainFnBody[_length - 1];
              insertComponent(_last, '' + componentName, state);
            } else {
              // export default () => <View></View>
              insertComponent(path.node.declaration.body, '' + componentName, state);
            }
          } // 默认导出类


          if (path.node.declaration.type === 'ClassDeclaration') {
            traverse(path.node, {
              ClassMethod: function ClassMethod(path) {
                if (path.node.key.name === 'render') {
                  var body = path.node.body.body || [];
                  var _last2 = body[body.length - 1];
                  insertComponent(_last2, '' + componentName, state);
                  return;
                }
              }
            }, path.scope, path);
          } // 如果默认导出的是一个申明


          if (path.node.declaration.type === "Identifier") {
            var name = path.node.declaration.name;
            var componentType = declarations.get(name);
            traverse(path.parent, {
              FunctionDeclaration: function FunctionDeclaration(path) {
                var _path$node$id2, _path$node, _path$node$body;

                if (((_path$node$id2 = path.node.id) == null ? void 0 : _path$node$id2.name) !== name) return;
                var mainFnBody = (_path$node = path.node) == null ? void 0 : (_path$node$body = _path$node.body) == null ? void 0 : _path$node$body.body;
                var length = mainFnBody.length;
                var last = mainFnBody[length - 1];
                insertComponent(last, '' + componentName, state);
              },
              ClassDeclaration: function ClassDeclaration(path) {
                if (path.node.id.name !== name) return;
                traverse(path.node, {
                  ClassMethod: function ClassMethod(path) {
                    var _path$node$key;

                    if (((_path$node$key = path.node.key) == null ? void 0 : _path$node$key.name) !== 'render') return;
                    var body = path.node.body.body || [];
                    var last = body[body.length - 1];
                    insertComponent(last, '' + componentName, state);
                  }
                }, path.scope, path);
              },
              VariableDeclarator: function VariableDeclarator(path) {
                if (path.node.id.type !== 'Identifier') return;
                if (path.node.id.name !== name) return;
                if (!path.node.init) return;
                if (path.node.init.type !== componentType) return;

                if (path.node.init.type === 'FunctionExpression') {
                  var _mainFnBody2 = path.node.init.body.body;
                  var _length2 = _mainFnBody2.length;
                  var _last3 = _mainFnBody2[_length2 - 1];
                  insertComponent(_last3, '' + componentName, state);
                }

                if (path.node.init.type === 'ClassExpression') {
                  traverse(path.node, {
                    ClassMethod: function ClassMethod(path) {
                      if (path.node.key.name !== 'render') return;
                      var body = path.node.body.body || [];
                      var last = body[body.length - 1];
                      insertComponent(last, '' + componentName, state);
                    }
                  }, path.scope, path);
                }

                if (path.node.init.type === 'ArrowFunctionExpression') {
                  // const A = () => {}
                  // export default A
                  if (path.node.init.body.type == 'BlockStatement') {
                    var _mainFnBody3 = path.node.init.body.body;
                    var _length3 = _mainFnBody3.length;
                    var _last4 = _mainFnBody3[_length3 - 1];
                    insertComponent(_last4, '' + componentName, state);
                  } else {
                    // const A = () => <div></div>
                    // export default A
                    insertComponent(path.node.init.body, '' + componentName, state);
                  }
                }
              }
            });
          }
        }
      });

      if (!state.importedComponent) {
        webpackEnv.emitWarning("\u9875\u9762: " + filePath + " \u6CE8\u5165\u7EC4\u4EF6\u5931\u8D25\uFF0C\u5EFA\u8BAE\u624B\u52A8\u5F15\u5165\u7EC4\u4EF6\u3002\u7EC4\u4EF6\u6CE8\u5165\u9650\u5236\u8BF7\u67E5\u9605: https://github.com/xdoer/taro-inject-component-loader");
      }

      if (!state.importedDeclaration) {
        webpackEnv.emitWarning("\u9875\u9762: " + filePath + " \u6CE8\u5165\u5BFC\u5165\u7533\u660E\u5931\u8D25\uFF0C\u5EFA\u8BAE\u624B\u52A8\u5F15\u5165\u7EC4\u4EF6\u3002\u7EC4\u4EF6\u6CE8\u5165\u9650\u5236\u8BF7\u67E5\u9605: https://github.com/xdoer/taro-inject-component-loader");
      }

      source = generate(ast).code;
    }
  }

  return source;
}

function createElement(name) {
  var reactIdentifier = utils.identifier('React');
  var createElementIdentifier = utils.identifier('createElement');
  var callee = utils.memberExpression(reactIdentifier, createElementIdentifier);
  return utils.callExpression(callee, [utils.identifier(name)]);
}

function createJSX(name) {
  return utils.jSXElement(utils.jSXOpeningElement(utils.jsxIdentifier('' + name), [], true), null, [], true);
}

function insertComponent(node, componentName, state) {
  if ((node == null ? void 0 : node.type) === 'ReturnStatement') {
    var _node$argument, _node$argument$callee, _node$argument$callee2, _node$argument2;

    // createElement
    if (((_node$argument = node.argument) == null ? void 0 : (_node$argument$callee = _node$argument.callee) == null ? void 0 : (_node$argument$callee2 = _node$argument$callee.property) == null ? void 0 : _node$argument$callee2.name) === 'createElement' && !state.importedComponent) {
      state.importedComponent = true;
      var reactCreateArguments = node.argument.arguments;
      reactCreateArguments.push(createElement(componentName));
    } // JSX


    if (((_node$argument2 = node.argument) == null ? void 0 : _node$argument2.type) === 'JSXElement' && !state.importedComponent) {
      state.importedComponent = true;
      node.argument.children.push(createJSX(componentName));
    }
  }

  if (node.type === 'JSXElement' && !state.importedComponent) {
    state.importedComponent = true;
    node.children.push(createJSX(componentName));
  }
}

function defaultJudgePage(filePath) {
  // 兼容 windows 路径
  var formatFilePath = filePath.replace(/\\/g, '/');
  return /(package-.+\/)?pages\/[A-Za-z0-9-]+\/index\.[tj]sx$/.test(formatFilePath);
}

exports.default = index;
//# sourceMappingURL=taro-inject-component-loader.cjs.development.js.map
