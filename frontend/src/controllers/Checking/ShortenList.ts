function ShortenList(list: string[]){
    var newList: string[] = [];
    list.forEach(ele => {
        newList.push(ele.toLocaleLowerCase());
    });
    return newList;
}

export = ShortenList;