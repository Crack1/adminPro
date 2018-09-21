import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  token: string = localStorage.getItem('token')
  medico: Medico
  constructor(public http: HttpClient, public _US: UsuarioService) { }

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde
    return this.http.get(url)
  }

  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino
    return this.http.get(url)
      .pipe(map((res: any) => {
        return { medicos: res.medicos, total: res.total }
      }))
  }

  obtenerMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id
    return this.http.get(url)
      .pipe(map((res: any) => {
        return { medico: res.medico }
      }))
  }
  actualizarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico/' + medico._id
    url += '?token=' + this.token
    return this.http.put(url, medico)
      .pipe(map((res: any) => {
        swal({
          title: 'Medico Actualizado',
          text: 'El medico ' + res.medico.nombre + ' a sido actualizado correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
        return true
      }))
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id
    url += '?token=' + this._US.token
    return this.http.delete(url).pipe(map(
      (res: any) => {
        swal({
          title: 'Medico Eliminado',
          text: 'El medico a sido eliminado correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
    ))
  }
  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico'

    if (medico._id) {
      //ACTUALIZACION
      url += '/' + medico._id
      url += '?token=' + this._US.token
      return this.http.put(url, medico)
        .pipe(map((res: any) => {
          swal({
            title: 'Medico Actualizado',
            text: 'El medico a sido actualizado correctamente',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          return res
        }))
    } else {
      //CREANDO
      url += '?token=' + this._US.token
      return this.http.post(url, medico)
        .pipe(
          map((res: any) => {
            swal({
              title: 'Medico Creado',
              text: 'El medico a sido creado correctamente',
              type: 'success',
              confirmButtonText: 'Aceptar'
            })
            return res
          })
        )
    }


  }
  cargarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id
    url += '?token=' + this._US.token
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          return res.medico
        })
      )
  }
}

