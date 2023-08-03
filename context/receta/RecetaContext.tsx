import { Receta, Recetario } from '@/interface';
import { createContext } from 'react';

interface ContextProps {
    recetas: Receta[];
    recetarios: Recetario[];
    addRecetaToRecetario: (receta: Receta) => void;
    removeRecetarioReceta: (receta: Receta) => void;
    addRecetario: (recetas: Receta[]) => void;
}

export const RecetaContext = createContext({} as ContextProps);