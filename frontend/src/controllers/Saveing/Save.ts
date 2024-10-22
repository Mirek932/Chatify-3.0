import { readFile, readFileSync, writeFile, writeFileSync } from "fs";

class Save{
    public Load(file: string) : any
    {
        console.log("Loading file");
        readFile(file, function(err, data: Buffer) {
            if (err) {
                return console.error(err);
            }
            return data;
        });
    }
    public Save(msg: string, file: string)
    {
        console.log("Saving file");
        writeFile(file, msg, function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("File created");
        });
    }
}
export = Save;