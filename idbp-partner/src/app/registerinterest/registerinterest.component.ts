import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MyserviceService} from '../service/myservice.service';

@Component({
  selector: 'app-registerinterest',
  templateUrl: './registerinterest.component.html',
  styleUrls: ['./registerinterest.component.scss']
})
export class RegisterinterestComponent implements OnInit {

  fileUploadForm: FormGroup;
  interestsubmit: Number = 0;

  constructor(private fb: FormBuilder, private myservice: MyserviceService) { }

  onInterestSubmit(){
    this.myservice.getInterest()
    .subscribe((data)=>{
      console.log(data);
      this.interestsubmit = 1;
      //this data has the details.
      this.myservice.sendInterest(data)
      .subscribe((data)=>{
        console.log(data);
      },(err)=> console.log(err));

    },(err)=>console.log(err));
  }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      file1: ['', [Validators.required]],
      file2: ['', [Validators.required]]
    });
  }

  onfileSubmit(){
    var myObj = {
      file1: this.fileUploadForm.controls.file1.value,
      file2: this.fileUploadForm.controls.file2.value
    };

    this.myservice.sendFilestoBM(myObj)
    .subscribe(
      (data: any) => {
        console.log(data);
      }, (err: any) => console.log(err));


  }

}
