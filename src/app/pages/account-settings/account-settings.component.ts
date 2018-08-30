import { Component, OnInit, ElementRef } from '@angular/core';


//Servicios
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck()
  }

  cambiarColor(tema: string, link: ElementRef) {
    this.aplicarCheck(link)
    this._ajustes.aplicarTema(tema)

  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector')
    for (let ref of selectores) {
      ref.classList.remove('working')
    }
    link.classList.add('working')
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector')
    let tema = this._ajustes.ajustes.tema
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') == tema) {
        ref.classList.add('working')
        break
      }
    }

  }
}

78403713
2243 - 3000
