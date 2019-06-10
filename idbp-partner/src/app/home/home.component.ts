import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyserviceService } from '../service/myservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private myservice: MyserviceService) { 
    this.route.params.subscribe( params => {
      console.log(params);
      console.log("came here");
      var obj = {
        bank : params['bankname']
      }
      this.myservice.setBank(obj)
      .subscribe((data)=>{
        console.log("data is :"+data);
      },(err)=> console.log(err));
    });
  }

  ngOnInit() {
  }

}
