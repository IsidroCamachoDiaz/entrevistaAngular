import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/modelo/Agenda';
import { Cita } from 'src/app/modelo/Cita';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listado-agendas',
  templateUrl: './listado-agendas.component.html',
  styleUrls: ['./listado-agendas.component.css']
})
export class ListadoAgendasComponent implements OnInit {
  constructor(private fbs: BaseDeDatosService) { 
  }

  agendas: Agenda[] = [];

  ngOnInit(): void {
    this.fbs.getColletion("agendas").subscribe(data => this.agendas = data);
  }

  borrarAgenda(a: Agenda) {

    for(let i=0;i<a.citas.length;i++){
      this.fbs.deleteDoc(a.citas[i].id!, "citas");
    }
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

  generarPDF(a:Agenda) {
    // Define el contenido del PDF
    const contenido = [
      { text: 'Agenda del dia: '+a.diaAgenda, style: 'titulo' },
    ];

    for(let i=0;i<a.citas.length;i++){
      contenido.push({text:"Cita de: "+a.citas[i].nombre+" a las "+a.citas[i].horaCita
      +" Contacto: Email: "+a.citas[i].email+" Telefono: "+a.citas[i].telefono+" DNI: "+a.citas[i].dni,style:""});
    }

    // Define los estilos para el PDF
    const documentDefinition = {
      content: contenido,
      styles: {
        titulo: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number]   // Asegúrate de que margin sea del tipo Margins
        }
      }
    };
    
    // Crear y descargar el PDF
    pdfMake.createPdf(documentDefinition).download(a.diaAgenda+'.pdf');
  }
}
