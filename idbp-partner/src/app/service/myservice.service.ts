import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    return this.http.post<any>('/route/setbank',bank,{
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

  checkLogin(){
    return this.http.get<any>('/route/checklogin',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  logout(){
    return this.http.get<any>('/route/logout',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
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

  getInterest(){
    return this.http.get<any>('/route/getInt',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  sendInterest(obj:any):Observable<any>{
    return this.http.post<any>('http://idbpportal.bank.com:3000/route/sendInterest',obj,{
      headers:
      new HttpHeaders({'Content-Type':'application/json' })
    })
  }
  // createAPIAccount(obj):Observable<any>{
  //   return this.http.post()
  // }
  sendFiles(obj:any):Observable<any>{
    return this.http.post('http://idbpportal.bank.com:3000/files/fileupload',obj,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json',
                        'Accept': 'application/json'})
    })
  }

  getPartnerProfileDetails():Observable<any>{
    return this.http.get<any>('route/profile', {
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  getPaymentRulesDetails():Observable<any>{
    return this.http.get<any>('route/paymentrulesdetails', {
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  checkPermitted(){
    return this.http.get<any>('/route/checkPermitted',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    })
  }
}
