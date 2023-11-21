import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.css']
})
export class ListadoCitasComponent implements OnInit{

  constructor(private fbs:BaseDeDatosService,public ruta:ActivatedRoute){}
  citas:Cita[]=[];
  c1:Cita={nombre:"manolo",telefono:"5783478",email:"uirhgugwb",dni:"urightg",visto:true,diaCita:"3-4-2023",horaCita:"10:35",entrevistador:"A"};
  
  ngOnInit(): void {
      this.fbs.getColletion("citas").subscribe(data=>this.citas=data);
  }
  meterCita(){
    this.fbs.newDocument(this.c1,"citas");
  }

  borrarCita(c:Cita) {
    this.fbs.deleteDoc(c.id!,"citas");
  }
  pendientes(){
    this.fbs.queyCollection("citas","visto",false).subscribe(data=>this.citas=data);
  }
  vistos(){
    this.fbs.queyCollection("citas","visto",true).subscribe(data=>this.citas=data);
  }
  todos(){
    this.fbs.getColletion("citas").subscribe(data=>this.citas=data);
  }

}
