import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { UsersService } from '../users.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.page.html',
  styleUrls: ['./user-search.page.scss'],
})
export class UserSearchPage implements OnInit {
  form: FormGroup;
  
  constructor( public usersService:UsersService, public formBuilder:FormBuilder, public loadingController:LoadingController) { }

  ngOnInit() {
    this.form =  this.formBuilder.group({
      firstname: [
        ""
      ],
      lastname: [
        ""
      ],
    company: [
        ""
      ]
    });
  }

onSubmit(){

    if(this.form.controls.firstname.value || this.form.controls.lastname.value || this.form.controls.company.value){
      
      const filter = {firstname: this.form.controls.firstname.value, lastname: this.form.controls.lastname.value, company: this.form.controls.company.value}
      console.log(filter)
      this.usersService.findUserFiltered(filter)
    }
  
}


}
