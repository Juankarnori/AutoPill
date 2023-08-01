import { MainLayout } from "@/components/layouts"
import { RecetarioList } from "@/components/recetario"
import { DosisCounter } from "@/components/ui"
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material"
import { useState } from "react"

const RecetarioPage = () => {

    const [quantity, setQuantity] = useState(0);
    const elementos: number[] = [];

    for (let index = 0; index < quantity; index++) {
        elementos.push(index)
    }

  return (
    <MainLayout title={"Recetario"} pageDescription={"Recetario"}>
        <Typography variant="h1" component='h1'>Recetario</Typography>

        <Box display='flex' flexDirection='row' alignItems='center'>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>Cantidad de Horario</Typography>
            {/* <DosisCounter 
                currentValue={quantity} 
                maxValue={6} 
                updatedQuantity={ setQuantity }
            /> */}
        </Box>
        
        <Grid container>
            <Grid item xs={ 12 } sm={ 7 } >
                {/* Recetario List */}
                {/* <RecetarioList /> */}
                {
                    elementos.map( ele => (
                        <Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography sx={{ mr: 2 }}>Hora</Typography>
                                <Typography>8:00</Typography>
                            </Box>
                            <Grid container>
                                <Grid item xs={12} sm={7}>

                                </Grid>
                                <Grid item xs={12} sm={5}>

                                </Grid>
                            </Grid>
                        </Box>
                    ))
                }
            </Grid>
            <Grid item xs={ 12 } sm={ 5 } >
                <Card className="summary-card">
                    <Typography variant="h2">Receta</Typography>
                    <Divider sx={{ my: 1 }} />

                    {/* Receta Summary */}

                    <Box sx={{ mt: 3 }}>
                        <Button color="secondary" className="circular-btn" fullWidth>
                            Recetar
                        </Button>
                    </Box>

                </Card>
            </Grid>
        </Grid>

    </MainLayout>
  )
}

export default RecetarioPage