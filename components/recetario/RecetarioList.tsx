import NextLink from "next/link";
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { useContext } from "react";
import { RecetaContext } from "@/context";

export const RecetarioList = () => {

  const {recetas, removeRecetarioReceta} = useContext(RecetaContext);

  return (
    <>
        {
          recetas.map( r  =>(
            <Grid container spacing={2} key={ r.pill.nombre } sx={{ mb: 1 }}>
              <Grid item xs={7}>
                <NextLink href={`/pill/${r.pill.nombre}`} passHref legacyBehavior>
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
                      <Box key={ dato.hora }>
                        <Typography variant="subtitle2">{ dato.horario }</Typography>
                      </Box>
                    ))
                  }
                  <Box>
                    <Button 
                      variant="text" 
                      color="secondary"
                      onClick={ () => removeRecetarioReceta(r)}
                    >
                      Remover
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))
        }
    </>
  )
}
