import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { CartService } from '../../core/services/cart.service';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  categoryList:WritableSignal<ICategory[]> = signal([])
  categUnsub!:Subscription
  ngOnInit(): void {
   this.categUnsub =  this._CategoriesService.grtAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoryList.set(res.data)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  ngOnDestroy(): void {
    this.categUnsub?.unsubscribe()
  }
}
