import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/modelo/Agenda';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-listado-agendas',
  templateUrl: './listado-agendas.component.html',
  styleUrls: ['./listado-agendas.component.css']
})
export class ListadoAgendasComponent implements OnInit{
  
constructor(private fbs: BaseDeDatosService){}
agendas:Agenda[]=[];
c1:Cita={nombre:"manolo",telefono:"5783478",email:"uirhgugwb",dni:"urightg",visto:true,diaCita:"3-4-2023",horaCita:"10:35",entrevistador:"A"};
a:Agenda={diaAgenda:"irfg",horaAgenda:"uhgbf",cita1:this.c1,cita2:this.c1};
  ngOnInit(): void {
    this.fbs.getColletion("agendas").subscribe(data=> this.agendas=data);
  }

  meterAgenda(){
    this.fbs.newDocument(this.a,"agendas");
  }
}
