import { Injectable, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string
  public id: string
  public oculto: string = 'oculto'
  public notificacion = new EventEmitter<any>()
  constructor() {
    console.log(`modal`)
  }
  ocultarModal() {
    this.oculto = 'oculto'
    this.id = null
    this.tipo = null
  }
  mostrarModal(tipo: string, id: string) {
    this.oculto = ''
    this.id = id
    this.tipo = tipo
  }

}