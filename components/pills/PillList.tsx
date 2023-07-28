import { FC } from "react"
import { Grid } from "@mui/material"
import { IPill } from "@/interface"
import { PillCard } from "./PillCard"

interface Props {
    pills: IPill[]
}

export const PillList:FC<Props> = ({ pills }) => {
  return (
    <Grid container spacing={4}>
        {
            pills.map( pill => (
                <PillCard 
                    key={ pill.nombre }
                    pill={ pill }
                />
            ))
        }
    </Grid>
  )
}
