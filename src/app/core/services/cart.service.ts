import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient :HttpClient) { };

  cartNumber: WritableSignal<number> = signal(0);


  addProductToCart(id:string): Observable<any>{
    return this._HttpClient.post(
       `${environment.baseUrl}/api/v1/cart` ,
       {"productId": id}
      )
  }

  getProductsCart(): Observable<any>{
    return this._HttpClient.get(
       `${environment.baseUrl}/api/v1/cart` 
      )
  }

  deleteSpecificCartItem(id: string): Observable<any>{
    return this._HttpClient.delete(
       `${environment.baseUrl}/api/v1/cart/${id}` 
      )
  }

  updateProductQuantity(id: string , newCount: number): Observable<any>{
    return this._HttpClient.put(
       `${environment.baseUrl}/api/v1/cart/${id}` ,
       {"count": newCount}
      )
  }

  clearCart(): Observable<any>{
    return this._HttpClient.delete(
       `${environment.baseUrl}/api/v1/cart` 
      )
  }

}
