import { Device, IDevice } from '@/interface';
import { DeviceState } from './';

type DeviceActionType =
| { type: '[Device] - Registrar Dispositivo', payload: Device }
| { type: '[Device] - Actualizar Dispositivo', payload: Device }
| { type: '[Device] - LoadDevice from Cookies ', payload: Device }

export const deviceReducer = ( state: DeviceState, action: DeviceActionType ): DeviceState => {

    switch (action.type) {
        case '[Device] - Registrar Dispositivo':
            return {
                ...state,
                device: action.payload,
            }

        case '[Device] - LoadDevice from Cookies ':
            return {
                ...state,
                device: action.payload
            }

        case '[Device] - Actualizar Dispositivo':
            return {
                ...state,
                device: action.payload
            }

        default:
            return state;
    }

}