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