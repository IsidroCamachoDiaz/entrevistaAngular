import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Agenda } from 'src/app/modelo/Agenda';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-editor-citas',
  templateUrl: './editor-citas.component.html',
  styleUrls: ['./editor-citas.component.css']
})
export class EditorCitasComponent {
  constructor(private fbs: BaseDeDatosService, public ruta: ActivatedRoute, private router: Router) { }
  c: Cita = { nombre: "", telefono: "", email: "", dni: "", visto: false, diaCita: "", horaCita: "", entrevistador: "A" };
  id?: string;
  agendaParaMeterCita: Agenda = { diaAgenda: "", citas: [] };
  ngOnInit() {
    if (this.ruta.snapshot.paramMap.get("id")) {
      this.id = this.ruta.snapshot.paramMap.get("id")!;
      this.fbs.getDocumentById(this.id, "citas").subscribe(res => this.c = res);
    }
  }

  meterCita() {
    let d = this.comprobarDisponibilidad(this.c.diaCita, this.c.horaCita).subscribe(disponible => {
      if (disponible) {
        d.unsubscribe();
        let o=this.fbs.queyDocument("agendas", "diaAgenda", this.c.diaCita).subscribe(data => {
          this.agendaParaMeterCita = data[0];
          o.unsubscribe()
          console.log(data[0]);
          this.agendaParaMeterCita.citas.push(this.c);
          this.fbs.updateDocument(this.agendaParaMeterCita, "agendas").then(() => {
            this.fbs.updateDocument(this.c, "citas");
          this.router.navigateByUrl("/citas/listado");
          });
        })
        this.fbs.newDocument(this.c, "citas");
        this.router.navigateByUrl("/citas/listado");
      } else {
        alert("El día indicado a la hora indicada no está disponible");
      }
    });
  }

  modificarCita() {
    let d = this.comprobarDisponibilidad(this.c.diaCita, this.c.horaCita).subscribe(disponible => {
      if (disponible) {
        d.unsubscribe();
        let o=this.fbs.queyDocument("agendas", "diaAgenda", this.c.diaCita).subscribe(data => {
          this.agendaParaMeterCita = data[0];
          o.unsubscribe()
          console.log(data[0]);
          this.agendaParaMeterCita.citas.push(this.c);
          this.fbs.updateDocument(this.agendaParaMeterCita, "agendas").then(() => {
            this.fbs.updateDocument(this.c, "citas");
          this.router.navigateByUrl("/citas/listado");
          });
        })

      } else {
        alert("El día indicado a la hora indicada no está disponible");
      }
    });
  }

  comprobarDisponibilidad(dia: string, hora: string): Observable<boolean> {
    return this.fbs.queyCollection2campos("citas", "diaCita", dia, "horaCita", hora).pipe(
      map(cojidas => cojidas.length < 2)
    );
  }
  guadarCitaAgenda(data: any[]) {
    //this.fbs.queyDocument("agendas","diaAgenda",c.diaCita).subscribe(data=>{
   
    //});
  }
}
