import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { DeviceContext, deviceReducer } from './';
import { Device, IDevice } from '@/interface';
import { autopillApi } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface DeviceState {
    device: Device;
}

const Device_INITIAL_STATE: DeviceState = {
    device: {
        nombre: '',
        chipId: '',
        isPair: false,
        hora: []
    }
}

export const DeviceProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(deviceReducer, Device_INITIAL_STATE);

    useEffect(() => {
        try {
            const cookieDevice: Device = Cookies.get('device') ? JSON.parse( Cookies.get('device')! ) : []
            dispatch({ type: '[Device] - LoadDevice from Cookies ', payload: cookieDevice });
        } catch (error) {
            dispatch({ type: '[Device] - LoadDevice from Cookies ', payload: {
                nombre: '',
                chipId: '',
                isPair: false,
                hora: []
            } });
        }
    }, [])

    useEffect(() => {
      if ( state.device.chipId === '' ) return;
      Cookies.set('device', JSON.stringify(state.device))
    }, [state.device])
    
    const registerDevice = async( nombre: string, chipId: string ): Promise<{hasError: boolean; message?: string}> => {

        try {
            const { data } = await autopillApi.post('/device/register',{ nombre, chipId });
            const { device, horas } = data;
            const payload: Device = {
                nombre: device.nombre,
                chipId: device.chipId,
                isPair: device.isPair,
                hora: horas
            }
            dispatch({ type: '[Device] - Registrar Dispositivo', payload });
            return {
                hasError: false
            }
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                console.log(error.response?.data.message)
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'No se pudo registrar el dispositivo'
            }
        }

    } 

    const updateDevice = async( chipId: string ): Promise<{hasError: boolean; message?: string}>  => {

        try {
            const { data } = await autopillApi.get(`/device?chipId=${chipId}`);
            const { device, horas } = data;
            const payload: Device = {
                nombre: device.nombre,
                chipId: device.chipId,
                isPair: device.isPair,
                hora: horas
            }
            dispatch({ type: '[Device] - Actualizar Dispositivo', payload });
            return {
                hasError: false
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
                message: 'No se pudo registrar el dispositivo'
            }
        }

    }

    return (
        <DeviceContext.Provider value={{
            ...state,
            registerDevice,
            updateDevice
        }}>
            { children }
        </DeviceContext.Provider>
    )
};