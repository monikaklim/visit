import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { UsersService } from './../users.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnInit {

  constructor(public route:ActivatedRoute, public navController:NavController, public usersService:UsersService, public formBuilder:FormBuilder, public loadingController:LoadingController) { }
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
      this.form =  this.formBuilder.group({
          firstname: [
            "",
            Validators.compose([Validators.required, Validators.minLength(1)])
          ],
          lastname: [
            "",
            Validators.compose([Validators.required, Validators.minLength(1)])
          ],
          email: [""],
          phone: [""],
          mobile: [""],
          company: [
            "",
            Validators.compose([Validators.required, Validators.minLength(1)])
          ],
          occupation: [""],
          address: [""]
       
        });
        return;
      }
      else{
        this.isEditMode = true;

        this.userId = paramMap.get('userId');
        this.isLoading = true;
        this.user = this.usersService.getUser(paramMap.get('userId'));
       
        console.log( this.usersService.getUser(paramMap.get('userId')))
       
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
               address: new FormControl(this.user.address, {
                  updateOn: 'blur',
                }),
               phone: new FormControl(this.user.phone, {
                  updateOn: 'blur'
                }),
               occupation: new FormControl(this.user.occupation, {
                  updateOn: 'blur'
                })

              });
              this.isLoading = false;
            }
           
      });

      }
   


onSubmit(){
  let uId = "0";
  if(this.isEditMode && this.userId){
    uId = this.userId;
  }
  const user = {userId:uId,firstname:this.form.controls.firstname.value,lastname:this.form.controls.lastname.value, 
  company:this.form.controls.company.value,address:this.form.controls.address.value,email:this.form.controls.email.value,
  phone:this.form.controls.phone.value,mobile:this.form.controls.mobile.value,occupation:this.form.controls.occupation.value}
  this.loadingController.create({message:'Salvataggio in corso...'}).then(loadingEl =>{
    loadingEl.present(); 
    if(this.isEditMode)
      this.usersService.updateUser(user);
    else
      this.usersService.newUser(user);
      this.usersService.fetchUsers();
      setTimeout(()  => {loadingEl.dismiss(); this.navController.navigateBack('users'); }, 2500)
    }
  );
 
 
}


}
