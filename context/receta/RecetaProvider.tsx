import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { RecetaContext, recetaReducer } from './';
import { Data, IPill, IRecetario, Receta, Recetario } from '@/interface';
import { horarios } from '@/utils';
import { autopillApi } from '@/api';
import { AuthContext } from '../auth';
import axios from 'axios';

export interface RecetaState {
    isLoaded: boolean;
    recetas: Receta[];
    recetarios: Recetario[];
}

const Receta_INITIAL_STATE: RecetaState = {
    isLoaded: false,
    recetas: [],
    recetarios: [],
}

export const RecetaProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(recetaReducer, Receta_INITIAL_STATE);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        try {
            const cookieReceta: Receta[] = Cookie.get('receta') ? JSON.parse( Cookie.get('receta')! ) : []
            dispatch({ type: '[Receta] - LoadReceta from cookies', payload: cookieReceta });
        } catch (error) {
            dispatch({ type: '[Receta] - LoadReceta from cookies', payload: []})
        }
    }, [])
    
    useEffect(() => {
        if(state.recetas.length === 0) return
        Cookie.set('receta', JSON.stringify( state.recetas ))
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
        const updateReceta = state.recetas.filter( r => !(r.pill.nombre === receta.pill.nombre) );
        Cookie.set('receta', JSON.stringify( updateReceta ))
        dispatch({ type: '[Receta] - Remove Receta in Recetario', payload: receta})
    }

    const createRecetario = async(): Promise<{ hasError: boolean; message: string; }> => {

        if ( !state.recetarios ) {
            throw new Error('No hay recetarios');
        }

        const body: IRecetario = {
            recetas: state.recetarios,
        }

        try {
            
            const { data } = await autopillApi.post<IRecetario>('/recetario', body);

            dispatch({ type: '[Receta] - Recceta complete'});

            Cookie.set('receta', JSON.stringify( [] ))

            return {
                hasError: false,
                message: data._id!
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'Error no contrado, hable con el administrador'
            }
        }

    }

    return (
        <RecetaContext.Provider value={{
            ...state,

            addRecetaToRecetario,
            removeRecetarioReceta,
            addRecetario,
            createRecetario,
        }}>
            { children }
        </RecetaContext.Provider>
    )
};