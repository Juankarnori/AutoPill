import { db } from '@/database'
import { User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { IUser } from '@/interface';
import { jwt, validations } from '@/utils';

type Data = 
| { message: string }
| {
    token: string,
    user: IUser
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'POST':
            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', usuario = '' } = req.body as {email: string, password: string, usuario: string};

    if ( password.length < 6 ) {
        return res.status(400).json({
            message: 'La contraseña debe ser de 6 caracteres'
        });
    }

    if ( usuario.length < 2 ) {
        return res.status(400).json({
            message: 'El usuario debe ser de 2 caracteres'
        });
    }

    if ( !validations.isValidEmail(email) ) {
        return res.status(400).json({
            message: 'El correo no es valido'
        });
    }

    await db.connect();
    const user = await User.findOne({ email }).lean();
    
    if ( user ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Ese correo ya esta registrado' })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        usuario,
        role: 'client'
    });

    try {
        await newUser.save({ validateBeforeSave: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }
    db.disconnect();

    const { _id, role} = newUser;

    const token = jwt.signToken(_id,email);

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            usuario
        }
    })
}
