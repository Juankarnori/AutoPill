import { db } from '@/database'
import { IPill } from '@/interface'
import { Pill } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { messsage: string }
| IPill[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return searchPills( req, res )

        default:
            return res.status(400).json({
                messsage: 'Bad request'
            })
    }

}

const searchPills = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { q = '' } = req.query;

    if ( q.length === 0 ) {
        return res.status(400).json({
            messsage: 'Debe especificar el query de busqueda'
        })
    }

    q = q.toString().toLowerCase();

    await db.connect();
    const pills = await Pill.find({
        $text: { $search: q }
    })
    .select('nombre description image -_id')
    .lean();

    await db.disconnect();

    return res.status(200).json( pills );

}
