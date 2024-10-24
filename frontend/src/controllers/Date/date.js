"use strict";
class CurrentDate {
    get FormatedCD() {
        let dt = new Date();
        return `${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()} ${dt.getHours}:${dt.getMinutes()}`;
    }
}
