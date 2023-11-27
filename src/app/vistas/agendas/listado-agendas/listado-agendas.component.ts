import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/modelo/Agenda';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-listado-agendas',
  templateUrl: './listado-agendas.component.html',
  styleUrls: ['./listado-agendas.component.css']
})
export class ListadoAgendasComponent implements OnInit {

  constructor(private fbs: BaseDeDatosService) { }
  agendas: Agenda[] = [];

  ngOnInit(): void {
    this.fbs.getColletion("agendas").subscribe(data => this.agendas = data);
  }

  borrarAgenda(a: Agenda) {
    this.fbs.deleteDoc(a.id!, "agendas");
  }
  agendasPendientes() {
    const miFecha: Date = new Date();

    const anyo: number = miFecha.getFullYear();
    const mes: number = miFecha.getMonth() + 1;
    const dia: number = miFecha.getDate();

    const cadenaFecha: string = `${anyo}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    console.log(cadenaFecha);
    this.fbs.queyCollectionMayor("agendas", "diaAgenda", cadenaFecha).subscribe(data => this.agendas = data);
  }
  agendasFinalizadas(){
    const miFecha: Date = new Date();

    const anyo: number = miFecha.getFullYear();
    const mes: number = miFecha.getMonth() + 1;
    const dia: number = miFecha.getDate();

    const cadenaFecha: string = `${anyo}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    console.log(cadenaFecha);
    this.fbs.queyCollectionMenor("agendas", "diaAgenda", cadenaFecha).subscribe(data => this.agendas = data);
  }
  todasAgendas(){
    this.fbs.getColletion("agendas").subscribe(data=>this.agendas=data);
  }
}
