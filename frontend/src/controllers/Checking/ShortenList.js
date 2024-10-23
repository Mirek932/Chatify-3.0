"use strict";
function ShortenList(list) {
    var newList = [];
    list.forEach(ele => {
        newList.push(ele.toLocaleLowerCase());
    });
    return newList;
}
module.exports = ShortenList;
