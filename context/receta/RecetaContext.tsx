import { Receta, Recetario } from '@/interface';
import { createContext } from 'react';

interface ContextProps {
    isLoaded: boolean;
    recetas: Receta[];
    recetarios: Recetario[];
    addRecetaToRecetario: (receta: Receta) => void;
    removeRecetarioReceta: (receta: Receta) => void;
    addRecetario: (recetas: Receta[]) => void;
    createRecetario: () => Promise<{ hasError: boolean; message: string; }>;
}

export const RecetaContext = createContext({} as ContextProps);