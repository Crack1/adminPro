import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, retry, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadscrums',
  templateUrl: './breadscrums.component.html',
  styles: []
})
export class BreadscrumsComponent implements OnInit {

  breadcrumbTitulo: string
  constructor(private router: Router, public title: Title, public meta: Meta) {

    this.getDataRoute().subscribe((data) => {
      console.log(data.snapshot.data.titulo)
      this.breadcrumbTitulo = data.snapshot.data.titulo
      this.title.setTitle(this.breadcrumbTitulo)
      let metaTag: MetaDefinition = {
        name: 'Agregando Metas',
        content: data.snapshot.data.titulo
      }
      this.meta.updateTag(metaTag)
    })
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(filter((evento) => {
      return evento instanceof ActivationEnd
    }))
      .pipe(filter((evento: ActivationEnd) => evento.snapshot.firstChild === null))
  }
}
