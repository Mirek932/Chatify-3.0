import user from "./User";

class accountManager{
    Accounts: user[] = [];

    public GetAccoutByName(name: string)
    {
        const index = this.Accounts.findIndex((ele)=>{ele.Name === name});
        if(index === -1) throw new Error(`Cant find user by name: ${name}`)
        return index;
    }
}
export = accountManager;