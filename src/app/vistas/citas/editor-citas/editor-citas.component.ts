import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Agenda } from 'src/app/modelo/Agenda';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-editor-citas',
  templateUrl: './editor-citas.component.html',
  styleUrls: ['./editor-citas.component.css']
})
export class EditorCitasComponent {
  constructor(private fbs: BaseDeDatosService, public ruta: ActivatedRoute, private router: Router,private fb:FormBuilder) { }

  form = this.fb.group({
    nombre: ['',[ Validators.required]],
    telefono: ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
    email: ['', [Validators.required,Validators.email]],
    dni: ['', [Validators.required]],
    visto:[false],
    diaCita:["",[ Validators.required]],
    horaCita:["",[ Validators.required]],
    entrevistador:["",[ Validators.required]]
  })

  c: Cita = { nombre: "", telefono: "", email: "", dni: "", visto: false, diaCita: "", horaCita: "", entrevistador: "A" };
  id?: string;
  cAntigua:Cita={ nombre: "", telefono: "", email: "", dni: "", visto: false, diaCita: "", horaCita: "", entrevistador: "A" };
  agendaParaMeterCita: Agenda = { id:"",diaAgenda: "", citas: [] };
  diaAntiguo:string="";
  
  ngOnInit() {
    if (this.ruta.snapshot.paramMap.get("id")) {
      this.id = this.ruta.snapshot.paramMap.get("id")!;
     let d= this.fbs.getDocumentById(this.id, "citas").subscribe(res => {
        this.c = res;
        this.cAntigua=res;
        this.diaAntiguo=this.cAntigua.diaCita;

        console.log(this.cAntigua.diaCita)

        this.form.patchValue({
          nombre: this.c.nombre,
          telefono: this.c.telefono,
          email: this.c.email,
          dni:this.c.dni,
          visto:this.c.visto,
          diaCita:this.c.diaCita,
          horaCita:this.c.horaCita,
          entrevistador:this.c.entrevistador
        });

        d.unsubscribe();
      });
    }
  }

  meterCita() {
    let d = this.comprobarDisponibilidad(this.c.diaCita, this.c.horaCita).subscribe(disponible => {
      if (disponible) {
        d.unsubscribe();
        let o = this.fbs.queyDocument("agendas", "diaAgenda", this.c.diaCita).subscribe(data => {
          this.agendaParaMeterCita = data[0];
          o.unsubscribe()
          console.log(data[0]);
          if(this.agendaParaMeterCita=== undefined|| this.agendaParaMeterCita === null){
            this.agendaParaMeterCita= { id:"",diaAgenda: "", citas: [] };
            this.agendaParaMeterCita.diaAgenda=this.c.diaCita;
            this.agendaParaMeterCita.citas.push(this.c);
            this.fbs.newDocument(this.agendaParaMeterCita,"agendas");
          }
          else{
          this.agendaParaMeterCita.citas.push(this.c);
          this.fbs.updateDocument(this.agendaParaMeterCita, "agendas").then(() => {
            this.fbs.updateDocument(this.c, "citas");         
          });
        }
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

        //-----------Coger Agenda Antigua
      let p = this.fbs.queyCollection("agendas", "diaAgenda", this.diaAntiguo).subscribe(data => {
        
        let agendaCambiarCita: Agenda = data[0];
        let indiceAEliminar:number=32;
        p.unsubscribe()
        console.log(this.cAntigua.diaCita+" "+this.diaAntiguo);

        this.cAntigua.diaCita=this.diaAntiguo;
        for(let i=0;i<agendaCambiarCita.citas.length;i++){
          if(agendaCambiarCita.citas[i].id==this.cAntigua.id){
            indiceAEliminar=i;
          }
        }

        console.log(indiceAEliminar);
        agendaCambiarCita.citas.splice(indiceAEliminar, 1);

        console.log(agendaCambiarCita);
        
        this.fbs.updateDocument(agendaCambiarCita, "agendas").then(
          () => console.log(agendaCambiarCita)
        ).catch((err) => { console.error(err) });
        
      });    
        let o = this.fbs.queyDocument("agendas", "diaAgenda", this.c.diaCita).subscribe(data => {
          this.agendaParaMeterCita = data[0];
          o.unsubscribe()
          console.log(data[0]);
          if(this.agendaParaMeterCita=== undefined|| this.agendaParaMeterCita === null){
            this.agendaParaMeterCita= { id:"",diaAgenda: "", citas: [] };
            this.agendaParaMeterCita.diaAgenda=this.c.diaCita;
            this.agendaParaMeterCita.citas.push(this.c);
            this.fbs.newDocument(this.agendaParaMeterCita,"agendas").then(() => {
              this.fbs.updateDocument(this.c, "citas");
            });
          }
          else{
            this.agendaParaMeterCita.citas.push(this.c);
            this.fbs.updateDocument(this.agendaParaMeterCita, "agendas").then(() => {
              this.fbs.updateDocument(this.c, "citas");
            });
          }
          this.router.navigateByUrl("/citas/listado");
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

  anadirFormulario(){
console.log(this.form.get('diaCita')!.value);
    this.c.nombre=this.form.get('nombre')!.value!;
    this.c.dni=this.form.get('dni')!.value!;
    this.c.email=this.form.get('email')!.value!;
    this.c.entrevistador=this.form.get('entrevistador')!.value!;
    this.c.horaCita=this.form.get('horaCita')!.value!;
    this.c.diaCita=this.form.get('diaCita')!.value!;
    this.c.telefono=this.form.get('telefono')!.value!;
    this.c.visto=this.form.get('visto')!.value!;

    if(this.ruta.snapshot.paramMap.get("id"))
      this.modificarCita();
    else
      this.meterCita();
  }
}
