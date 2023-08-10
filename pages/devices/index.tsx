import NextLink from 'next/link'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { MainLayout } from "@/components/layouts"
import { Button, Chip, Grid, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'usuario', headerName: 'Usuario', width: 150 },
  { field: 'device', headerName: 'Dispositivo', width: 150 },
  {
      field: 'vinculado',
      headerName: 'Vinculado',
      description: 'Muestra si el dispositivo esta vinculado',
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
          return (
              params.row.cargado
                  ? <Chip color="success" label="Cargado" variant="outlined" />
                  : <Chip color="error" label="No Cargado" variant="outlined" />
          )
      }
  },
  {
      field: 'receta',
      headerName: 'Ver orden',
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
          return (
              <NextLink href={`/recetas/${ params.row.recetaId }`} passHref legacyBehavior>
                  <Link underline='always'>
                      Ver orden
                  </Link>
              </NextLink>
          )
      }
  },
];

const rows: GridRowsProp = [
  { id: 1, usuario: 'juank',device: 1, cargado: true, receta: 1 }
]

const DevicesPage = () => {

  const router = useRouter();

  const onAgregarDevice = () => {
    router.push('/device/register');
  }

  return (
    <MainLayout title={"Pagina de Dispositivos"} pageDescription={"En esta pagina se encuentra todos los dispositivos"}>
        <Typography variant="h1" component='h1'>Dispositivos</Typography>
        <Button
          sx={{ mt: 2 }}
          color="secondary" 
          className="circular-btn" 
          onClick={ onAgregarDevice }
        >
          Agregar Dispositivo
        </Button>
        <Grid container className='fadeIn' mt={2}>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 }
                        }
                    }}
                    pageSizeOptions={[5, 10, 25]}
                />
            </Grid>
        </Grid>
    </MainLayout>
  )
}

export default DevicesPage