import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-uploads/modal-uploads.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = []
  medico: Medico = new Medico('', '', '', '', '')
  hospital: Hospital = new Hospital('')
  constructor(
    public _MS: MedicoService,
    public _HS: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUpload: ModalUploadService
  ) {
    activateRoute.params.subscribe((params) => {
      let id = params['id']
      if (id != 'nuevo') {
        this.cargarMedico(id)
      }
    })
  }

  ngOnInit() {
    this._HS.cargarHospitales()
      .subscribe((res: any) => {
        this.hospitales = res.hospitales
      })
    this._modalUpload.notificacion
      .subscribe((res: any) => {
        this.medico.img = res.medico.img
      })
  }

  guardarMedico(f: NgForm) {
    if (!f.valid) {
      return
    }
    this._MS.guardarMedico(this.medico)
      .subscribe((res: any) => {
        this.medico._id = res.medico._id
        this.router.navigate(['/medico', res.medico._id])
      })

  }

  cambioHospital(id: string) {
    this._HS.obtenerHospital(id)
      .subscribe((res: any) => {
        this.hospital = res.hospital
      })
  }
  cargarMedico(id: string) {
    this._MS.cargarMedico(id)
      .subscribe((res: any) => {
        this.medico = res
        this.medico.hospital = res.hospital._id
        this.cambioHospital(this.medico.hospital)
      })
  }
  cambiarFoto() {
    this._modalUpload.mostrarModal('medicos', this.medico._id)
  }
}
