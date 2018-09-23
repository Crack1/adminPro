import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario
  token: string
  menu: any = []
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
      this.menu = JSON.parse(localStorage.getItem('menu'))
    } else {
      this.token = ''
      this.usuario = null
      this.menu = null
    }
  }
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id)
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))
    localStorage.setItem('menu', JSON.stringify(menu))
    this.usuario = usuario
    this.token = token
    this.menu = menu
  }

  logout() {
    this.usuario = null
    this.token = ''
    this.menu = []
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('id')
    localStorage.removeItem('menu')
    this.router.navigate(['/login'])

  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google'
    return this.http.post(url, { token })
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu)
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
        this.guardarStorage(res.id, res.token, res.usuario, res.menu)
        return true
      }), catchError((res) => {
        return Observable.throw(res)
      })
      )
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
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(res.usuario._id, this.token, res.usuario, this.menu)
        }
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
        this.guardarStorage(id, this.token, this.usuario, this.menu)
      })
      .catch(res => {
        console.log(res)
      })
  }
  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde
    return this.http.get(url)
  }
  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino
    return this.http.get(url)
      .pipe(map((res: any) => {
        return { usuarios: res.usuarios, total: res.total }
      }))
  }
  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token
    return this.http.delete(url)
      .pipe(map((res) => {
        swal(
          'Borrado!',
          'El Usuario a sido borrado.',
          'success'
        )
        return true
      }))
  }
}
