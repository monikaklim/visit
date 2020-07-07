import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrations-search',
  templateUrl: './registrations-search.page.html',
  styleUrls: ['./registrations-search.page.scss'],
})
export class RegistrationsSearchPage implements OnInit {
  count: boolean = false;
  countvisit: boolean = false;
  filter: any = {};
  constructor() { }

  ngOnInit() {
  }


  onSubmit(){
    
  }

}
