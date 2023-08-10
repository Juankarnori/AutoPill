import { IRecetario } from "./recetario";
import { IUser } from "./user";

export interface Device {
    nombre  : string;
    chipId  : string;
    isPair  : boolean;
    hora    : number[];
}

export interface IDevice {
    _id?    :string;
    nombre  : string;
    chipId  : string;
    isPair? : boolean;
    user?   : IUser | string;
    receta  : IRecetario;

    createdAt?: string;
    updatedAt?: string;
}