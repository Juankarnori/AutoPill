import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { RecetaContext, recetaReducer } from './';
import { Receta } from '@/interface';

export interface RecetaState {
    recetas: Receta[];
}

const Receta_INITIAL_STATE: RecetaState = {
    recetas: [],
}

export const RecetaProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(recetaReducer, Receta_INITIAL_STATE);

    useEffect(() => {
      const cookieRecetario = Cookie.get('recetario') ? JSON.parse( Cookie.get('recetario')! ) : []
      dispatch({ type: '[Receta] - LoadRecetario from cookies', payload: cookieRecetario });
    }, [])
    

    useEffect(() => {
        if(state.recetas.length === 0) return
      Cookie.set('recetario', JSON.stringify( state.recetas ))
    }, [state.recetas])

    const addRecetaToRecetario = ( receta: Receta ) => {
        if ( receta.datos.length === 0 ) {
            return;
        }
        const recetaInRecetario = state.recetas.some( p => p.pill.nombre === receta.pill.nombre );
        if ( !recetaInRecetario ) return dispatch({ type: '[Receta] - Agregar Receta', payload: [...state.recetas, receta ] })

        const updatedRecetas = state.recetas.map( r =>{
            if( r.pill.nombre !== receta.pill.nombre ) return r;

            r.datos = receta.datos
            return r;
        });

        dispatch({ type: '[Receta] - Agregar Receta', payload: updatedRecetas })
    }

    return (
        <RecetaContext.Provider value={{
            ...state,

            addRecetaToRecetario
        }}>
            { children }
        </RecetaContext.Provider>
    )
};