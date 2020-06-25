import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
users = [
{firstname:"Monika", lastname:"Klim", company:"scai consulting"},
{firstname:"Monika", lastname:"Klim", company:"scai consulting"},
{firstname:"Monika", lastname:"Klim", company:"scai consulting"},
{firstname:"Monika", lastname:"Klim", company:"scai consulting"},
{firstname:"Monika", lastname:"Klim", company:"scai consulting"},
{firstname:"Monika", lastname:"Klim", company:"scai consulting"},
{firstname:"Monika", lastname:"Klim", company:"scai consulting"}
];
  constructor(public usersService:UsersService) { }

  ngOnInit() {
    this.usersService.fetchUsers();
   this.users =  this.usersService.getUsers();
   console.log(this.usersService.getUsers())
  
  }

}
