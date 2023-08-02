import { IPill } from "./pills";

export interface Data {
    dosis: number;
    hora: number;
    horario: string;
}

export interface Receta {
    pill: IPill;
    datos: Data[];
}