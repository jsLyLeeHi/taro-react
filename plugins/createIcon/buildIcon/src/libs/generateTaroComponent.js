"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTaroComponent = void 0;
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var mkdirp_1 = tslib_1.__importDefault(require("mkdirp"));
var glob_1 = tslib_1.__importDefault(require("glob"));
var colors_1 = tslib_1.__importDefault(require("colors"));
var taroutils_1 = require("./taroutils");
exports.generateTaroComponent = function (data, config) {
    var svgTemplates = [];
    var names = [];
    var saveDir = path_1.default.resolve(config.save_dir);
    var fileName = 'index';
    mkdirp_1.default.sync(saveDir);
    glob_1.default.sync(path_1.default.join(saveDir, '*')).forEach(function (file) { return fs_1.default.unlinkSync(file); });
    data.svg.symbol.forEach(function (item) {
        var iconId = item.$.id;
        var iconIdAfterTrim = config.trim_icon_prefix
            ? iconId.replace(new RegExp("^" + config.trim_icon_prefix + "(.+?)$"), function (_, value) { return value.replace(/^[-_.=+#@!~*]+(.+?)$/, '$1'); })
            : iconId;
        names.push(iconIdAfterTrim);
        svgTemplates.push("\"" + iconIdAfterTrim + "\":\"" + taroutils_1.generateCase(item, { hexToRgb: true }) + "\",");
        console.log(colors_1.default.green('√') + " Generated icon \"" + colors_1.default.yellow(iconId) + "\"");
    });
    fs_1.default.writeFileSync(path_1.default.join(saveDir, fileName + '.tsx'), "\nimport Taro from \"@tarojs/taro\"\nimport { View } from '@tarojs/components'\nimport React from \"react\";\nimport getIcon from \"./icons\"\nimport './index.scss'\nexport type TypeIcons = " + names.map(function (v) { return "'" + v + "'"; }).join(" | ") + "\ninterface TypeProps {\n  icon: TypeIcons,\n  className?: string,\n  color?: string | string[],\n  onClick?: () => void,\n  /** @example \"100*120\" | 120 */\n  size?: string | number,\n  style?: React.CSSProperties\n}\nfunction Index(props: TypeProps) {\n  function toPx(p: number) {\n    return Taro.pxTransform(p)\n  }\n  function getWhStyle(size?: string | number) {\n    const _obj: { width?: string, height?: string } = {};\n    if (typeof size === \"string\" && size.length > 0) {\n      const [w, h] = size.split(\"*\");\n      if (w) {\n        _obj.width = toPx(Number(w))\n        if (!h) _obj.height = toPx(Number(w))\n      }\n      if (h) {\n        _obj.height = toPx(Number(h))\n        if (!w) _obj.height = toPx(Number(h))\n      }\n    }\n    if (typeof size === \"number\") {\n      _obj.width = toPx(size)\n      _obj.height = toPx(size)\n    }\n    if (!_obj.width && !_obj.height) return null\n    return _obj;\n  }\n  const { size, icon = \"\", color, style } = props\n  const { width = toPx(" + config.default_icon_size + "), height = toPx(" + config.default_icon_size + "), } = getWhStyle(size) || style || {}\n  return <View onClick={props.onClick} className={\"xm-icon \" + props.className}\n    style={{ width, height, backgroundImage: 'url(\"' + getIcon(icon, { color, width, height }) + '\")', ...(style || {}) }}></View>\n}\nexport default React.memo(Index)\n");
    fs_1.default.writeFileSync(path_1.default.join(saveDir, 'untils.ts'), "\nexport function fixColor(color: string | string[]) {\n  if (typeof color === 'string') {\n    return color.indexOf('#') === 0 ? hex2rgb(color) : color;\n  }\n  return color.map(function (item) {\n    return item.indexOf('#') === 0 ? hex2rgb(item) : item;\n  });\n}\nexport function hex2rgb(hex: any) {\n  var rgb: number[] = [];\n  hex = hex.substr(1);\n  if (hex.length === 3) {\n    hex = hex.replace(/(.)/g, '$1$1');\n  }\n  hex.replace(/../g, function (color) {\n    rgb.push(parseInt(color, 0x10));\n    return color;\n  });\n  return 'rgb(' + rgb.join(',') + ')';\n}\n  ");
    fs_1.default.writeFileSync(path_1.default.join(saveDir, 'icons.ts'), "\nimport { fixColor } from \"./untils\"\nexport default function (icon: string, p: { color?: string | string[], width: string | number, height: string | number }) {\n  const colors = fixColor(p.color || \"\")\n  const gc=(idx,dc)=>(typeof colors === 'string' ? colors : colors[idx]) || dc\n  const iconlist={\n    " + svgTemplates.join('\n') + "\n  }\n  return iconlist[icon]\n}");
    fs_1.default.writeFileSync(path_1.default.join(saveDir, 'index.scss'), "\n  .xm-icon {\n    background-repeat: no-repeat;\n    display: inline-block;\n  }\n  ");
    console.log("\n" + colors_1.default.green('√') + " All icons have been putted into dir: " + colors_1.default.green(config.save_dir) + "\n");
};
