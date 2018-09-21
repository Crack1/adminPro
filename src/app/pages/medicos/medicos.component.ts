import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = []
  totalRegistros: number = 0
  cargando: boolean = true

  constructor(
    public _MS: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos()
  }

  cargarMedicos() {
    this.cargando = true
    this._MS.cargarMedicos()
      .subscribe((res: any) => {
        console.log(res)
        this.medicos = res.medicos
        this.totalRegistros = res.total
      })
    this.cargando = false
  }
  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos()
      return
    }
    this.cargando = true
    this._MS.buscarMedicos(termino)
      .subscribe((res: any) => {
        this.totalRegistros = res.total
        this.medicos = res.medicos
        this.cargando = false
      })
  }
  crearMedico() { }
  guardarMedico(medico) { }
  borrarMedico(id: string) {
    this._MS.borrarMedico(id)
      .subscribe(() => {
        this.cargarMedicos()
      })
  }
  cambiarDesde(desde: number = 0) { }
  actualizarImagen(medico) { }

}
