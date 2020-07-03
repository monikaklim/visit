export class Registration{
    constructor(public registrationId:string, public userId:string, public companyId:string, public type:number, 
        public time:Date, public signature:Blob,enabled:number ){
    }
}