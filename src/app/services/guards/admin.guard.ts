import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public _US: UsuarioService,
    public router: Router
  ) { }
  canActivate() {
    if (this._US.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log(`Bloqueado por Admin Guard`)
      //this.router.navigate(['/login'])
      this._US.logout()
      return false
    }
  }
}
