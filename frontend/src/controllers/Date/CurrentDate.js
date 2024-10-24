"use strict";
class currentDate {
    get FormatedCD() {
        let dt = new Date();
        return `${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;
    }
}
module.exports = currentDate;
