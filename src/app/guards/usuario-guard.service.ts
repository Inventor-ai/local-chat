import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor( public  WebSocketService: WebSocketService,
               private router: Router) { }

  canActivate() {
    // Fallaba porque en webSocketLogOut no se podía: this.usuario = null;
    // Se implementó null en la declaración de la propiedad
    if (this.WebSocketService.usuarioGet()) {  // Video version
        return true;
    } else {
        this.router.navigateByUrl('/');
        return false;
    }
  }
}

/*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
*/
