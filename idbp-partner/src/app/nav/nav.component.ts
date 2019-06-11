import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle = 'IDBP-Partner Portal';
  login : Number = 0;
  username: string ='tdm';

  constructor( private router: Router, public  location: Location) { }

  ngOnInit() {
  }

}
