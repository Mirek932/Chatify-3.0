"use strict";
const fs_1 = require("fs");
class Save {
    Load(file) {
        console.log("Loading file");
        (0, fs_1.readFile)(file, function (err, data) {
            if (err) {
                return console.error(err);
            }
            return data;
        });
    }
    Save(msg, file) {
        console.log("Saving file");
        (0, fs_1.writeFile)(file, msg, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("File created");
        });
    }
}
module.exports = Save;
