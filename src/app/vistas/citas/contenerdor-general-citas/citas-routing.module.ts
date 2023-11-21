import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './citas.component';
import { ListadoCitasComponent } from '../listado-citas/listado-citas.component';
import { EditorCitasComponent } from '../editor-citas/editor-citas.component';

const routes: Routes = [{ path: '', component: CitasComponent ,children:[
  {path:"listado",component:ListadoCitasComponent},
  {path:"modificar/:id",component:EditorCitasComponent},
  {path:"nuevo",component:EditorCitasComponent}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
