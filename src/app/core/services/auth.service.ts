import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private readonly  _HttpClient= inject(HttpClient)
private readonly  _Router= inject(Router)

userData:any = null;


setRegisterForm(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data )
}

setLoginForm(data:object):Observable <any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data )
}

saveUserDat():any{
  if(localStorage.getItem('userToken') !== null){
   return this.userData =  jwtDecode(localStorage.getItem('userToken') ! ); 
    console.log('userData' , this.userData)
  }
}

logout():void {
 localStorage.removeItem ('userToken');
 this.userData =null ;
this._Router.navigate(['/login'])
}


setEmailVerify(data:object):Observable<any> {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data )
}

setCodeVerify(data:object):Observable<any> {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data )
}

setRestPass(data:object):Observable<any> {
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data )
}


}
