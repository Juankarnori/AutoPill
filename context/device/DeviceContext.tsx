import { Device, IDevice } from '@/interface';
import { createContext } from 'react';

interface ContextProps {
    device: Device;
    registerDevice: (nombre: string, chipId: string) => Promise<{ hasError: boolean; message?: string; }>;
    updateDevice: (chipId: string) => Promise<{ hasError: boolean; message?: string; }>;
}

export const DeviceContext = createContext({} as ContextProps);