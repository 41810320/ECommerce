import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);

  cartDetails : ICart = {} as ICart 


  ngOnInit(): void {
      this._CartService.getProductsCart().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.cartDetails = res.data
          },
        error:(err)=>{
          console.log(err);
        }  
      })
    }

    removeItem(id: string){
      this._CartService.deleteSpecificCartItem(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.cartDetails = res.data
          this._CartService.cartNumber.set(res.numOfCartItems)
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }

    updateCount(id:string , count:number):void{
    if(count > 0){
      this._CartService.updateProductQuantity(id , count).subscribe({
        next:(res)=>{
          console.log(res)
          this.cartDetails = res.data

        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
    else{
      this.removeItem(id)
    }
    }

    clearItems():void{
      this._CartService.clearCart().subscribe({
        next:(res)=>{
          console.log(res);
         if(res.massage == 'success'){
            this.cartDetails = {} as ICart;
            this._CartService.cartNumber.set(0);
         }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
}
