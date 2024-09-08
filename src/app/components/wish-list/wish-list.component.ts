import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { IWishList } from '../../core/interfaces/iwish-list';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {

  private readonly _WishListService =inject(WishListService);

  userWishList:IWishList[] | null = null;
  userId:string[] =[];

  ngOnInit(): void {
      this._WishListService.getWishList().subscribe({
        next: (res)=> {
          console.log(res.data)
         
          this.userWishList = res.data

          this.userId = res.data.map((product:any)=> product.id)
        }
      })
      }

  removeItemFromWishList(id:string):void{
    this._WishListService.RemoveEishList(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._WishListService.getWishList().subscribe({
          next: (res)=>{
            console.log(res.data)
            this.userWishList = res.data
          }
        })
      }
    })
  }

}
