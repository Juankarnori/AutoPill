import { Receta } from '@/interface';
import { createContext } from 'react';

interface ContextProps {
    receta: Receta;
}

export const RecetaContext = createContext({} as ContextProps);