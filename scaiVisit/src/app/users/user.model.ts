export class User{
    constructor(public userId:string, public firstname:string, public lastname:string, public company:string, 
        public email?:string, public address?:string,public phone?:string,public mobile?:string,public occupation?:string ){
    }
}