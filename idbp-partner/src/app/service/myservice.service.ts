import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  baseURL: string = "https://platform.9.202.177.31.xip.io/api";

  TokenObj:any = {
    "username": "amit",
    "password": "Good@luck#1",
    "realm": "provider/default-idp-2",
    "client_id": "idbpappid",
    "client_secret": "idbpappsecret",
    "grant_type": "password"
  };
  tokenURL:string = this.baseURL+'/token';

  constructor(private http: HttpClient) { }

  setBank(bank:any):Observable<any>{
    return this.http.post<any>('/route/setBank',bank,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    })
  }

  sendLoginDetails(obj:any):Observable<any>{
    return this.http.post<any>('/route/loginConfirm',obj,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    })
  }

  sendQuickSignUpDetails(obj:any):Observable<any>{
    return this.http.post<any>('/route/quickSignupConfirm',obj,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    })
  }

  getAPIToken(obj:any):Observable<any>{
    return this.http.post<any>(this.tokenURL,this.TokenObj,{
      headers:
      new HttpHeaders({'Content-Type':'application/json',
                       'Acccept':'application/json' })
    })
  }


  getAPIList(){
    return this.http.get<any>('/route/getapilist',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  // createAPIAccount(obj):Observable<any>{
  //   return this.http.post()
  // }
}
