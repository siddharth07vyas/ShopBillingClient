import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GlobalConstants} from '../common/global-constants';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Product } from 'src/models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  GetProducts(){
    return this.http.get(GlobalConstants.devURL +  'product/getAll')
    .pipe(map((data: Product) =>{
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );
    }))
  }

  SaveProduct(productObj: Product){
    return this.http.post(GlobalConstants.devURL +  'product/addProduct', productObj)
    .pipe(map((data: any) => {
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );}))
  }

  UpdateProduct(productObj: Product, productId: string){
    return this.http.put(GlobalConstants.devURL +  'product/updateProduct' + '/'+productId, productObj)
    .pipe(map((data: any) => {
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );}))
  }

  DeleteProduct(productId: string){
    return this.http.delete(GlobalConstants.devURL + 'product/deleteProduct' + '/'+ productId)
    .pipe(map((data: any) => {
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );}))
  }

  GetProductById(productId: string){
    return this.http.get(GlobalConstants.devURL + 'product/getProductById'+ '/'+productId).pipe(map((data: any) => {
      return data;
    }), catchError( error => {return throwError( 'Something went wrong!' );}))
  }
}
