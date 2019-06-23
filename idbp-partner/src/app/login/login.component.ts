import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService} from '../service/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  sent =0;

  constructor(private fb: FormBuilder, private myservice: MyserviceService,private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['',[Validators.required]],
      pass:['',[Validators.required]],
    });
  }

  onSubmit(){
    var myObj = {
      email: this.loginForm.controls.email.value,
      pass: this.loginForm.controls.pass.value,
    }
    this.myservice.sendLoginDetails(myObj)
    .subscribe(
    (data : any) => {
      console.log(data);
      if(data.status){
        // this.router.navigateByUrl('/home/ybl');
        window.location.href = 'http://idbppartner.bank.com:9000/home/ybl';
      }else{
        alert(data.msg);
      }
    },
    (error: any) => console.log('error')
  );
  }


}
