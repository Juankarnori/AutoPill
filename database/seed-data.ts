import bcrypt from 'bcryptjs';
// import { IUser } from '../interface/user';

// interface SeedEsp32 {
//     user: IUser | string;
//     led: number;
//     status: 'ON' | 'OFF';
// }

interface SeedUser {
    user: string;
    email: string;
    password: string;
    role: 'admin'|'client';
}

// interface SeedPerfil {
//     user: IUser | string;
//     nombre: string;
//     apellido: string;
//     ciudad: string;
//     celular: string;
// }

interface SeedPill {
    nombre: string;
    description: string;
    image: string;
}

interface SeedData {
    users: SeedUser[];
    pills: SeedPill[];
    // esp32s: SeedEsp32[];
    // perfils: SeedPerfil[];
}

export const initialData: SeedData = {
    users: [
        {
            user: 'juank',
            email: 'juanknoriega070@gmail.com',
            password: bcrypt.hashSync('juankar10'),
            role: 'admin',
        },
        {
            user: 'eli',
            email: 'bettyfreire@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'client',
        },
    ],
    pills: [
        {
            nombre: 'Cirpril',
            description: 'Antihipertensivo',
            image: 'cirpril.png'
        },
        {
            nombre: 'Enalten',
            description: 'Antihipertensivo',
            image: 'enalten.png'
        },
        {
            nombre: 'Buprex',
            description: 'Ibuprofeno',
            image: 'buprex.png'
        },
    ],
    // esp32s: [
    //     {
    //         user: 'juank',
    //         led: 0,
    //         status: 'OFF'
    //     },
    //     {
    //         user: 'eli',
    //         led: 0,
    //         status: 'OFF'
    //     },
    // ],
    // perfils: [
    //     {
    //         user: 'juank',
    //         nombre: 'Juan',
    //         apellido: 'Noriega',
    //         ciudad: 'Ambato',
    //         celular: '0984613243',
    //     },
    //     {
    //         user: 'eli',
    //         nombre: 'Betty',
    //         apellido: 'Freire',
    //         ciudad: 'Ambato',
    //         celular: '0984611019',
    //     },
    // ]
}