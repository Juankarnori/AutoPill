import { Receta } from '@/interface';
import { RecetaState } from './';

type RecetaActionType =
| { type: '[Receta] - Agregar Receta', payload: Receta[] }
| { type: '[Receta] - LoadRecetario from cookies', payload: Receta[] }

export const recetaReducer = ( state: RecetaState, action: RecetaActionType ): RecetaState => {

    switch (action.type) {
        case '[Receta] - Agregar Receta':
            return {
                ...state,
                recetas: [ ...action.payload]
            }
        
        case '[Receta] - LoadRecetario from cookies':
            return {
                ...state,
                recetas: [ ...action.payload]
            }

        default:
            return state;
    }

}