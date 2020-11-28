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
exports.Command = exports.util = exports.format = void 0;
const format = __importStar(require("./util/format"));
exports.format = format;
const util = __importStar(require("./util/util"));
exports.util = util;
;
class Command {
    constructor() {
        this.names = [];
        this.help = "*no help provided*";
        this.isAdmin = false;
        this.cooldownUsers = {};
        this.cooldown = 0;
        if (this.cooldown > 0)
            this.initCooldown();
    }
    exec(msg, args) { }
    getCooldown(user) {
        return this.cooldownUsers[user.id] ? this.cooldownUsers[user.id] : false;
    }
    setCooldown(user) {
        if (this.getCooldown(user))
            return;
        this.cooldownUsers[user.id] = this.cooldown;
    }
    initCooldown() {
        setInterval(() => {
            for (const id in this.cooldownUsers) {
                this.cooldownUsers[id]--;
                if (this.cooldownUsers[id] < 0) {
                    delete this.cooldownUsers[id];
                }
            }
        }, 1);
    }
}
exports.Command = Command;
