"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
;
class Method {
    constructor() {
        this.names = [];
        this.help = "*no help provided*";
        this.isAdmin = false;
        this.cooldownUsers = {};
        this.cooldown = 0;
        if (this.cooldown > 0)
            this.initCooldown();
    }
    exec(client, args) { }
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
exports.Method = Method;
