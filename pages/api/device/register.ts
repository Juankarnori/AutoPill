import { db } from '@/database'
import { IDevice } from '@/interface'
import { Device, Recetario } from '@/models'
import { jwt } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| { 
    device: IDevice 
    horas: number[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return registerDevice( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const registerDevice = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { nombre = '', chipId = '' } = req.body;

    const { token = '' } = req.cookies;

    let userId = '';

    let horas: number[] = [];

    try {
        userId = await jwt.isValidToken( token );
    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorizacion no es valido'
        })
    }

    await db.connect();
    const device = await Device.findOne({ chipId }).lean();

    if ( device ) {
        await db.disconnect();
        if ( device.nombre === nombre ) {
            return res.status(400).json({ message: 'No se puede utilizar ese nombre' });
        }
        return res.status(400).json({ message: 'Ya esta registrado un dispositivo con ese chipId' });
    }

    const receta = await Recetario.findOne({ user: userId, isLoaded: true }).lean();

    if ( !receta ) {
        const newDevice = new Device({
            nombre,
            chipId,
            isPair: false,
            user: userId,
        });

        try {
            await newDevice.save({ validateBeforeSave: true })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Revisar logs del servidor'
            })
        }

        return res.status(200).json({ device: newDevice, horas: [] });
    }

    const newDevice = new Device({
        nombre,
        chipId,
        isPair: false,
        user: userId,
        receta
    });

    try {
        await newDevice.save({ validateBeforeSave: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    await db.disconnect();

    const { recetas } = receta;

    for (let index = 0; index < recetas.length; index++) {
        horas = [...horas,recetas[index].hora];       
    }

    return res.status(200).json({ device: newDevice, horas })

}
