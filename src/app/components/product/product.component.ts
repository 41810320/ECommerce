import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { WishListService } from '../../core/services/wish-list.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../core/interfaces/icart';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink , CurrencyPipe , TermTextPipe , SearchPipe , FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private readonly _ProductsService  = inject(ProductsService)
  private readonly _WishlistService = inject(WishListService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productList:WritableSignal<Product[]> = signal([])
  productList1:WritableSignal<Product[]> = signal([])
  wishlistIds: Signal<string[]> = computed(() =>
    this._WishlistService.wishListid()
  );
  data:string = ""
  productUnsub!:Subscription
  
  ngOnInit(): void {
   this.productUnsub =  this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productList.set(res.data)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   this.productUnsub =  this._ProductsService.getAllProductsExtra().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productList1.set(res.data)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        console.log(res);
  
        this._WishlistService.wishListid.set(
          res.data.map((item: any) => item._id)
        );
        console.log(this.wishlistIds());
      },
    });
  }
  addToWishList(id:string):void{
  this._WishlistService.addToWishList(id).subscribe({
    next:(res)=>{
      console.log(res); 
      this._WishlistService.wishListid.set(res.data);
    },
    error:(err)=>{
      console.log(err);
    }
  })
  }
  addToCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res.data);
      this._ToastrService.success(res.message , 'FreshCart')
      this._CartService.cartNumber.set(res.numOfCartItems)
    }
  })
  }
  
  deleteWishlist(id: string): void {
    this._WishlistService.RemoveEishList(id).subscribe({
      next: (res) => {
        this._WishlistService.wishListid.set(res.data);
      },
    });
  }
  ngOnDestroy(): void {
    this.productUnsub?.unsubscribe()
  }
}
