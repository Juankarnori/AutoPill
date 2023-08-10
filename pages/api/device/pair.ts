import { db } from '@/database';
import { Device } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| { isPair: boolean }
| boolean

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case "GET":
            return pairDevice( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' });
    }

}

const pairDevice = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { chipId = '' } = req.query;

    if ( !chipId ) {
        return res.status(200).json(false)
    }

    await db.connect();
    const device = await Device.findOne({ chipId });
    if ( !device ) {
        console.log('No existe un dispositivo con el chipId: '+ chipId);
        return res.status(200).json(false)
    }

    device.isPair = true;
    try {
        await device.save({ validateBeforeSave: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    await db.disconnect();

    return res.status(200).json(true);
}