import { FC } from "react"
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props {
    currentValue: number;
    maxValue: number;
    horario: string;

    updatedQuantity: (newvalue: number) => void;
}

interface Data {
    dosis: number;
    hora?: string;
}

export const DosisCounter:FC<Props> = ({ currentValue, updatedQuantity, maxValue, horario }) => {

    const datos: Data[] = [];

    const addOrRemove = ( value: number ) => {

        let dato:Data = {
            dosis: currentValue,
            hora: horario
        }

        if ( value === -1 ) {
            if ( currentValue === 0 ) return;

            console.log('Remove')
            console.log(dato)

            return updatedQuantity( currentValue - 1 );
        }

        if ( currentValue >= maxValue ) return;

        console.log('Add')
        console.log(dato)

        datos.push( dato )
        datos.push( dato )
        console.log(datos)

        updatedQuantity( currentValue + 1 )

    }

  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={ () => addOrRemove(-1) }>
            <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign: 'center' }}> {currentValue} </Typography>
        <IconButton onClick={ () => addOrRemove(+1) }>
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}
