import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form-interface';
import { RegisterForm } from '../interfaces/register-form-interface';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable, interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {

  public auth2:any;

  constructor( 
              private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) 
  {
                
                this.googleInit();
  }

  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '32297520427-k97ed046dhtq0n6qqekevp1vqpaklstq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });
    })
  }

  logout(){
    localStorage.removeItem("token");
    
    this.auth2.signOut().then(() => {
      this.ngZone.run( () =>{
        this.router.navigateByUrl("/login");   
      })
      console.log('User signed out.');
    });
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    console.log("validarToken", token);
    
    return this.http.post(`${base_url}/login/renew`, {} ,{
      headers:{
        'x-token' : token
      }
    })
    .pipe(
      tap( ( resp:any ) => {
        localStorage.setItem("token", resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  login( formData: LoginForm ){
    return this.http.post(`${base_url}/login`, formData)
    .pipe( 
      map( (resp :any ) => {
        console.log(formData);
        
        if(formData.remember){
          localStorage.setItem("remember", formData.email);
        }else{
          localStorage.removeItem("remember");
        }
        localStorage.setItem("token", resp.token);
        return true;
      })
    );
  }

  loginGoogle( token: string ){
    return this.http.post(`${base_url}/login/google`, { token })
    .pipe( 
      map( (resp :any ) => {
        console.warn("Logeando con GOOGLE");
        localStorage.setItem("token", resp.token);
        return true;
      })
    );
  }
}
