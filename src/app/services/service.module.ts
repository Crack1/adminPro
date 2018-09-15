import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-uploads/modal-uploads.service';


@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [SettingsService, SharedService, SidebarService, UsuarioService, SubirArchivoService, LoginGuardGuard, ModalUploadService],
  declarations: []
})
export class ServiceModule { }
