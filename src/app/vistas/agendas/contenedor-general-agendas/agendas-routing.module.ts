import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendasComponent } from './agendas.component';
import { ListadoAgendasComponent } from '../listado-agendas/listado-agendas.component';
import { EditorAgendasComponent } from '../editor-agendas/editor-agendas.component';

const routes: Routes = [{ path: '', component: AgendasComponent, children:[
  {path:"listado",component:ListadoAgendasComponent},
  {path:"editor-agenda/:id",component:EditorAgendasComponent},
  {path:"nuevo",component: EditorAgendasComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendasRoutingModule { }
