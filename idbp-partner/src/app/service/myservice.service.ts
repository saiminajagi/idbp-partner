import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http: HttpClient) { 

  }

  setBank(bank:any):Observable<any>{
    return this.http.post<any>('/route/setBank',bank,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    })
  }
}
