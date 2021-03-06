import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor ( 
                private usuarioService: UsuariosService,
                private router:Router 
              ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.usuarioService.validarToken()
      .pipe(
        tap((estaAutenticado: boolean) =>{
          if(!estaAutenticado){
            this.router.navigateByUrl('/login');
          }
        })
      );
    }
  
}