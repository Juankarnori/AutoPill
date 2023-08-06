import { User } from "@/models";
import { isValidObjectId } from "mongoose";

export const getUsuarioById = async( userId: string ):Promise<string | null> => {

    if ( !isValidObjectId(userId) ) {
        return null;
    }

    const user = await User.findById(userId).lean();
    
    if ( !user ) {
        return null;
    }

    const { usuario } = user;

    return usuario;

}