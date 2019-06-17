import { Component, OnInit } from '@angular/core';
import { MyserviceService} from '../service/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  LogoImage: any = '../../assets/bank-logo.png';

  appTitle = 'IDBP-Partner Portal';
  login : Number = 0;
  username: string ='';
  bank: string = '';

  constructor(private myservice: MyserviceService, private router: Router) { }

  ngOnInit() {
    this.myservice.checkLogin()
    .subscribe((data) => {
      console.log(data);
      if(data === 0) {
        this.login = data;
      } else {this.username = data;
              this.login = 1; }
    }, (err) => console.log(err));
  }

  onLogout(){
    this.myservice.logout()
    .subscribe((data) => {
      console.log(data)
      this.bank = data;
      this.login = 0;
    }, (err) => console.log(err));
    return true;
  }

}
