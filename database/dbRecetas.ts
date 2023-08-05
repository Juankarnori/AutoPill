import { IRecetario } from "@/interface";
import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Recetario } from "@/models";

export const getRecetaById = async( id: string ):Promise<IRecetario | null> => {

    if ( !isValidObjectId(id) ) {
        return null;
    }

    await db.connect();
    const receta = await Recetario.findById( id ).lean();
    await db.disconnect();

    if ( !receta ) {
        return null;
    }

    return JSON.parse( JSON.stringify(receta) );

}