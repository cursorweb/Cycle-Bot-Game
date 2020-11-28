"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codestr = exports.hidden = exports.brackets = void 0;
var Colors;
(function (Colors) {
    Colors[Colors["PRIMARY"] = 0] = "PRIMARY";
    Colors[Colors["ERROR"] = 1] = "ERROR";
    Colors[Colors["SUCCESS"] = 2] = "SUCCESS";
    Colors[Colors["WARNING"] = 3] = "WARNING";
})(Colors || (Colors = {}));
;
function brackets(input) {
    return `[ **${input}** ]`;
}
exports.brackets = brackets;
function hidden(input) {
    return `||[ **\`${input}\`** ]||`;
}
exports.hidden = hidden;
function codestr(str, lang = "yaml") {
    return "```" + lang + '\n' + str + "```";
}
exports.codestr = codestr;
