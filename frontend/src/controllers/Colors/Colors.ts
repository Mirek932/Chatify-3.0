class Colors{
    public readonly Reset = "\x1b[0m"
    public readonly Bright = "\x1b[1m"
    public readonly Dim = "\x1b[2m"
    public readonly Underscore = "\x1b[4m"
    public readonly Blink = "\x1b[5m"
    public readonly Reverse = "\x1b[7m"
    public readonly Hidden = "\x1b[8m"

    public readonly FgBlack = "\x1b[30m"
    public readonly FgRed = "\x1b[31m"
    public readonly FgGreen = "\x1b[32m"
    public readonly FgYellow = "\x1b[33m"
    public readonly FgBlue = "\x1b[34m"
    public readonly FgMagenta = "\x1b[35m"
    public readonly FgCyan = "\x1b[36m"
    public readonly FgWhite = "\x1b[37m"
    public readonly FgGray = "\x1b[90m"

    public readonly BgBlack = "\x1b[40m"
    public readonly BgRed = "\x1b[41m"
    public readonly BgGreen = "\x1b[42m"
    public readonly BgYellow = "\x1b[43m"
    public readonly BgBlue = "\x1b[44m"
    public readonly BgMagenta = "\x1b[45m"
    public readonly BgCyan = "\x1b[46m"
    public readonly BgWhite = "\x1b[47m"
    public readonly BgGray = "\x1b[100m"

    public log  (message: any){
        console.log(message+ this.Reset);
    }
    public error(message: any){
        console.error(message+ this.Reset);
    }
    public warn (message: any){
        console.warn(message + this.Reset);
    }
}
export = Colors;