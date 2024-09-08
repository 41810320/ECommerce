import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _Router =inject(Router);
  private readonly _AuthService =inject(AuthService);

  msgError:string ="";
  isLoading :boolean =false;
  msgSuccess :boolean =false;
  
  loginForm:FormGroup = this._FormBuilder.group({
      email :[null , [Validators.required , Validators.email]],
      password :[null , [Validators.required ,Validators.pattern(/^\w{6,}$/)]],
  })

  loginSubmit():void{
  if(this.loginForm.valid){

    this.isLoading = true;


    this._AuthService.setLoginForm(this.loginForm.value).subscribe( {
      // next:(res)=>{
      //  if(res.message == 'success'){
      //   this.msgSuccess = true;
      //   console.log(res);

      //     localStorage.setItem('userToken',res.token);
      //     this._AuthService.userData();

      //     this._Router.navigate(['/home'])
      //  }
 
      //   this.isLoading = false;
      // },

      
      // 
     
      next:(response)=>{

        if (response.message === 'success') {
          this.msgSuccess = true;
          localStorage.setItem('userToken',response.token)
          this._AuthService.saveUserDat();
          this._Router.navigate(['/home'])
          this.isLoading = false;
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.msgError = err.error.message

        console.log(err);
        this.isLoading = false;
      }
    })
    

  }  

  else{
    this.loginForm.setErrors({mismatch: true}), 
    this.loginForm.markAllAsTouched()
  }
}




}
