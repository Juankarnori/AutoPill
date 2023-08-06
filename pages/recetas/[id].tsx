import { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from "@/components/layouts"
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Grid, Typography } from "@mui/material"
import { jwt } from '@/utils'
import { db, dbPills, dbRecetas } from '@/database'
import { IPill, IRecetario, Recetario } from '@/interface'
import { CheckCircleOutlineOutlined, UnpublishedOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { autopillApi } from '@/api'
import { useRouter } from 'next/router'

interface Props {
  receta: IRecetario;
  recetarios: Recetario[];
  medicamentos: IPill[];
  id: string;
  userId: string;
}

const RecetasPage:NextPage<Props> = ({ receta, recetarios, medicamentos, id, userId }) => {

  const router = useRouter();

  const onRecetaUpdated = async( id: string, userId: string ) => {

    try {
      
      await autopillApi.put('/recetas/enviar',{ id, userId });

      router.reload();

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <MainLayout title={"Pagina de recetas"} pageDescription={"Pagina de recetas"}>
        <Typography variant="h1" component='h1'>Receta: {receta._id}</Typography>
        {
          receta.isLoaded
          ? (
              <Chip 
              sx={{ mt: 2 }}
              label='Cargado'
              variant='outlined'
              color='success'
              icon={ <CheckCircleOutlineOutlined />}
              />
            )
            : (
              <Chip 
                sx={{ mt: 2 }}
                label='No Cargado'
                variant='outlined'
                color='error'
                icon={ <UnpublishedOutlined />}
              />
            )
        }
        <Grid container sx={{ padding: '5px 5px' }} className='fadeIn'>

          <Grid item xs={12} sm={7}>
            <Typography variant='h1' sx={{ mt: 2 }}>Medicamentos</Typography>
            {
              medicamentos.map( p => (
                <Grid container key={ p.nombre } sx={{ mt: 2, borderRadius: 5, padding: '10px 10px', mr : 2 }} >
                    <Grid item xs={12} sm={4}>
                      <CardActionArea>
                        <CardMedia 
                          component='img'
                          image={ `/pills/${ p.image }` }
                          alt={ p.nombre }
                          sx={{ borderRadius: '5px' }}
                        />
                      </CardActionArea>
                    </Grid>
                    <Grid item xs={12} sm={8} textAlign='center' alignContent='center'>
                      <Typography variant='h2'>{p.nombre}</Typography>
                    </Grid>
                  </Grid>
              ))
            }
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card className='summary-card'>
              <CardContent>
                <Typography variant='h2'>Resumen Receta</Typography>
                <Divider sx={{ my: 1 }} />
                {
                  recetarios.map( r => (
                    <Box key={r.hora}>
                      <Typography variant='subtitle1'>Horario {r.horario}</Typography>
                      {
                        r.pills.map( p => (
                          <Box key={p.nombre}>
                            <Typography>{p.nombre}</Typography>
                          </Box>
                        ))
                      }
                      <Divider sx={{ my: 1 }} variant='middle'/>
                    </Box>
                  ))
                }
                <Box display='flex' flexDirection='row' >
                  {
                    receta.isLoaded
                    ? (
                        <Chip 
                        sx={{ mt: 2 }}
                        label='Cargado'
                        variant='outlined'
                        color='success'
                        icon={ <CheckCircleOutlineOutlined />}
                        />
                      )
                      : (
                        <Chip 
                          sx={{ mt: 2 }}
                          label='No Cargado'
                          variant='outlined'
                          color='error'
                          icon={ <UnpublishedOutlined />}
                        />
                      )
                  }
                  <Button 
                      sx={{ mt: 2 }}
                      color="secondary" 
                      className="circular-btn" 
                      fullWidth
                      onClick={ (e) => onRecetaUpdated( id, userId ) }
                      disabled={ receta.isLoaded }
                  >
                      Enviar Receta
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

    </MainLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const { id = '' } = query;

  const { token = '' } = req.cookies;
  let userId = ''
  let isValidToken = false;
  let recetarios: Recetario[] = [];
  let pills: IPill[] = [];
  let nombres: string[] = [];
  let medicamentos: IPill[] = [];

  await db.connect();

  try {
      userId = await jwt.isValidToken( token );
      isValidToken = true;
  } catch (error) {
      isValidToken = false;
  }

  if ( !isValidToken ) {
      return {
          redirect: {
              destination: `/auth/login?p=/recetas/${ id }`,
              permanent: false
          }
      }
  }

  const receta = await dbRecetas.getRecetaById( id.toString() );

  if ( !receta ) {
    return {
      redirect: {
        destination: '/recetas/history',
        permanent: false
      }
    }
  }

  if ( receta.user !== userId ) {
    return {
      redirect: {
        destination: '/recetas/history',
        permanent: false
      }
    }
  }

  const { recetas } = receta;

  for (let index = 0; index < recetas.length; index++) {
      pills = []
        for (let index1 = 0; index1 < recetas[index].pills.length; index1++) {
          const pillId = recetas[index].pills[index1]
          const pill = await dbPills.getPillById(pillId as any)
          if ( pill ) {
            pills = [...pills,pill]
            if ( !nombres.includes( pill.nombre ) ) {
              nombres = [...nombres,pill.nombre]
              medicamentos = [...medicamentos,pill]
            }
          }
        }
        const recetario: Recetario = {
          hora: recetas[index].hora,
          horario: recetas[index].horario,
          pills
        }
        recetarios = [...recetarios,recetario]
  }

  await db.disconnect();

  return {
    props: {
      receta,
      recetarios,
      medicamentos,
      id,
      userId
    }
  }
}

export default RecetasPage