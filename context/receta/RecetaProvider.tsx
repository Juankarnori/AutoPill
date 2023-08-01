import { FC, PropsWithChildren, useReducer } from 'react';
import { RecetaContext, recetaReducer } from './';
import { Receta } from '@/interface';

export interface RecetaState {
    receta: Receta;
}

const Receta_INITIAL_STATE: RecetaState = {
    receta: {
        pill: '',
        datos: []
    },
}

export const RecetaProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(recetaReducer, Receta_INITIAL_STATE);

    return (
        <RecetaContext.Provider value={{
            ...state
        }}>
            { children }
        </RecetaContext.Provider>
    )
};