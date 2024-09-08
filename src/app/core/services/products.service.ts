import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient =inject(HttpClient)

  getAllProducts():Observable <any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }


  getSpecificProducts(id:string | null):Observable <any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }

  getAllProductsExtra():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=2`)
  }

}
