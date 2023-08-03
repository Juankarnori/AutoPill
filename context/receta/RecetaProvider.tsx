import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { RecetaContext, recetaReducer } from './';
import { Data, IPill, Receta, Recetario } from '@/interface';
import { horarios } from '@/utils';

export interface RecetaState {
    recetas: Receta[];
    recetarios: Recetario[];
}

const Receta_INITIAL_STATE: RecetaState = {
    recetas: [],
    recetarios: [],
}

export const RecetaProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(recetaReducer, Receta_INITIAL_STATE);

    useEffect(() => {
      const cookieReceta: Receta[] = Cookie.get('receta') ? JSON.parse( Cookie.get('receta')! ) : []
    //   const cookieRecetario: Recetario[] = Cookie.get('recetario') ? JSON.parse( Cookie.get('recetario')! ) : []
      dispatch({ type: '[Receta] - LoadReceta from cookies', payload: cookieReceta });
    //   dispatch({ type: '[Recetario] - LoadRecetario from cookies', payload: cookieRecetario });
    }, [])
    
    useEffect(() => {
        if(state.recetas.length === 0) return
        // if(state.recetarios.length === 0) return
      Cookie.set('receta', JSON.stringify( state.recetas ))
    //   Cookie.set('recetario',JSON.stringify( state.recetarios ))
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

    const addRecetario = ( recetas: Receta[] ) => {
        let recetario: Recetario[] = [];
        let recet: Recetario;
        let datos: Data[] = [];
        let dato: Data;
        let horas: number[] = [];
        let horario: string[] = [];
        let pills: IPill[] = [];
        recetas.map( r =>{
            r.datos.map( d =>{
                if ( horas.includes(d.hora) ) return;
                horas = [...horas,d.hora]
                horario = [...horario,horarios[d.hora].name]
                dato = {
                    hora: d.hora,
                    horario: horarios[d.hora].name
                }
                datos = [...datos,dato]
            })
        })
        datos.sort((x,y) => x.hora - y.hora)
        datos.map( d =>{
            pills = []
            recetas.map( r =>{
                r.datos.map ( rd =>{
                    if ( rd.hora === d.hora ) {
                        pills = [...pills,r.pill]
                    }
                })
            })
            recet = {
                hora: d.hora,
                horario: d.horario,
                pills
            }
            recetario = [...recetario,recet]
        })
        dispatch({ type: '[Recetario] - Agregar Recetario', payload: recetario })
    }

    const removeRecetarioReceta = ( receta: Receta ) => {
        dispatch({ type: '[Receta] - Remove Receta in Recetario', payload: receta})
    }

    return (
        <RecetaContext.Provider value={{
            ...state,

            addRecetaToRecetario,
            removeRecetarioReceta,
            addRecetario,
        }}>
            { children }
        </RecetaContext.Provider>
    )
};