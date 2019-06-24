import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  show_partner_profile: any ;
  show_payment_rules: any;
  public permitted = false;

  constructor(private myservice: MyserviceService, private route: ActivatedRoute) {
    this.show_partner_profile = this.route.snapshot.data['partner_profile'];
    console.log(this.show_partner_profile);
  }

  ngOnInit(){
    this.myservice.checkPermitted()
    .subscribe((data)=>{
      console.log(data)
      this.permitted = data;
    },(err)=>console.log(err));

    if(this.permitted){
      this.myservice.getPaymentRulesDetails()
      .subscribe((data: any) => {
        this.show_payment_rules = data;
      }, (err) => console.log(err));
    }
  }


}
