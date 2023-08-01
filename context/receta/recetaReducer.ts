import { Receta } from '@/interface';
import { RecetaState } from './';

type RecetaActionType =
| { type: '[Receta] - Agregar Receta', payload: Receta}

export const recetaReducer = ( state: RecetaState, action: RecetaActionType ): RecetaState => {

    switch (action.type) {
        case '[Receta] - Agregar Receta':
            return {
                ...state,
            }

        default:
            return state;
    }

}