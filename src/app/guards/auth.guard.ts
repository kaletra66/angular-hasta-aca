import { compileNgModule } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { tap, map } from 'rxjs/operators';

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
      console.log(" pase por el canActivate del guard ");
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
