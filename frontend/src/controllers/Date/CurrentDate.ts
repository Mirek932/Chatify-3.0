class currentDate{
    get FormatedCD()
    {
        let dt: Date = new Date();
        return ` ${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;
    }
}
export = currentDate;