import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { ListadoCitasComponent } from '../listado-citas/listado-citas.component';
import { EditorCitasComponent } from '../editor-citas/editor-citas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CitasComponent,
    ListadoCitasComponent,
    EditorCitasComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    FormsModule
  ]
})
export class CitasModule { }
