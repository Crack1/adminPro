import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-uploads.service';

@Component({
  selector: 'app-modal-uploads',
  templateUrl: './modal-uploads.component.html',
  styles: []
})
export class ModalUploadsComponent implements OnInit {
  //oculto: string = ''
  imagenSubir: File
  imagenTemporal: any

  constructor(public _SAS: SubirArchivoService, public _MUS: ModalUploadService) {
  }

  ngOnInit() {
  }

  seleccionImagen(archivo) {
    if (!archivo) {
      this.imagenSubir = null
      return
    }
    if (archivo.type.indexOf('image')) {
      swal({
        title: 'ERROR',
        text: 'El archivo seleccionado debe de ser una imagen',
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
  subirImagen() {
    this._SAS.subirArchivo(this.imagenSubir, this._MUS.tipo, this._MUS.id)
      .then((res) => {
        this._MUS.notificacion.emit(res)
        this.cerrarModal()
      })
      .catch((err) => {
        console.log(`Error en la carga... `, err)
      })
  }
  cerrarModal() {
    this.imagenTemporal = null
    this.imagenSubir = null
    this._MUS.ocultarModal()
  }
}
