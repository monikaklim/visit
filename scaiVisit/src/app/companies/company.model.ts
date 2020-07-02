export class Company{
    constructor(public companyId:string, public name:string, public city:string, 
                 public address:string,  public referent?:string ){
    }
}