"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchXml = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var xml2js_1 = require("xml2js");
var colors_1 = tslib_1.__importDefault(require("colors"));
exports.fetchXml = function (url) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, matches_1, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Fetching iconfont data...');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 2:
                data = (_a.sent()).data;
                matches_1 = String(data).match(/'<svg>(.+?)<\/svg>'/);
                if (matches_1) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            xml2js_1.parseString("<svg>" + matches_1[1] + "</svg>", { rootName: 'svg' }, function (err, result) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(result);
                                }
                            });
                        })];
                }
                throw new Error('You provide a wrong symbol url');
            case 3:
                e_1 = _a.sent();
                console.error(colors_1.default.red(e_1.message || 'Unknown Error'));
                process.exit(1);
                throw e_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
