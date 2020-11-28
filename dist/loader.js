"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.load = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
async function load() {
    let output = [];
    async function loadDir(dir) {
        for (const file of fs.readdirSync(dir)) {
            let stat = fs.lstatSync(dir + "/" + file);
            if (stat.isFile() && file.includes(".ts")) {
                const C = await Promise.resolve().then(() => __importStar(require(dir + "/" + file)));
                output.push(C);
            }
            else if (stat.isDirectory()) {
                await loadDir(dir + "/" + file);
            }
        }
    }
    loadDir(path.join(__dirname, "cmd"));
    return output;
}
exports.load = load;
async function help() {
    let output = {};
    async function loadDir(dir, dirn) {
        for (const file of fs.readdirSync(dir)) {
            let stat = fs.lstatSync(dir + "/" + file);
            if (stat.isFile() && file.includes(".js")) {
                const C = await Promise.resolve().then(() => __importStar(require(dir + "/" + file)));
                if (!output[dirn])
                    output[dirn] = [];
                output[dirn].push(C);
            }
            else if (stat.isDirectory()) {
                await loadDir(dir + "/" + file, dirn || file);
            }
        }
    }
    await loadDir(path.join(__dirname, "cmd"));
    return output;
}
exports.help = help;
