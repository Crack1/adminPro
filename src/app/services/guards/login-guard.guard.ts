import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _US: UsuarioService, public router: Router) { }
  canActivate() {
    if (this._US.estaLogeado()) {
      console.log(`Paso por el login Guard LOGEADO`)
      return true
    } else {
      console.log(`BLOQUEADO POR EL GUARD`)
      this.router.navigate(['/login'])
      return false
    }


  }
}
