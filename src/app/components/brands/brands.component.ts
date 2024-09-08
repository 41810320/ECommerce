import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsService } from '../../core/servives/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService)
detailsBrands:Ibrands | null = null
brands:WritableSignal<Ibrands[]> = signal([])
brandsUnsub!:Subscription


ngOnInit(): void {
 this.brandsUnsub =  this._BrandsService.getBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.brands.set(res.data)
    },
    error:(err)=>{
      console.log(err); 
    }
  })
}
getSpecificBrand(id:string):void{
  this._BrandsService.getSpecificBrands(id).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.detailsBrands = res.data
    }
  })
}
ngOnDestroy(): void {
  this.brandsUnsub?.unsubscribe()
}

}
