import './polyfills.server.mjs';
import{a}from"./chunk-CBYSDMSX.mjs";import{k as u}from"./chunk-ZIYERYGL.mjs";import{x as p}from"./chunk-HAIROEPU.mjs";import{S as c,Y as l}from"./chunk-3BG2KQPV.mjs";var s=class extends Error{};s.prototype.name="InvalidTokenError";function d(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,o)=>{let e=o.charCodeAt(0).toString(16).toUpperCase();return e.length<2&&(e="0"+e),"%"+e}))}function f(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return d(t)}catch{return atob(t)}}function h(r,t){if(typeof r!="string")throw new s("Invalid token specified: must be a string");t||(t={});let o=t.header===!0?0:1,e=r.split(".")[o];if(typeof e!="string")throw new s(`Invalid token specified: missing part #${o+1}`);let i;try{i=f(e)}catch(n){throw new s(`Invalid token specified: invalid base64 for part #${o+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new s(`Invalid token specified: invalid json for part #${o+1} (${n.message})`)}}var k=(()=>{let t=class t{constructor(){this._HttpClient=l(p),this._Router=l(u),this.userData=null}setRegisterForm(e){return this._HttpClient.post(`${a.baseUrl}/api/v1/auth/signup`,e)}setLoginForm(e){return this._HttpClient.post(`${a.baseUrl}/api/v1/auth/signin`,e)}saveUserDat(){if(localStorage.getItem("userToken")!==null)return this.userData=h(localStorage.getItem("userToken"))}logout(){localStorage.removeItem("userToken"),this.userData=null,this._Router.navigate(["/login"])}setEmailVerify(e){return this._HttpClient.post(`${a.baseUrl}/api/v1/auth/forgotPasswords`,e)}setCodeVerify(e){return this._HttpClient.post(`${a.baseUrl}/api/v1/auth/verifyResetCode`,e)}setRestPass(e){return this._HttpClient.put(`${a.baseUrl}/api/v1/auth/resetPassword`,e)}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=c({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();export{k as a};
