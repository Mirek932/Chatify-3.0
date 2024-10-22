import IUser from "./interfaces/IUser";

class user implements IUser{
    Name: string;
    Password: string;
    Email: string;
    constructor (name: string, password: string, email: string)
    {
        this.Name = name;
        this.Password = password;
        this.Email = email;
    }
    public DeleteUser()
    {
        throw new Error("Not yet implemented");
    }
    public ChangeName(newName: string) {
        throw new Error("Not yet implemented");
    }
    public ChangePasword(newPassword: string){ 
        throw new Error("Not yet implemented");
    }
}

export = user;