import { Receta, Recetario } from '@/interface';
import { RecetaState } from './';

type RecetaActionType =
| { type: '[Receta] - Agregar Receta', payload: Receta[] }
| { type: '[Recetario] - Agregar Recetario', payload: Recetario[] }
| { type: '[Receta] - LoadReceta from cookies', payload: Receta[] }
| { type: '[Receta] - Remove Receta in Recetario', payload: Receta }

export const recetaReducer = ( state: RecetaState, action: RecetaActionType ): RecetaState => {

    switch (action.type) {
        case '[Receta] - Agregar Receta':
            return {
                ...state,
                recetas: [ ...action.payload]
            }
        
        case '[Receta] - LoadReceta from cookies':
            return {
                ...state,
                isLoaded: true,
                recetas: [ ...action.payload]
            }

        case '[Recetario] - Agregar Recetario':
            return {
                ...state,
                recetarios: [ ...action.payload ]
            }

        case '[Receta] - Remove Receta in Recetario':
            return {
                ...state,
                recetas: state.recetas.filter( r => !(r.pill.nombre === action.payload.pill.nombre) )
            }

        default:
            return state;
    }

}