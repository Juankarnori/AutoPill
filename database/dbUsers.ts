import { User } from "@/models";
import { isValidObjectId } from "mongoose";
import { db } from ".";

export const getUsuarioById = async( userId: string ):Promise<string | null> => {

    if ( !isValidObjectId(userId) ) {
        return null;
    }

    await db.connect();
    const user = await User.findById(userId).lean();
    await db.disconnect();
    
    if ( !user ) {
        return null;
    }

    const { usuario } = user;

    return usuario;

}