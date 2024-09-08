import { ISubCategorus } from './../../core/interfaces/i-sub-categorus';
import { Component, inject } from '@angular/core';
import { SubCategorisService } from '../../core/services/sub-categoris.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-categoris',
  standalone: true,
  imports: [],
  templateUrl: './sub-categoris.component.html',
  styleUrl: './sub-categoris.component.scss'
})
export class SubCategorisComponent {
  private readonly _SubCategorisService = inject(SubCategorisService)
private readonly _ActivatedRoute = inject(ActivatedRoute)
categId:string | null = null
categoryList:ISubCategorus[] = []
text:string = ""
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      console.log(p.get('id'));
      this.categId = p.get('id')
    }
  })
  this._SubCategorisService.getAllSubCategories(this.categId).subscribe({
    next:(res)=>{
      if(res.data.length > 0){
        console.log(res.data);
        this.categoryList = res.data
      }else{
        this.text = 'NoDAtaFound'
      }
      
    }
  })
}
  }


