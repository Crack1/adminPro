import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert2';
import { retry } from 'rxjs/operators';
import { element } from 'protractor';
import { ModalUploadService } from '../../components/modal-uploads/modal-uploads.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = []
  desde: number = 0
  totalRegistros: number = 0
  cargando: boolean = true
  link: boolean = true
  constructor(public _US: UsuarioService, public _MUS: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios()
    this._MUS.notificacion.subscribe((res) => {
      this.cargarUsuarios()
    })
  }
  mostrarModal(id: string) {
    this._MUS.mostrarModal('usuarios', id)
  }
  cargarUsuarios() {
    this.cargando = true
    this._US.cargarUsuarios(this.desde)
      .subscribe((res: any) => {
        this.totalRegistros = res.total
        this.usuarios = res.usuarios
      })
    this.cargando = false
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
    this.cargarUsuarios()
  }
  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios()
      return
    }
    this.cargando = true
    this._US.buscarUsuarios(termino)
      .subscribe((res: any) => {
        this.totalRegistros = res.total
        this.usuarios = res.usuarios
        this.cargando = false
      })
  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._US.usuario._id) {
      swal({
        title: 'No puede borrar Usuario',
        text: 'No se puede borrar a si mismo',
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
      return
    }
    swal({
      title: 'Esta seguro?',
      text: "No podra revetir los cambios, esta a punto de borrar el usuario " + usuario.nombre + "!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
        this._US.borrarUsuario(usuario._id)
          .subscribe((res: any) => {
            console.log(res)
            this.cargarUsuarios()
          })
      }
    })
  }
  guardarUsuario(usuario: Usuario) {
    this._US.actualizarUsuario(usuario).subscribe()
    this.cargarUsuarios()
  }

  cambiarVivo(usuario: string) {

    document.getElementById(usuario).getElementsByTagName('a')[0].remove()
    let select = document.getElementById(usuario).getElementsByTagName('select')[0]

    select.classList.remove('hidden')
    select.classList.add('visible')



  }
}
