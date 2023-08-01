export interface Data {
    dosis: number;
    hora: number;
    horario: string;
}

export interface Receta {
    pill: string;
    datos: Data[];
}