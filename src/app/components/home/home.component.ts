import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ICategory } from '../../core/interfaces/icategory';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../core/services/wish-list.service';
import { IWishList } from '../../core/interfaces/iwish-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink ,CurrencyPipe ,SalePipe ,TermTextPipe ,SearchPipe ,FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{


private readonly _ProductsService = inject(ProductsService);
private readonly _categoriesService = inject(CategoriesService);
private readonly _CartService = inject(CartService);
private readonly _ToastrService = inject(ToastrService);
private readonly _NgxSpinnerService = inject(NgxSpinnerService);
private readonly _WishListService = inject(WishListService);





productList:Iproduct[] =[];
categoriesList:ICategory[] =[];
text: string =" ";
wishlistIds: Signal<string[]> = computed(() => this._WishListService.wishListid());

getAllProductSub !:Subscription

customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause :true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}

customOptionsCat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause :true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

ngOnInit(): void {

  this._categoriesService.grtAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.categoriesList = res.data;
    },
  })

  this._WishListService.getWishList().subscribe({
    next: (res)=>{
      console.log(res.data);
      this._WishListService.wishListid.set(res.data.map( (item:any)=> item.id ));
    }
  })

  this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({

      next:(res)=>{
        console.log(res.data);
        this.productList = res.data;
      },

      error: (err)=>{
        console.log(err)
      }


    })
}

ngOnDestroy(): void {
   this.getAllProductSub?.unsubscribe 
}

addCart(id: string): void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._ToastrService.success(res.message , 'FreshCart');

      this._CartService.cartNumber.set(res.numOfCartItems);

    } 
 
  })
}

userWishList:IWishList [] = []

addToWishList(id:string){
  this._WishListService.addToWishList(id).subscribe({
    next: (res)=>{
      console.log(res)
      this._WishListService.wishListid.set(res.data)
    }
  })
}

removeWishList(id:string){
  this._WishListService.RemoveEishList(id).subscribe({
    next: (res)=>{
      console.log(res)
      this._WishListService.wishListid.set(res.data)
    }
  })
}

}
