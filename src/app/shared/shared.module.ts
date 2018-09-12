import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadscrumsComponent } from './breadscrums/breadscrums.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  imports: [
    RouterModule, CommonModule, PipesModule
  ],
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
