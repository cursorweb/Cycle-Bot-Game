"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plural = exports.expandnum = exports.commanum = exports.padstr = exports.random = exports.randomChoice = void 0;
function randomChoice(array, amount = 1) {
    let out = [];
    for (let i = 0; i < amount; i++) {
        out.push(array[Math.floor(array.length * Math.random())]);
    }
    return out;
}
exports.randomChoice = randomChoice;
function random(min, max) {
    return Math.random() * (max - min) + min;
}
exports.random = random;
function padstr(text, length, pad = "0") {
    let amount = length - text.length;
    if (amount <= 0)
        return text;
    return text.padStart(amount, pad);
}
exports.padstr = padstr;
function commanum(inp) {
    let val = inp.replace(/,/g, "");
    let valSplit = val.split('.');
    while (/(\d+)(\d{3})/.test(valSplit[0].toString()))
        valSplit[0] = valSplit[0].toString().replace(/(\d+)(\d{3})/, "$1,$2");
    return valSplit.length == 2 ? valSplit[0] + "." + valSplit[1] : valSplit[0];
}
exports.commanum = commanum;
function expandnum(val) {
    let data = val.split(/[eE]/);
    if (data.length == 1)
        return data[0];
    let z = "";
    let sign = Number(val) < 0 ? '-' : "";
    let str = data[0].replace('.', "");
    let mag = Number(data[1]) + 1;
    if (mag < 0) {
        z = sign + "0.";
        while (mag++)
            z += '0';
        return z + str.replace(/^\-/, "");
    }
    mag -= str.length;
    while (mag--)
        z += '0';
    return str + z;
}
exports.expandnum = expandnum;
function plural(amount, singular = "", plural = "s") {
    return amount == 1 ? singular : plural;
}
exports.plural = plural;
