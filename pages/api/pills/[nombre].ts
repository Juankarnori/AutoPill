import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Pill } from '@/models'
import { IPill } from '@/interface'

type Data = 
| { message: string }
| IPill

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getPillByNombre( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getPillByNombre = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const { nombre } = req.query;
    const pill = await Pill.findOne({ nombre }).lean();
    await db.disconnect();

    if( !pill ) {
        return res.status(404).json({
            message: 'Medicamento no encontrado'
        })
    }

    return res.json( pill );

}
