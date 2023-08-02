import NextLink from "next/link";
import { Box, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "@/database/seed-data"
import { useContext } from "react";
import { RecetaContext } from "@/context";

const pillsInRecetario = [
    initialData.pills[0],
    initialData.pills[1],
]

export const RecetarioList = () => {

  const {recetas} = useContext(RecetaContext);

  return (
    <>
        {
          recetas.map( r  =>(
            <Grid container spacing={2} key={ r.pill.nombre } sx={{ mb: 1 }}>
              <Grid item xs={7}>
                <NextLink href='/pill/Cirpril' passHref legacyBehavior>
                  <Link>
                    <CardActionArea>
                      <CardMedia 
                        component='img'
                        image={ `/pills/${ r.pill.image }` }
                        alt={ r.pill.nombre }
                        sx={{ borderRadius: '5px' }}
                      />
                    </CardActionArea>
                  </Link>
                </NextLink>
              </Grid>
              <Grid item xs={5}>
                <Box display='flex' flexDirection='column'>
                  <Typography variant="subtitle1">{ r.pill.nombre }</Typography>
                  <Typography variant="subtitle2">Horarios</Typography>
                  {
                    r.datos.map( dato =>(
                      <Box key={ dato.dosis }>
                        <Typography variant="subtitle2">{ dato.dosis }: { dato.horario }</Typography>
                      </Box>
                    ))
                  }
                </Box>
              </Grid>
            </Grid>
          ))
        }
    </>
  )
}
