import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MyserviceService} from '../service/myservice.service';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-registerinterest',
  templateUrl: './registerinterest.component.html',
  styleUrls: ['./registerinterest.component.scss']
})
export class RegisterinterestComponent implements OnInit {

  fileForm: FormGroup;
  interestsubmit: Number = 0;
  fileData1: File;
  fileData2: File;
  @ViewChild('file1') User_Image;
  uploadedFiles: Array < File > ;
  myObj: any;
  
  constructor(private fb: FormBuilder, private myservice: MyserviceService, private http: HttpClient) {
    this.fileForm = this.fb.group({
      file1 : ['',Validators.required],
      file2 : ['',Validators.required]
    });
   }

  onInterestSubmit(){
    this.myservice.getInterest()
    .subscribe((data)=>{
      console.log('signup details recived: '+JSON.stringify(data));
      this.interestsubmit = 1;
      //this data has the details.
      this.myservice.sendInterest(data)
      .subscribe((data)=>{
        console.log(data);
      },(err)=> console.log(err));

    },(err)=>console.log(err));
  }

  ngOnInit() {  }


  fileChange(element) {
    //this.uploadedFiles = element.target.files;
    if(element.target.files && element.target.files.length){
      var [file] = element.target.files;
      this.fileData1 = file;
    }
  }


  onfileSubmit(){

    var formData = new FormData();

    formData.append('excel', this.fileData1);
    console.log(formData);
    
    const params = new HttpParams();

    const options = {
        params,
        reportProgress: true,
    };

    // const req = new HttpRequest('POST', 'http://0.0.0.0:4000/v1/matric', formData, options);
    // this.http.request(req).subscribe(console.log)

    //====================================================================================================
    // var Image = this.User_Image.nativeElement;
    // if( Image.files && Image.files[0]){
    //   this.fileData1 = Image.files[0]
    // }
    // var ImageFile:File = this.fileData1;
    // console.log(ImageFile);

    // var formData: FormData = new FormData();
    // for (var i = 0; i < this.uploadedFiles.length; i++) {
    //   formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    // } 
    // formData.append('file1',ImageFile,ImageFile.name);

    // var myObj = {
    //   name : "tushar",
    //   file : formData 
    // }
    
    this.myservice.sendFiles(formData)
    .subscribe((data)=>{
      console.log(data);
    },(err)=>console.log(err));
  }

  onUpload(){

  }
}
