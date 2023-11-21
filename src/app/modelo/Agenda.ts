import { Cita } from "./Cita";

export interface Agenda{
    id?:string;
    diaAgenda:string;
    horaAgenda:string;
    cita1?:Cita;
    cita2?:Cita;
    cita3?:Cita;
    cita4?:Cita;
}