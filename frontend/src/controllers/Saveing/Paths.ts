class Paths{
    private pathes: {[id: string] : string} = {};

    public addPath(name: string, path: string)
    {
        this.pathes[name] = path;
    }
    public getPath(name: string) : string
    {
        if (this.pathes[name] != null)
            return this.pathes[name];
        throw new Error("[" + name + "]" + " does not Exist in Path!");
    }
    public getName(path:string)
    {
        return "Not Yet Implemented";
    }
}
export = Paths;