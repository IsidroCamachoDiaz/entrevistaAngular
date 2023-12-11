import { Component, OnInit } from '@angular/core';
import Chart from "chart.js/auto";
import { Agenda } from 'src/app/modelo/Agenda';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{
  chart: any;
  agendas:Agenda[]=[];
  constructor(private fbs:BaseDeDatosService){}
  ngOnInit(): void {
    this.crearChart();
  }


  crearChart() {
    let dias:string[]=[];
    let citasDia:string[]=[];
    let colores:string[]=[];

    let coloresRandon:string[]=this.generaArrayColores(20);

    this.fbs.getColletion("agendas").subscribe(data=>{this.agendas=data;
      console.log(this.agendas);
      for(let i=0;i<this.agendas.length;i++){
        dias.push(this.agendas[i].diaAgenda);
        citasDia.push(String(this.agendas[i].citas.length));
          colores.push(coloresRandon[this.numeroRandom(0,19)])
      }
      this.chart = new Chart("myChart", {
        type: 'doughnut', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: dias,
          datasets: [
            {
              label: "Citas",
              data: citasDia,
              backgroundColor: colores,
              borderColor: 'rgba(0, 0, 0, 1)',

            }
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
    });
  }
  //---------------------------------------------------------------------------------------
  numeroRandom(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generaColor() {
    // Genera valores RGB aleatorios
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
  
    // Devuelve el color en formato 'rgba'
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
  
  generaArrayColores(numColors:number) {
    const colorsArray = [];
  
    for (let i = 0; i < numColors; i++) {
      const randomColor = this.generaColor();
      colorsArray.push(randomColor);
    }
  
    return colorsArray;
  }
  //---------------------------------------------------------------------------------------
}
