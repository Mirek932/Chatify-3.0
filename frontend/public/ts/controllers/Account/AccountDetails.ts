class accountDetails{
    public Email: string;
    public Username: string;
    public Password: string;

    constructor(email:string="example@example.com",username:string= "Client-Tanaka",password:string="1234")
    {
        this.Email=   email;
        this.Username=username;
        this.Password=password;
    }

}

export default accountDetails;