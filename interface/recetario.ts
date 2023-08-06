import { IPill } from "./pills";
import { IUser } from "./user";

export interface Recetario {
    horario : string;
    hora    : number;
    pills   : IPill[];
}

export interface IRecetario {
    _id?     : string;
    user?    : IUser | string;
    recetas  : Recetario[];
    isLoaded?: boolean;

    createdAt?  : string;
    updatedAt?  : string;
}