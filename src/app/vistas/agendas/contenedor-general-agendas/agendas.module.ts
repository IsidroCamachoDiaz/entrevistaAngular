import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendasRoutingModule } from './agendas-routing.module';
import { AgendasComponent } from './agendas.component';
import { ListadoAgendasComponent } from '../listado-agendas/listado-agendas.component';
import { EditorAgendasComponent } from '../editor-agendas/editor-agendas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgendasComponent,
    ListadoAgendasComponent,
    EditorAgendasComponent
  ],
  imports: [
    CommonModule,
    AgendasRoutingModule,
    FormsModule
  ]
})
export class AgendasModule { }
