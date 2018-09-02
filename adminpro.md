/*MODULOS PERSONALIZADOS*/



ng g c pages/accountSettings -m="pages/pages.module.ts" --spec=false -is
(ngModelChange) /*es un metodo que emite NgModel cuando cambia su valor*/


CommonModule /*import { CommonModule } from '@angular/common';*/ viene con los ngIf, ngFor, Pipes


declare function init_plugins() Uso de Scripts de archivos importados en el index.html en TypeScript

Observables y Promesas

Ambas son para trabajar con procesos asincronos

Promesas:
Trabajan con un unico flujo de datos
Se usan con una unica data asincrona de respuesta
no es muy simple de cancelar

Observables:
trabajan con un flujo continuo de datos
al faltar puedes ejecutar comandos y reintentar continuar con el observer
Se pueden encadenar operadores adicionales como el map, forEach, reduce, filter y mas
Existen otros tipos de operadores potentes como el retry() o el replay()
Pueden ser creados desde otras fuentes como los eventos
Son funciones a las cuales podemos suscribirnos en multiples lugares  


/*rxjs reactive extensions*/
 Observable() solo devuelve un objeto de tipo observer





jantem28
