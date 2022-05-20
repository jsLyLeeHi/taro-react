"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCase = void 0;
var tslib_1 = require("tslib");
var replace_1 = require("./replace");
var ATTRIBUTE_FILL_MAP = ['path'];
exports.generateCase = function (data, config) {
    var e_1, _a;
    var template = "data:image/svg+xml,<svg viewBox='" + data.$.viewBox + "' width='\"+p.width+\"' height='\"+p.height+\"' xmlns='http://www.w3.org/2000/svg'>";
    var _loop_1 = function (domName) {
        if (domName === '$') {
            return "continue";
        }
        var counter = {
            colorIndex: 0,
        };
        if (data[domName].$) {
            template += "<" + domName + addAttribute(domName, data[domName], counter, config) + " />";
        }
        else if (Array.isArray(data[domName])) {
            data[domName].forEach(function (sub) {
                template += "<" + domName + addAttribute(domName, sub, counter, config) + " />";
            });
        }
    };
    try {
        for (var _b = tslib_1.__values(Object.keys(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var domName = _c.value;
            _loop_1(domName);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    template += "</svg>";
    return template.replace(/<|>/g, function (matched) { return encodeURIComponent(matched); });
};
var addAttribute = function (domName, sub, counter, config) {
    var e_2, _a;
    var template = '';
    if (sub && sub.$) {
        if (ATTRIBUTE_FILL_MAP.includes(domName)) {
            // Set default color same as in iconfont.cn
            // And create placeholder to inject color by user's behavior
            sub.$.fill = sub.$.fill || '#333333';
        }
        try {
            for (var _b = tslib_1.__values(Object.keys(sub.$)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var attributeName = _c.value;
                if (attributeName === 'fill') {
                    var color = void 0;
                    if (config === null || config === void 0 ? void 0 : config.hexToRgb) {
                        color = replace_1.replaceHexToRgb(sub.$[attributeName]);
                    }
                    else {
                        color = sub.$[attributeName];
                    }
                    template += " " + attributeName + "='\"+ gc(" + counter.colorIndex + ",'" + color + "')+\"'";
                    counter.colorIndex += 1;
                }
                else {
                    template += " " + attributeName + "='" + sub.$[attributeName] + "'";
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return template;
};
