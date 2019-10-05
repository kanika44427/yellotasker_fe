export interface ITask {
    title: string; //
    description : string; //
    locationType : string,
    address? : string,
    zipcode? :string
    dueDate : any ,
    people_required : number ,//
    typeOfPeople? : string,
    budgetType : string,
    userId : string; //
    totalAmount : number,
    totalHours? : number,
    hourlyRate? : number,
    dueDateType : string,
    categoryId : number
}

export class Task implements ITask {
    constructor(public title : string , public description : string, 
    
    public locationType : string, public address : string , public zipcode : string ,
    
    public dueDate : any,public people_required : number, public typeOfPeople : string ,
    public  budgetType : string, public userId : string, 
    public totalAmount : number, 
    public totalHours : number,
    public hourlyRate : number,
    public dueDateType : string,
    public categoryId : number
    ){}
}

