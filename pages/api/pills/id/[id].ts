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
            return getPillById( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getPillById = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const { id } = req.query;
    console.log({id})
    const pill = await Pill.findById(id).select('nombre description image -_id').lean();
    await db.disconnect();

    if( !pill ) {
        return res.status(404).json({
            message: 'Medicamento no encontrado'
        })
    }

    return res.json( pill );

}
