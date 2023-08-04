import { useContext, useEffect, useState } from "react"
import NextLink from "next/link";
import { useRouter } from "next/router"
import { Box, Button, Card, Divider, Grid, Link, Typography } from "@mui/material"
import { MainLayout } from "@/components/layouts"
import { RecetarioList } from "@/components/recetario"
import { RecetaContext } from "@/context"
import { EventBusy } from "@mui/icons-material"

const RecetarioPage = () => {

    const { recetas, recetarios, addRecetario, isLoaded } = useContext(RecetaContext);
    const router = useRouter();

    useEffect(() => {
      addRecetario(recetas)
    }, [recetas])

  return (
    <MainLayout title={"Recetario"} pageDescription={"Recetario"}>
        <Typography variant="h1" component='h1'>Recetario</Typography>
        
        <Grid container>
            <Grid item xs={ 12 } sm={ 7 } >
                {/* Recetario List */}
                <RecetarioList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 } >
                <Card className="summary-card">
                    <Typography variant="h2">Receta</Typography>
                    <Divider sx={{ my: 1 }} />

                    {/* Receta Summary */}
                    {
                        recetarios.map( r =>(
                            <Box key={r.hora}>
                                <Typography variant="subtitle1">Horario: {r.horario}</Typography>
                                {
                                    r.pills.map( p =>(
                                        <Box key={p._id}>
                                            <Typography>{p.nombre}</Typography>
                                        </Box>
                                    ))
                                }
                                <Divider color='negro' />
                            </Box>
                        ))
                    }

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