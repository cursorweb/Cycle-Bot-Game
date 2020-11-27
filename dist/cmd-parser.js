"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
function parse(prefix, command) {
    if (command.slice(0, prefix.length) != prefix)
        return false;
    let input = command.slice(prefix.length);
    let output = [];
    let r = /(\s+)|"([^"]+)"|'([^']+)'|([^\s]+)/g;
    let m;
    while ((m = r.exec(input)) != null)
        output.push((m[3] || m[2] || m[0]).trim());
    output = output.filter(o => o != '');
    return { command: output[0], args: output.slice(1) };
}
exports.parse = parse;
