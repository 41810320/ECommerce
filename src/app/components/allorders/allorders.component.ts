import { Component, inject, OnInit } from '@angular/core';
import { AllOrdersService } from '../../core/services/all-orders.service';
import { AuthService } from '../../core/services/auth.service';
import { IallOrders } from '../../core/interfaces/iall-orders';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

private readonly _AllOrdersService =inject(AllOrdersService);
private readonly _AuthService =inject(AuthService);
userOrders:IallOrders [] = [];

ngOnInit(): void {
    let userId = this._AuthService.saveUserDat()
    this._AllOrdersService.getUserOrders(userId.id).subscribe({
      next:(res)=>{
        console.log(res)
        this.userOrders = res
      }
    })
}

}
