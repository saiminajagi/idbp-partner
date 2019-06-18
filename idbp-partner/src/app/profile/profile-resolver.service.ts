import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MyserviceService } from '../service/myservice.service';
import { Injectable } from '@angular/core';

@Injectable()

export class PartnerProfileResolverService implements Resolve<any>{

  constructor(private myservice: MyserviceService){ }

  resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    return this.myservice.getPartnerProfileDetails();
}

}
