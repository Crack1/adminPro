import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario
  imagenSubir: File
  imagenTemporal
  constructor(public _US: UsuarioService) {
    this.usuario = _US.usuario
  }

  ngOnInit() {
  }
  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre
    if (!this.usuario.google) {
      this.usuario.email = usuario.email
    }
    this._US.actualizarUsuario(this.usuario)
      .subscribe((res) => {
        console.log(res)
      })
  }
  seleccionImagen(archivo) {
    if (!archivo) {
      this.imagenSubir = null
      return
    }
    if (archivo.type.indexOf('image')) {
      swal({
        title: 'ERrOR',
        text: 'El archvo seleccionado debe de ser una imagen',
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
      this.imagenSubir = null

    }
    this.imagenSubir = archivo
    let reader = new FileReader()
    let urlImagenTemp = reader.readAsDataURL(archivo)
    reader.onloadend = () => this.imagenTemporal = reader.result

  }
  cambiarImagen() {
    this._US.cambiarImagen(this.imagenSubir, this.usuario._id)
  }
}
