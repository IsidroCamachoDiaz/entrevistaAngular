import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from 'src/app/modelo/Agenda';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-editor-agendas',
  templateUrl: './editor-agendas.component.html',
  styleUrls: ['./editor-agendas.component.css']
})
export class EditorAgendasComponent implements OnInit {

  constructor(private fbs:BaseDeDatosService,public ruta:ActivatedRoute,private router: Router){}
  citasNoVistas:Cita[]=[];
  agenda:Agenda={diaAgenda:"",citas:[]};
  id!:string;
  cAnadir:Cita={nombre:"",telefono:"",email:"",dni:"",visto:false,diaCita:"",horaCita:"",entrevistador:"A"};
  citasParaAnadir:Cita[]=[];
  ngOnInit(): void {
    
    this.fbs.queyCollection("citas","visto",false).subscribe(data=>this.citasNoVistas=data);

    if(this.ruta.snapshot.paramMap.get("id")){
      this.id =this.ruta.snapshot.paramMap.get("id")!;
      this.fbs.getDocumentById(this.id,"agendas").subscribe(res => this.agenda=res);
    }

  }
  modificarAgenda() {
    //----------------Control de Citas
    this.agenda.citas.push(...this.citasParaAnadir);
    //---------------------------------------------
    this.fbs.updateDocument(this.agenda,"agendas");
    this.router.navigateByUrl("/agendas/listado");
  }
  crearAgenda() {
    //----------------Control de Citas
    this.agenda.citas.push(...this.citasParaAnadir);
    //---------------------------------------------
    this.fbs.newDocument(this.agenda,"agendas");
    this.router.navigateByUrl("/agendas/listado");
  }

  //--------------------------------------- Control de Citas
  eliminarCitaAgenda(iCita:number){
    this.agenda.citas.slice(iCita,1)
  }
  anadirCita(){
    this.citasParaAnadir.push(this.cAnadir);
    alert("Se añado "+this.citasParaAnadir.length+" citas pendientes")
  }
}
