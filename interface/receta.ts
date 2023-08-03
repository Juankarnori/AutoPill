import { IPill } from "./pills";

export interface Data {
    hora: number;
    horario: string;
}

export interface Receta {
    pill: IPill;
    datos: Data[];
}