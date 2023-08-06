import bcrypt from 'bcryptjs';
// import { IUser } from '../interface/user';

// interface SeedEsp32 {
//     user: IUser | string;
//     led: number;
//     status: 'ON' | 'OFF';
// }

interface SeedUser {
    usuario: string;
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
            usuario: 'juank',
            email: 'juanknoriega070@gmail.com',
            password: bcrypt.hashSync('juankar10'),
            role: 'admin',
        },
        {
            usuario: 'eli',
            email: 'bettyfreire@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'client',
        },
    ],
    pills: [
        {
            nombre: 'Acido Alendronico',
            description: 'Antihipertensivo',
            image: 'acido_alendronico.png'
        },
        {
            nombre: 'Acido Valproico',
            description: 'Antihipertensivo',
            image: 'acido_valproico.png'
        },
        {
            nombre: 'Albendazol',
            description: 'Ibuprofeno',
            image: 'albendazol.png'
        },
        {
            nombre: 'Alprazolam',
            description: 'Ibuprofeno',
            image: 'alprazolam.png'
        },
        {
            nombre: 'Amlodipina',
            description: 'Antihipertensivo',
            image: 'amlodipina.png'
        },
        {
            nombre: 'Biperideno',
            description: 'Antihipertensivo',
            image: 'biperideno.png'
        },
        {
            nombre: 'Buprex',
            description: 'Ibuprofeno',
            image: 'buprex.png'
        },
        {
            nombre: 'Calcio Carbonato',
            description: 'Ibuprofeno',
            image: 'calcio_carbonato.png'
        },
        {
            nombre: 'Carbamazepina',
            description: 'Antihipertensivo',
            image: 'carbamazepina.png'
        },
        {
            nombre: 'Cefuroxima',
            description: 'Antihipertensivo',
            image: 'cefuroxima.png'
        },
        {
            nombre: 'Cirpril',
            description: 'Ibuprofeno',
            image: 'cirpril.png'
        },
        {
            nombre: 'Clopidogrel',
            description: 'Ibuprofeno',
            image: 'clopidogrel.png'
        },
        {
            nombre: 'Clortalidona',
            description: 'Antihipertensivo',
            image: 'clortalidona.png'
        },
        {
            nombre: 'Complejob',
            description: 'Antihipertensivo',
            image: 'complejob.png'
        },
        {
            nombre: 'Cotrimoxazol',
            description: 'Ibuprofeno',
            image: 'cotrimoxazol.png'
        },
        {
            nombre: 'Enalapril',
            description: 'Ibuprofeno',
            image: 'enalapril.png'
        },
        {
            nombre: 'Enalten',
            description: 'Antihipertensivo',
            image: 'enalten.png'
        },
        {
            nombre: 'Ibuprofeno',
            description: 'Antihipertensivo',
            image: 'ibuprofeno.png'
        },
        {
            nombre: 'Lamotrigina',
            description: 'Ibuprofeno',
            image: 'lamotrigina.png'
        },
        {
            nombre: 'Levofloxacina',
            description: 'Ibuprofeno',
            image: 'levofloxacina.png'
        },
        {
            nombre: 'Levotiroxina',
            description: 'Antihipertensivo',
            image: 'levotiroxina.png'
        },
        {
            nombre: 'Loratadina',
            description: 'Antihipertensivo',
            image: 'loratadina.png'
        },
        {
            nombre: 'Losartan',
            description: 'Ibuprofeno',
            image: 'losartan.png'
        },
        {
            nombre: 'Metformina',
            description: 'Ibuprofeno',
            image: 'metformina.png'
        },
        {
            nombre: 'Omeprazol',
            description: 'Antihipertensivo',
            image: 'omeprazol.png'
        },
        {
            nombre: 'Paracetamol',
            description: 'Antihipertensivo',
            image: 'paracetamol.png'
        },
        {
            nombre: 'Quetiapina',
            description: 'Ibuprofeno',
            image: 'quetiapina.png'
        },
        {
            nombre: 'Sertralina',
            description: 'Ibuprofeno',
            image: 'sertralina.png'
        },
        {
            nombre: 'Simvastatina',
            description: 'Antihipertensivo',
            image: 'simvastatina.png'
        },
        {
            nombre: 'Tamsulosina',
            description: 'Antihipertensivo',
            image: 'tamsulosina.png'
        },
        {
            nombre: 'Tinidazol',
            description: 'Ibuprofeno',
            image: 'tinidazol.png'
        },
        {
            nombre: 'Tiotropio Bromuro',
            description: 'Ibuprofeno',
            image: 'tiotropio_bromuro.png'
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