import { db } from '@/database'
import { IDevice } from '@/interface'
import { jwt } from '@/utils'
import { Device, Recetario } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| { isPair: boolean }
| { 
    device: IDevice 
    horas: number[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return pairDevice( req, res )

        case 'GET':
            return getDevide( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const pairDevice = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { chipId = '' } = req.body;

    await db.connect();
    const device = await Device.findOne({ chipId });
    if ( !device ) {
        console.log('No existe un dispositivo con el chipId: '+ chipId);
        return res.status(200).json({ isPair: false })
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

    console.log({device})

    await db.disconnect();

    return res.status(200).json({ isPair: true });
}

const getDevide = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { chipId = '' } = req.query;

    const { token = '' } = req.cookies;

    let userId = '';

    let horas: number[] = [];

    if ( !chipId ) {
        return res.status(400).json({ message: 'No hay ningun chipId' });
    }

    try {
        userId = await jwt.isValidToken( token );
    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorizacion no es valido'
        })
    }

    await db.connect();

    const device = await Device.findOne({ chipId }).lean();
    console.log({device})

    if ( !device ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No existe el dispositivo' })
    }

    const receta = await Recetario.findOne({ user: userId, isLoaded: true }).select('user recetas isLoaded').lean();

    await db.disconnect();

    if ( receta ) {
        
        const { recetas } = receta;
        
        for (let index = 0; index < recetas.length; index++) {
            horas = [...horas,recetas[index].hora];       
        }

    }


    const dispositivo: IDevice = {
        nombre: device.nombre,
        chipId: device.chipId,
        isPair: device.isPair!,
        receta: receta!
    }


    return res.status(200).json({ device: dispositivo, horas })

}

