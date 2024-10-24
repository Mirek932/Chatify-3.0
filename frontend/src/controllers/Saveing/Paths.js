"use strict";
class Paths {
    constructor() {
        this.pathes = {};
    }
    addPath(name, path) {
        this.pathes[name] = path;
    }
    getPath(name) {
        if (this.pathes[name] != null)
            return this.pathes[name];
        throw new Error("[" + name + "]" + " does not Exist in Path!");
    }
    getName(path) {
        return "Not Yet Implemented";
    }
}
module.exports = Paths;
