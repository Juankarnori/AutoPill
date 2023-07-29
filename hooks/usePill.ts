import { IPill } from "@/interface";
import useSWR, { SWRConfiguration } from "swr"

export const usePill = ( url: string, config: SWRConfiguration = {} ) => {

    const { data, error, isLoading } = useSWR<IPill>(`/api${ url }`, config);

    return {
        pill: data,
        isLoading,
        error
    }

}