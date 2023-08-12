import { db } from '@/database';
import { Device, Recetario } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| boolean

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getEsp32( req, res );
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getEsp32 = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { chipId } = req.query;

    await db.connect();
    const device = await Device.findOne({ chipId });
    if ( !device ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay ningun dispositivo con ese chipId' });
    }

    const { isPair } = device;

    await db.disconnect();

    
    return res.status(200).json( isPair! )

}
