import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { IPill } from '@/interface'
import { Pill } from '@/models'

type Data = 
| { message: string }
| IPill[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getPills( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getPills = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const pills = await Pill.find()
                            .select('nombre description image -_id')
                            .lean();

    await db.disconnect();

    return res.status(200).json( pills );

}
