import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, MedicoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-uploads/modal-uploads.service';
import { HospitalService } from './hospital/hospital.service';


@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [SettingsService, SharedService, SidebarService, UsuarioService, SubirArchivoService, LoginGuardGuard, ModalUploadService, HospitalService, MedicoService],
  declarations: []
})
export class ServiceModule { }
