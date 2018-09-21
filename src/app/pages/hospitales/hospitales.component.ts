import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-uploads/modal-uploads.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  desde: number = 0
  hospitales: Hospital[] = []
  hospital: Hospital
  hospitalNombre
  totalRegistros: number = 0
  cargando: boolean = true
  action: boolean = false
  ctrlID: string
  constructor(public _HS: HospitalService, public _MUS: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales()
    this._MUS.notificacion.subscribe((res) => {
      this.cargarHospitales()
    })
  }

  cargarHospitales() {
    this.cargando = true
    this._HS.cargarHospitales(this.desde)
      .subscribe((res: any) => {
        this.totalRegistros = res.total
        this.hospitales = res.hospitales
        this.cargando = false
      })
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales()
      return
    }
    this.cargando = true
    this._HS.buscarHospitales(termino)
      .subscribe((res: any) => {
        this.totalRegistros = res.total
        this.hospitales = res.hospitales
        this.cargando = false
      })
  }
  actualizarImagen(hospital: Hospital) {
    this._MUS.mostrarModal('hospitales', hospital._id)
  }
  borrarHospital(id: string) {
    this._HS.borrarHospital(id)
      .subscribe(() => {
        this.cargarHospitales()
      })
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor
    if (desde >= this.totalRegistros) {
      return
    }
    if (desde < 0) {
      return
    }
    this.desde += valor
    this.cargarHospitales()
  }
  editarHospital(id: string) {
    this.ctrlID = id
  }
  guardarHospital(hospital: Hospital) {
    if (hospital.nombre.length == 0) {
      return
    }
    this._HS.actualizarHospital(hospital).subscribe((res) => {
      this.cargarHospitales()
    })
    this.ctrlID = null
  }
  crearHospital() {


    swal({
      title: 'Agregar Hospital',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'You need to write something!'
      }
    }).then((res) => {
      this._HS.crearHospital(res.value).subscribe((res) => {
        this.cargarHospitales()
      })
    })

  }

}
