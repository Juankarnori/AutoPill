import { db } from '@/database';
import { User } from '@/models';
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async( email: string, password: string ) => {

    await db.connect();
    const usuario = await User.findOne({ email });
    await db.disconnect();

    if ( !usuario ) {
        return null;
    }

    if ( !bcrypt.compareSync( password, usuario.password! ) ) {
        return null;
    }

    const { role, user, _id } = usuario;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        user,
    }

}

export const oAuthToDbUser = async( oAuthEmail: string, oAuthName: string ) => {

    await db.connect();
    const usuario = await User.findOne({ email: oAuthEmail });

    if ( usuario ) {
        await db.disconnect();
        const { _id, user, role, email } = usuario;
        return { _id, user, role, email };
    }

    const newUser = new User({ email: oAuthEmail, user: oAuthName, password: '@', role: 'client' });
    await newUser.save();
    await db.disconnect();

    const { _id, user, role, email } = newUser;
    return { _id, user, role, email };

}