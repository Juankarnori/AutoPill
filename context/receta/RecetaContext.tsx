import { Receta } from '@/interface';
import { createContext } from 'react';

interface ContextProps {
    recetas: Receta[];
    addRecetaToRecetario: (receta: Receta) => void;
}

export const RecetaContext = createContext({} as ContextProps);