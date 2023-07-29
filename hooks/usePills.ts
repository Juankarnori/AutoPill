import { IPill } from "@/interface";
import useSWR, { SWRConfiguration } from "swr"

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const usePills = ( url: string, config: SWRConfiguration = {} ) => {

    // const { data, error, isLoading } = useSWR<IPill[]>(`/api${ url }`, fetcher, config);
    const { data, error, isLoading } = useSWR<IPill[]>(`/api${ url }`, config);

    return {
        pills: data || [],
        isLoading,
        error
    }

}