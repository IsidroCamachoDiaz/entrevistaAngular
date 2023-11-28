import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
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
ngOnInit(){
  if(this.ruta.snapshot.paramMap.get("id")){
    this.id =this.ruta.snapshot.paramMap.get("id")!;
    this.fbs.getDocumentById(this.id,"citas").subscribe(res => this.c=res);
  }
}

meterCita(){
let d=this.comprobarDisponibilidad(this.c.diaCita,this.c.horaCita).subscribe(disponible => {
  if (disponible) {
    d.unsubscribe();
    this.fbs.newDocument(this.c,"citas");
    this.router.navigateByUrl("/citas/listado");
  } else {
    alert("El día indicado a la hora indicada no está disponible");
  }
});
}

modificarCita(){
  let d=this.comprobarDisponibilidad(this.c.diaCita,this.c.horaCita).subscribe(disponible => {
    if (disponible) {
      d.unsubscribe();
      this.fbs.updateDocument(this.c,"citas");
      this.router.navigateByUrl("/citas/listado");
    } else {
      alert("El día indicado a la hora indicada no está disponible");
    }
  });
}

comprobarDisponibilidad(dia:string,hora:string) :Observable<boolean>{
return this.fbs.queyCollection2campos("citas","diaCita",dia,"horaCita",hora).pipe(
  map(cojidas => cojidas.length < 2)
);
}

}
