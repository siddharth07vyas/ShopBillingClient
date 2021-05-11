import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GlobalConstants} from '../common/global-constants';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  GetBillingInfo(){
    return this.http.get(GlobalConstants.productionURL +  'billing/getAll')
    .pipe(map((data: any) =>{
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );
    }))
  }

  SaveBillingInfo(billingObj: any){
    return this.http.post(GlobalConstants.productionURL +  'billing/addBilling', billingObj)
    .pipe(map((data: any) => {
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );}))
  }

  UpdateBillingInfo(billingObj: any, billingId: string){
    return this.http.put(GlobalConstants.productionURL +  'billing/updateBilling' + '/'+billingId, billingObj)
    .pipe(map((data: any) => {
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );}))
  }


  GetBillingInfoById(billingId: string){
    return this.http.get(GlobalConstants.productionURL + 'billing/getBillingById'+ '/'+billingId).pipe(map((data: any) => {
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );}))
  }
}
