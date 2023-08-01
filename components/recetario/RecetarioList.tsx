import { initialData } from "@/database/seed-data"
import { Typography } from "@mui/material"

const pillsInRecetario = [
    initialData.pills[0],
    initialData.pills[1],
]

export const RecetarioList = () => {
  return (
    <>
        {
            pillsInRecetario.map( pill => (
                <Typography key={pill.nombre}>{pill.nombre}</Typography>
            ))
        }
    </>
  )
}
