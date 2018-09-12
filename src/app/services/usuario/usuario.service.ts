import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario
  token: string
  constructor(public http: HttpClient, public router: Router, public _SAS: SubirArchivoService) {
    this.cargarStorage()
  }

  estaLogeado() {
    return (this.token.length > 5) ? true : false
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
    } else {
      this.token = ''
      this.usuario = null
    }
  }
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id)
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))
    this.usuario = usuario
    this.token = token
  }

  logout() {
    this.usuario = null
    this.token = ''
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    this.router.navigate(['/login'])

  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google'
    return this.http.post(url, { token })
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario)
        return true
      }))
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email)
    } else {
      localStorage.removeItem('email')
    }

    let url = URL_SERVICIOS + '/login'
    return this.http.post(url, usuario)
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario)
        return true
      }))
  }
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario'
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal({
          title: 'Usuario Creado',
          text: 'El usuario a sido creado correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
        return resp.usuario
      })
    )
  }
  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id
    url += '?token=' + this.token
    return this.http.put(url, usuario)
      .pipe(map((res: any) => {
        this.guardarStorage(res.usuario._id, this.token, res.usuario)
        swal({
          title: 'Usuario Actualizado',
          text: 'El usuario ' + this.usuario.nombre + ' a sido actualizado correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
        return true
      }))
  }
  cambiarImagen(archivo: File, id: string) {
    this._SAS.subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {
        this.usuario.img = res.usuario.img
        swal({
          title: 'Imagen usuario Actualizada',
          text: 'La imagen a sido actualizada correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.guardarStorage(id, this.token, this.usuario)
      })
      .catch(res => {
        console.log(res)
      })
  }
}