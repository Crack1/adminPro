import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent {

  @ViewChild('txtProgress') txtProgress: ElementRef
  @Input() progreso: number = 50
  @Input() leyenda: string = 'Leyenda'

  @Output() cambioValor: EventEmitter<number> = new EventEmitter()

  constructor() { }


  onChanges(newValue: number) {
    //let elemHTML: any = document.getElementsByName('progreso')[0]
    if (newValue >= 100) { this.progreso = 100 }
    else if (newValue <= 0) { this.progreso = 0 }
    else {
      this.progreso = newValue
    }
    //elemHTML.value = this.progreso
    this.txtProgress.nativeElement.value = this.progreso
    this.cambioValor.emit(this.progreso)
    this.txtProgress.nativeElement.focus()
  }

  actualizar(valor: number) {
    console.log(valor)
    if (valor >= 0 && valor <= 100) {
      this.cambioValor.emit(valor)
    }
  }

}
