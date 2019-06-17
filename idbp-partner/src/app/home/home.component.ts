import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyserviceService } from '../service/myservice.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

image: any = '../../assets/carosel.jpg';
apilist: Array<String> = ['atm branch locator', 'insurance', 'payments'];

  constructor(private route: ActivatedRoute, private myservice: MyserviceService, config: NgbCarouselConfig) {

    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    this.route.params.subscribe( params => {
      console.log(params);
      console.log('came here');
      let obj = {
        bank : params.bankname
      };
      this.myservice.setBank(obj)
      .subscribe((data) => {
        console.log('data is :'+ data);
      }, (err) => console.log(err));
    });
  }

  ngOnInit() {
  }

}
