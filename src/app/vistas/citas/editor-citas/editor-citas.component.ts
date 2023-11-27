import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-editor-citas',
  templateUrl: './editor-citas.component.html',
  styleUrls: ['./editor-citas.component.css']
})
export class EditorCitasComponent{
constructor(private fbs:BaseDeDatosService,public ruta:ActivatedRoute,private router: Router){}
c:Cita={nombre:"",telefono:"",email:"",dni:"",visto:false,diaCita:"",horaCita:"",entrevistador:"A"};
id?:string;
entrevistadorA:string="A";
entrevistadorB:string="B";
ngOnInit(){
  if(this.ruta.snapshot.paramMap.get("id")){
    this.id =this.ruta.snapshot.paramMap.get("id")!;
    this.fbs.getDocumentById(this.id,"citas").subscribe(res => this.c=res);
  }
}

meterCita(){
this.fbs.newDocument(this.c,"citas");
this.router.navigateByUrl("/citas/listado");
}
modificarCita(){
  this.fbs.updateDocument(this.c,"citas")
  this.router.navigateByUrl("/citas/listado");
}

}
