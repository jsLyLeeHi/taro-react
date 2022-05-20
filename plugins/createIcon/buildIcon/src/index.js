#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var colors_1 = tslib_1.__importDefault(require("colors"));
var getConfig_1 = require("./libs/getConfig");
var fetchXml_1 = require("./libs/fetchXml");
var generateTaroComponent_1 = require("./libs/generateTaroComponent");
var config = getConfig_1.getConfig();
fetchXml_1.fetchXml(config.symbol_url).then(function (result) {
    generateTaroComponent_1.generateTaroComponent(result, config);
}).catch(function (e) {
    console.error(colors_1.default.red(e.message || 'Unknown Error'));
    process.exit(1);
});
