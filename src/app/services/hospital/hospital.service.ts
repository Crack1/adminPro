import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token: string = localStorage.getItem('token')
  hospital: Hospital
  constructor(public http: HttpClient, public _US: UsuarioService) { }
  cargarHospitales(desde: number = 0) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde
    return this.http.get(url)
  }

  buscarHospitales(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino
    return this.http.get(url)
      .pipe(map((res: any) => {
        return { hospitales: res.hospitales, total: res.total }
      }))
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id
    return this.http.get(url)
      .pipe(map((res: any) => {
        return { hospital: res.hospital }
      }))
  }
  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id
    url += '?token=' + this.token
    return this.http.put(url, hospital)
      .pipe(map((res: any) => {
        swal({
          title: 'Hospital Actualizado',
          text: 'El hospital ' + res.hospital.nombre + ' a sido actualizado correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
        return true
      }))
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id
    url += '?token=' + this._US.token
    return this.http.delete(url).pipe(map(
      (res: any) => {
        swal({
          title: 'Hospital Eliminado',
          text: 'El hospital a sido eliminado correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
    ))
  }
  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital'
    url += '?token=' + this._US.token
    return this.http.post(url, { nombre, img: 'test.png' })
      .pipe(
        map((re: any) => {
          swal({
            title: 'Hospital Creado',
            text: 'El hospital a sido creado correctamente',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        })
      )
  }
}
