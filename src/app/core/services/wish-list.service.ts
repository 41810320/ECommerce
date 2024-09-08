import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private readonly _HttpClient =inject(HttpClient);
  wishListid:WritableSignal<string[]> = signal([])

  constructor() { };

  addToWishList(id:string):Observable<any> { return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
    {"productId": id }
  )

}

RemoveEishList(id:string):Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
}

getWishList():Observable<any> {
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
}

}