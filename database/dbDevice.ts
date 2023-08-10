import { IDevice } from "@/interface";
import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Device } from "@/models";

export const getDeviceByUser = async( userId: string ):Promise<IDevice | null> => {

    if ( !isValidObjectId(userId) ) {
        return null;
    }

    await db.connect();
    const device = await Device.findOne({ user: userId });

    await db.disconnect();

    if ( !device ) {
        return null;
    }

    return JSON.parse(JSON.stringify(device));

}