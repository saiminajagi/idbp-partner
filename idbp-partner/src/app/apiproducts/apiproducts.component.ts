import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';


@Component({
  selector: 'app-apiproducts',
  templateUrl: './apiproducts.component.html',
  styleUrls: ['./apiproducts.component.scss']
})
export class ApiproductsComponent implements OnInit {

  image: any = '../../assets/product-icon.png';
  apilist: any;


  constructor(private myservice: MyserviceService) {
    this.myservice.getAPIList()
    .subscribe((data) => {
      console.log(data);
      this.apilist = JSON.stringify(data);
    }, (err) => console.log(err));

    console.log(this.apilist.results[1].id+'hi');
    console.log('sai');
   }

  ngOnInit() {
  }

}
