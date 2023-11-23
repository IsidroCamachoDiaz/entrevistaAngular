import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agenda } from 'src/app/modelo/Agenda';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-editor-agendas',
  templateUrl: './editor-agendas.component.html',
  styleUrls: ['./editor-agendas.component.css']
})
export class EditorAgendasComponent implements OnInit {
  constructor(private fbs:BaseDeDatosService,public ruta:ActivatedRoute){}
  citasNoVistas:Cita[]=[];
  agenda:Agenda={diaAgenda:"",horaAgenda:"",};
  id!:string;
  ngOnInit(): void {
    
    this.fbs.queyCollection("citas","visto",false).subscribe(data=>this.citasNoVistas=data);

    if(this.ruta.snapshot.paramMap.get("id")){
      this.id =this.ruta.snapshot.paramMap.get("id")!;
      this.fbs.getDocumentById(this.id,"agendas").subscribe(res => this.agenda=res);
    }

  }

}
