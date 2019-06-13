import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MyserviceService} from '../service/myservice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registerinterest',
  templateUrl: './registerinterest.component.html',
  styleUrls: ['./registerinterest.component.scss']
})
export class RegisterinterestComponent implements OnInit {

  fileForm: FormGroup;
  interestsubmit: Number = 0;
  fileData1: File = null;
  fileData2: File = null;
  fileArray: Array<2>;
  myObj: any;
  constructor(private fb: FormBuilder, private myservice: MyserviceService, private http: HttpClient) { }

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

  }

<<<<<<< HEAD
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
=======
  // fileProgress(fileInput: any) {
  //   this.fileData1 = <File>fileInput.target.files[0];
  //   this.fileData2 = <File>fileInput.target.files[1];

  //   console.log("Number of files: "+fileInput.target.files.length);
  //   for(let file of fileInput.target.files){
  //     this.fileArray.push(file);
  //   }
  //   console.log("Files recieved are: ");
  //   console.log(this.fileArray);
  // }

  onInterestSubmit(){
    this.interestsubmit = 1;
  }

  // onfileSubmit(){

  //   var formData1 = new FormData();
  //   var formData2 = new FormData();

  //   formData1.append('file',this.fileData1);
  //   formData2.append('file',this.fileData2);

  //   this.myObj.push(formData1);
  //   this.myObj.push(formData2);
>>>>>>> ced1cb049c02aa4bad245caf57449c56cb43bac7

  //   this.myservice.sendFiles(this.myObj)
  //   .subscribe((data)=>{
  //     console.log(data);
  //   },(err)=>console.log(err));
  // }

  selectedFile:File = null;
  fileArrayObj:File[] = [];

  onFileSelected(event){
    console.log(event.target.files[0]);
    this.selectedFile = <File>event.target.files[0];

    var fd = new FormData();
    fd.append('file',this.selectedFile,this.selectedFile.name);

    var myObj = {
      file : fd
    }
    this.myservice.sendFiles(myObj)
    .subscribe((data)=>{
      console.log(data);
    },(err)=>console.log(err));

    this.fileArrayObj.push(event.target.files[0]);
    console.log("the file array recived is: "+JSON.stringify(this.selectedFile));
  }

  onUpload(){

  }
}
