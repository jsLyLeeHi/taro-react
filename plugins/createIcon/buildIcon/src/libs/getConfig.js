"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var colors_1 = tslib_1.__importDefault(require("colors"));
var iconfont_json_1 = tslib_1.__importDefault(require("./iconfont.json"));
var minimist_1 = tslib_1.__importDefault(require("minimist"));
var cacheConfig;
exports.getConfig = function () {
    if (cacheConfig) {
        return cacheConfig;
    }
    var args = minimist_1.default(process.argv.slice(2));
    var configFilePath = 'iconfont.json';
    if (args.config && typeof args.config === 'string') {
        configFilePath = args.config;
    }
    var targetFile = path_1.default.resolve(configFilePath);
    if (!fs_1.default.existsSync(targetFile)) {
        console.warn(colors_1.default.red("File \"" + configFilePath + "\" doesn't exist, did you forget to generate it?"));
        process.exit(1);
    }
    var config = require(targetFile);
    if (!config.symbol_url || !/^(https?:)?\/\//.test(config.symbol_url)) {
        console.warn(colors_1.default.red('You are required to provide symbol_url'));
        process.exit(1);
    }
    if (config.symbol_url.indexOf('//') === 0) {
        config.symbol_url = 'http:' + config.symbol_url;
    }
    config.save_dir = config.save_dir || iconfont_json_1.default.save_dir;
    config.default_icon_size = config.default_icon_size || iconfont_json_1.default.default_icon_size;
    cacheConfig = config;
    return config;
};
