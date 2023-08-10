import { GetServerSideProps, NextPage } from "next"
import { useContext, useEffect } from "react"
import { MainLayout } from "@/components/layouts"
import { DeviceContext } from "@/context"
import { SyncDisabledOutlined, SyncOutlined } from "@mui/icons-material"
import { Box, Card, CardActionArea, CardMedia, Chip, Divider, Grid, Typography } from "@mui/material"
import { jwt } from "@/utils"
import { db, dbDevice, dbPills, dbRecetas } from "@/database"
import { Device, Pill, Recetario } from "@/models"
import { IDevice, IPill, Recetario as Recetarios } from "@/interface"

interface Props {
  recetarios: Recetarios[];
  medicamentos: IPill[];
  device: IDevice;
}

const DevicePage:NextPage<Props> = ({ medicamentos, recetarios, device }) => {

  const { updateDevice } = useContext(DeviceContext);

  // useEffect(() => {
  //   updateDevice(device.chipId);
  // }, [])

  return (
    <MainLayout title={"Pagina del dispositivo"} pageDescription={"Pagina del dispositivo"}>
      <Box>
        <Typography variant="h1" component='h1'>Dispositivo: {device.nombre}</Typography>
        {
          device.isPair
          ? (
              <Chip 
              sx={{ mt: 2 }}
              label='Emparejado'
              variant='outlined'
              color='success'
              icon={ <SyncOutlined />}
              />
            )
            : (
              <Chip 
                sx={{ mt: 2 }}
                label='No Emparejado'
                variant='outlined'
                color='error'
                icon={ <SyncDisabledOutlined />}
              />
            )
        }
        <Grid container mt={2} >

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
            <Card className="summary-card">
              <Typography variant="h1">Resumen</Typography>
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
            </Card>
          </Grid>

        </Grid>
      </Box>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const { token = '' } = req.cookies;
  let isValidToken = false;
  let userId = '';
  let recetarios: Recetarios[] = [];
  let pills: IPill[] = [];
  let nombres: string[] = [];
  let medicamentos: IPill[] = [];

  try {
      userId = await jwt.isValidToken( token );
      isValidToken = true;
  } catch (error) {
      isValidToken = false;
  }

  if ( !isValidToken ) {
      return {
          redirect: {
              destination: '/auth/login?p=/device',
              permanent: false
          }
      }
  }

  const receta = await dbRecetas.getRecetaLoadedByUser(userId);

  if ( !receta ) {
    return {
      redirect: {
        destination: '/pills',
        permanent: false
    }
  }
  }

  const device = await dbDevice.getDeviceByUser(userId);

  if ( !device ) {
    return {
      redirect: {
          destination: '/device/register',
          permanent: false
      }
  }
  }

  const recetas = receta?.recetas

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
      const recetario: Recetarios = {
        hora: recetas[index].hora,
        horario: recetas[index].horario,
        pills
      }
      recetarios = [...recetarios,recetario]
  }

  return {
      props: {
        medicamentos,
        recetarios,
        device
      }
  }
}

export default DevicePage