export interface IUser {
    email: string; 
    password : string; 
}

export class loginUser implements IUser {
    constructor(public email : string , public password : string){}
}


export interface ISignupUser {
    first_name : string,
    email: string; 
    password : string; 
    cnfrmpassword : string,
    user_type : string,
    last_name? : string
}

export class signupUser implements  ISignupUser{
    constructor(public first_name : string, public email : string , public password : string,
    public cnfrmpassword : string, public user_type : string, public last_name?: string
    ){}
}
