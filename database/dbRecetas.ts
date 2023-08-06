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

export const getRecetasByUser = async( userId: string ):Promise<IRecetario[]> => {

    if ( !isValidObjectId(userId) ) {
        return [];
    }

    await db.connect();
    const recetas = await Recetario.find({ user: userId }).lean();

    await db.disconnect();

    return JSON.parse(JSON.stringify(recetas));

}