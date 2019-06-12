import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  LogoImage: any = '../../assets/bank-logo.png';

  appTitle = 'IDBP-Partner Portal';

  constructor() { }

  ngOnInit() {
  }

}
