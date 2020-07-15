import { Injectable } from '@angular/core';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { RegistrationsService } from './../registrations.service';
import { UsersService } from './../../users/users.service';
import { User } from './../../users/user.model';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PdfService {


  constructor(public registrationsService:RegistrationsService, public usersService:UsersService) {

  }

  makePdfFirme(registrations) {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    let body =  [];
    body.push([
      "Data",
      "Visitatore",
      "Azienda di appartenenza",
      "Orario di entrata",
      "Firma",
      "Orario di uscita",
      "Firma"
    ]);
 
    let rows = null;
   for(let slide of registrations){
    rows = this.createReducedRegistrations(slide);
   }

  for(let row of rows){
      body.push(row);
  }

   let docDefinition = {
    info: {
      title: 'firme',
      author: 'SCAI'
      },
      content: [
        {
        table: {
          headerRows: 1,
          widths: [70, 150, 100, 50, 140, 50, 140],
          body: body
        }
      }
      ],
      pageOrientation: 'landscape',
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        body: {
          fontSize: 14,
          bold: false,
          alignment: "justify",
          margin: [20, 0, 20, 15]
        }
      }
     
    }
    pdfmake.createPdf(docDefinition).open();
  }

 createReducedRegistrations(registrations){
  let reducedRegistrations = [];
  let us = null;

  for(let reg of registrations){
 
    if(this.usersService.getUsers().length > 0){
      us = this.usersService.getUserById(reg.userId);
      if(this.reduceRegistration(reg,us).length > 0)
      reducedRegistrations.push(this.reduceRegistration(reg,us));
    }else{
      console.error("no users")
    }
   } 
 return reducedRegistrations; 
 }
  



reduceRegistration(registration,us){
  let newRegistration = [];

const regDate = new Date(registration.time);
if(registration.externalRef && registration.type == 2){
  const registrationEnter = this.registrationsService.getRegistrationById(registration.externalRef);
  const regEnterDate = new Date(registrationEnter.time);
 newRegistration = [regEnterDate.toLocaleDateString(), registrationEnter.userFirstName + " " + registrationEnter.userLastName, us.company, regEnterDate.toLocaleTimeString(), {image: registrationEnter.firma, width: 140,}, regDate.toLocaleTimeString(), {image:registration.firma,width: 140,} ];
}
if(registration.type == 1)
{
  const registrationExit = this.registrationsService.getRegistrationByExternalRef(registration.registrazioneId);
 
  if(!registrationExit){
    newRegistration = [regDate.toLocaleDateString(), registration.userFirstName + " " + registration.userLastName,us.company, regDate.toLocaleTimeString(),{image: registration.firma, width: 140,}, "", "" ];
  }
}

return newRegistration;
}


}






