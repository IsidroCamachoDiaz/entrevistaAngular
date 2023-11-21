import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-editor-citas',
  templateUrl: './editor-citas.component.html',
  styleUrls: ['./editor-citas.component.css']
})
export class EditorCitasComponent{
constructor(private fbs:BaseDeDatosService,public ruta:ActivatedRoute){}
c:Cita={nombre:"manolo",telefono:"5783478",email:"uirhgugwb",dni:"urightg",visto:false,diaCita:"3-4-2023",horaCita:"10:35",entrevistador:"A"};
id?:string;
ngOnInit(){
  if(this.ruta.snapshot.paramMap.get("id")){
    this.id =this.ruta.snapshot.paramMap.get("id")!;
    this.fbs.getDocumentById(this.id,"citas").subscribe(res => this.c=res);
  }
}

meterCita(){
this.fbs.newDocument(this.c,"citas");
}
modificarCita(){
  this.fbs.updateDocument(this.c,"citas")
}

}
