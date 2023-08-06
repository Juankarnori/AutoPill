import { db } from '@/database';
import { IRecetario } from '@/interface';
import { Recetario } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| {
    id: string;
    userId: string;
}
| { receta: IRecetario }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'PUT':
            return sendReceta( req, res );

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const sendReceta = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id, userId } = req.body;

    if ( !isValidObjectId(id) || !isValidObjectId(userId) ) {
        return res.status(400).json({ message: 'El usuario o la receta no es correcta'})
    }

    await db.connect();

    const recetaIsLoad = await Recetario.findOne({ isLoaded: true });

    if ( !recetaIsLoad ) {
        const receta = await Recetario.findOne({ _id:id });
        if ( !receta ) {
            return res.status(400).json({ message: 'No hay receta con ese id'});
        }
        receta.isLoaded = true;
        await receta.save();
        await db.disconnect();
        return res.status(200).json({receta});
    }
    
    const { _id, user } = JSON.parse(JSON.stringify(recetaIsLoad));

    if ( user !== userId ) {
        return res.status(400).json({ message: 'No tiene autorizacion '});
    }

    if ( _id === id ) {
        return res.status(400).json({ message: 'Esta receta ya esta enviada '});
    }

    const receta = await Recetario.findOne({ _id:id });
    recetaIsLoad.isLoaded = false;
    if ( !receta ) {
        return res.status(400).json({ message: 'No hay receta con ese id'});
    }
    receta.isLoaded = true;

    try {
        await recetaIsLoad.save();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    try {
        await receta.save();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }
    db.disconnect();
    
    return res.status(200).json({ message: 'Se envio esta receta'})

}
