import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription
  constructor() {

    this.subscription = this.regresaObservable().subscribe(numero => {
      console.log(numero)
    }, error => {
      console.log('Error ' + error)
    }, () => {
      console.log('TERMINO')
    })
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    console.log(`La pagina se cerrara`)
    this.subscription.unsubscribe()

  }

  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0
      let intervalo = setInterval(() => {
        contador += 1
        let salida = {
          valor: contador
        }
        observer.next(salida)
        // if (contador === 3) {
        //   clearInterval(intervalo)
        //   observer.complete()
        // }
        // if (contador === 2) {
        //   observer.error('Auxilio')
        // }
      }, 500)
    }).pipe(
      // Retry up to 3 times before failing
      map((res: any) => {
        return res.valor
      }
      )
    )
  }

}
