import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService} from '../service/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quicksignup',
  templateUrl: './quicksignup.component.html',
  styleUrls: ['./quicksignup.component.scss']
})
export class QuicksignupComponent implements OnInit {

  QuickSignUpForm: FormGroup;
  sent =0;

  constructor(private fb: FormBuilder, private myservice: MyserviceService,private router: Router) { }

  ngOnInit() {
    this.QuickSignUpForm = this.fb.group({
      email:['',[Validators.required]],
      pass:['',[Validators.required]],
      name:['',[Validators.required]],
      org: ['',[Validators.required]]
    });
  }
  onSubmit(){

    this.sent= 1;

    var myObj = {
      email: this.QuickSignUpForm.controls.email.value,
      pass: this.QuickSignUpForm.controls.pass.value,
      name: this.QuickSignUpForm.controls.name.value,
      org : this.QuickSignUpForm.controls.org.value
    }
    this.myservice.sendQuickSignUpDetails(myObj)
    .subscribe(
    (data : any) => {
      if(data.status){
        this.router.navigateByUrl('/dashboard');
      }else{
        alert(data.msg);
      }
    },
    (error: any) => console.log('error')
  );

  }
}
