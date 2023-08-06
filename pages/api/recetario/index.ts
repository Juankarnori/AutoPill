import { db } from '@/database';
import { IRecetario } from '@/interface';
import { Recetario, User } from '@/models';
import { jwt } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IRecetario

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'POST':
            return createRecetario( req, res );
        
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const createRecetario = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const body = req.body as IRecetario;

    console.log({body})

    console.log({body})

    const { token = '' } = req.cookies;

    let userId = '';

    try {
        userId = await jwt.isValidToken( token );
    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorizacion no es valido'
        })
    }

    await db.connect();
    const user = await User.findById( userId ).select('email usuario role').lean();

    if ( !user ) {
        await db.disconnect();
        return res.status(401).json({ message: 'Debe estar autenticado para hacer esto '});
    }

    try {
        const iduser = user._id;
        const newRecetario = new Recetario({ ...body, user: userId, isLoaded: false });
        await newRecetario.save();

        await db.disconnect();
        return res.status(201).json( newRecetario );
    } catch (error) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: 'Revisar logs del servidor'
        })
    }


    return res.status(201).json(user as any);

}
