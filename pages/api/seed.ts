import { db, seedDatabase } from '@/database'
import { Pill, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();
    await Pill.deleteMany();
    await Pill.insertMany( seedDatabase.initialData.pills );

    await User.deleteMany();
    await User.insertMany( seedDatabase.initialData.users );

    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}