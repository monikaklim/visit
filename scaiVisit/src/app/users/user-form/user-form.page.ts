import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { UsersService } from './../users.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnInit {

  constructor(public route:ActivatedRoute, public navController:NavController, public usersService:UsersService, public formBuilder:FormBuilder) { }
  isEditMode:boolean = false;
  form: FormGroup;
  userId:string;
  user:User;
  isLoading:boolean = false;

  ngOnInit() {


    if(this.usersService.getUsers().length === 0){
      this.navController.navigateBack('users');
      return;
    }

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('userId')) {
        this.isEditMode = false;
        this.form = this.formBuilder.group({
	        firstname: [''],
	        lastname: [''],
          company: [''],
          mobile:[''],
          phone:[''],
          address:[''],
         occupation:[''],
         email:['']
	    });
        return;
      }
      else{
        this.isEditMode = true;

        this.userId = paramMap.get('userId');
        this.isLoading = true;
       // this.user = this.usersService.getUser(paramMap.get('userId'));
        console.log(paramMap.get('userId'))
        console.log( this.usersService.getUser(paramMap.get('userId')))
        this.form = this.formBuilder.group({
	        firstname: [''],
	        lastname: [''],
          company: [''],
          mobile:[''],
          phone:[''],
          address:[''],
         occupation:[''],
         email:['']
	    });
  /*
       this.form = this.formBuilder.group({
                firstname: new FormControl(this.user.firstname, {
                  updateOn: 'blur',
                  validators: [Validators.required]
                }),
               lastname: new FormControl(this.user.lastname, {
                  updateOn: 'blur',
                  validators: [Validators.required]
                }),
               company: new FormControl(this.user.company, {
                  updateOn: 'blur',
                  validators: [Validators.required]
                }),
               email: new FormControl(this.user.email, {
                  updateOn: 'blur'
                }),

                mobile: new FormControl(this.user.mobile, {
                  updateOn: 'blur',
                }),
              phone: new FormControl(this.user.phone, {
                  updateOn: 'blur'
                }),
               occupation: new FormControl(this.user.occupation, {
                  updateOn: 'blur'
                })

              }); */
              this.isLoading = false;
            }
           
      });


      }
   


onSubmit(form:NgForm){

}


}
