import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, AlertController,IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsersService } from '../users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Registration } from './registration.model';
import { CompaniesService } from './../companies/companies.service';
import { RegistrationsService } from './registrations.service';
import { SharedService } from './../shared/shared.service';
import { PdfService } from './pdf/pdf.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.page.html',
  styleUrls: ['./registrations.page.scss'],
})
export class RegistrationsPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent,static:true}) content: IonContent;
  @ViewChild(IonSlides, {static:true}) slides: IonSlides;
  registrations:Array<any> =  [];
  private registrationsChangeSubscription: Subscription;
  private responseChangeSubscription: Subscription;
  private countChangeSubscription: Subscription;
  private countvisitChangeSubscription: Subscription;
  response:any = {};
  count:any = {};
  countvisit: any = {};
  date:Date = new Date();
  slidesOptions = {autoHeight:true, speed:300};
  needsToLoad = true;

  constructor(public usersService:UsersService,public companiesService:CompaniesService, public registrationsService:RegistrationsService,public sharedService:SharedService, public loadingController: LoadingController,
    public router: Router, public alertController:AlertController, public route:ActivatedRoute, public pdfService:PdfService) { 

    }
  
async loadRegistrations(){
  await this.loadingController.create({
    message: "Caricamento...", spinner:"bubbles", backdropDismiss:true
   }).then(loadingEl => {
    this.registrations = this.registrationsService.getRegistrations();  
      loadingEl.present(); 
    
      this.registrationsChangeSubscription = this.registrationsService.registrationsChanged.subscribe(registrations  => {
        this.registrations = registrations;

       loadingEl.dismiss();

    });      

      this.responseChangeSubscription = this.registrationsService.responseChanged.subscribe(res  => {
        this.response = res; 
       });   
}).catch(loadingEl => loadingEl.dismiss());
}


    async loadRegistrationsToday(){
    
           await this.loadingController.create({
            message: "Caricamento registrazioni...", spinner:"bubbles", backdropDismiss:true
           }).then(loadingEl => {
            this.registrationsService.findRegistrazioniToday("Torino"); 
            
              loadingEl.present(); 
            
              this.registrationsChangeSubscription = this.registrationsService.registrationsChanged.subscribe(registrations  => {
                this.registrations = registrations;
        
               loadingEl.dismiss();

            });      

              this.responseChangeSubscription = this.registrationsService.responseChanged.subscribe(res  => {
                this.response = res; 
               });   
    });

 }
      

  ngOnInit() {
    if(this.needsToLoad ){
       this.loadRegistrations();
       this.needsToLoad = false;
    }
    this.registrationsChangeSubscription = this.registrationsService.registrationsChanged.subscribe(registrations  => {
      this.registrations = registrations;
    });
    
    this.countChangeSubscription = this.registrationsService.countChanged.subscribe(count  => {
     this.count = count; 
    });
   
     this.countvisitChangeSubscription = this.registrationsService.countvisitChanged.subscribe(countvisit  => {
     this.countvisit = countvisit; 
    });
  }

 checkOut(firstName:string,lastName:string,idRegistration){
  
 this.alertController.create({
    header:"Conferma uscita",
    subHeader: 'Confermi l\'uscita di '+ firstName + ' '+ lastName + "?",
    
    buttons: [
      {
        text: 'Annulla',
        role: 'cancel',
        cssClass: 'secondary'
      }, 
      {
        text: 'Conferma',
        handler: () => { this.router.navigateByUrl('registrations/signature?registrationId='+idRegistration+'&type=2');
        }
      }
    ]
  }).then(alertEl => alertEl.present());

}

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }
  
  scrollToTop() {
    this.content.scrollToTop(500);
  }
  
  //pdf

  /*
  pdf(time) {
    let loader = this.loadingController.create({
      content: "Loading..."
    });
    let filter = {
      sede: this.supportFilter.sede,
      dateFrom: time,
      dateTo: time
    };
    loader.present();
    this.httpProvider.findRegistrazioniPdf(filter).subscribe(
      res => {
        let response = res.body as any;
        this.creaPdf(response.registrazioneDaily[0]);
      },
      err => {
        console.log(err);
      },
      () => {
        loader.dismissAll();
        console.log("complete");
      }
    );
  }
  download() {
    if (this.platform.is("cordova")) {
      let name = "firme" + new Date().getTime() + ".pdf";
      this.pdfDocGenerator.getBuffer(buffer => {
        var blob = new Blob([buffer], { type: "application/pdf" });
        // Save the PDF to the data Directory of our App
        this.file
          .writeFile(this.file.externalDataDirectory, name, blob, {
            replace: true
          })
          .then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(
              this.file.externalDataDirectory + name,
              "application/pdf"
            );
          });
      });
    } else {
      // On a browser simply use download!
      this.pdfDocGenerator.download();
    }
    // this.navCtrl.push(ListaUtentiPage);
  }
  creaPdf(response) {
    // this.creaPdfSingolo(response);
    this.creaPdfCompanies(response);
  }
  creaPdfSingolo(response) {
    let reduced = this.reduceExternalRef(response);
    let pdf = (<any>Object).values(reduced);
    let dd = this.pdfProvider.createPdfFirme(pdf);
    pdfMake.fonts = {
      Garamond: {
        normal: "Garamond.ttf",
        bold: "Garamond-Bold.ttf",
        italics: "Garamond-Medium-Italic.ttf",
        bolditalics: "Garamond.ttf"
      }
    };
    this.pdfDocGenerator = pdfMake.createPdf(dd);
    this.download();
  }
  creaPdfCompanies(response) {

    let pdf = response.map(item => {
      return {
        company: item.company,
        reduced: (<any>Object).values(
          item.array.reduce((acc, curr) => {
            if (!acc[curr.externalRef]) acc[curr.externalRef] = [];
            acc[curr.externalRef].push({
              firstname: curr.userFirstName,
              lastaname: curr.userLastName,
              company: curr.companyFrom,
              date: moment(curr.time).format("DD-MM-YYYY"),
              time: moment(curr.time).format("HH:mm"),
              type: curr.type,
              firma: curr.firma
            });
            return acc;
          }, {})
        )
      };
    });
    let dd = this.pdfProvider.createPdfFirmeAziende(pdf);
    pdfMake.fonts = {
      Garamond: {
        normal: "Garamond.ttf",
        bold: "Garamond-Bold.ttf",
        italics: "Garamond-Medium-Italic.ttf",
        bolditalics: "Garamond.ttf"
      }
    };
    this.pdfDocGenerator = pdfMake.createPdf(dd);
    this.download();
  }
*/



onCreatePdf(){
  this.pdfService.makePdfFirme(this.registrations);
}
}
