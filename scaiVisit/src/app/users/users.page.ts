import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
