import { db } from '@/database';
import { Device, Recetario } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| { horas: number[] }
| number[]

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
    let horas: number[] = [];

    await db.connect();
    const device = await Device.findOne({ chipId });
    if ( !device ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay ningun dispositivo con ese chipId' });
    }

    const { receta } = device;

    const recetario = await Recetario.findOne({ _id: receta });
    if ( !recetario ) {
        await db.disconnect();
        console.log('No hay ningun recetario')
        return res.status(400).json({ message: 'No hay ningun recetario' });
    }

    const { recetas } = recetario;

    for (let index = 0; index < recetas.length; index++) {
        horas = [...horas,recetas[index].hora]
    }

    console.log({horas});

    await db.disconnect();
    
    return res.status(200).json( horas )

}
