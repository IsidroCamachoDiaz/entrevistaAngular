import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'citas', loadChildren: () => import('./vistas/citas/contenerdor-general-citas/citas.module').then(m => m.CitasModule) }, { path: 'agendas', loadChildren: () => import('./vistas/agendas/contenedor-general-agendas/agendas.module').then(m => m.AgendasModule) },
 { path: 'agendas', loadChildren: () => import('./vistas/agendas/contenedor-general-agendas/agendas.module').then(m => m.AgendasModule) },
 { path: 'estadisticas', loadChildren: () => import('./vistas/estadisticas/estadisticas.module').then(m => m.EstadisticasModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
