import { Cita } from "./Cita";

export interface Agenda{
    id?:string;
    diaAgenda:string;
    citas:Cita[];
}