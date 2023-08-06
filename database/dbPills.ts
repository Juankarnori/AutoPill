import { Pill } from "@/models";
import { db } from "."
import { IPill } from "@/interface";

export const getPillByNombre = async( nombre: string ): Promise<IPill | null> => {

    await db.connect();
    const pill = await Pill.findOne({ nombre }).lean();

    await db.disconnect();

    if ( !pill ) {
        return null;
    }

    return JSON.parse( JSON.stringify( pill ) )

}

export const getPillById = async( id: string ): Promise<IPill | null> => {

    await db.connect();
    const pill = await Pill.findById( id ).select('nombre image').lean();

    await db.disconnect();

    if ( !pill ) {
        return null;
    }

    return JSON.parse( JSON.stringify( pill ) )

}

interface PillNombre {
    nombre: string;
}

export const getAllPillsNombres = async(): Promise<PillNombre[]> => {

    await db.connect();
    const nombres = await Pill.find().select('nombre -_id').lean();

    await db.disconnect();

    return nombres;

}

export const getPillsByTerm = async ( term: string ): Promise<IPill[]> => {

    term = term.toString().toLowerCase();

    await db.connect();
    const pills = await Pill.find({
        $text: { $search: term }
    })
    .select('nombre description image -_id')
    .lean();

    await db.disconnect();

    return pills;

}

export const getAllPills = async(): Promise<IPill[]> => {

    await db.connect();
    const pills = await Pill.find()
                            .select('nombre description image -_id')
                            .lean();

    await db.disconnect();

    return pills;

}