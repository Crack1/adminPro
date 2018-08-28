import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadscrumsComponent } from './breadscrums/breadscrums.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadscrumsComponent,
    NopagefoundComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadscrumsComponent,
    NopagefoundComponent,
  ]
})

export class ShareModule { }
