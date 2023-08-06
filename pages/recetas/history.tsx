import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { MainLayout } from "@/components/layouts"
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { jwt } from '@/utils';
import { db, dbRecetas, dbUsers } from '@/database';
import { IRecetario } from '@/interface';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'usuario', headerName: 'Usuario', width: 300 },
    {
        field: 'cargado',
        headerName: 'Cargado',
        description: 'Muestra si esta cargada la receta en el dispositivo',
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

interface Props {
    recetas: IRecetario[];
    usuario: string;
}

const HistoryPage:NextPage<Props> = ({ recetas, usuario }) => {

    const rows = recetas.map( (receta, idx) => ({
        id: idx + 1,
        cargado: receta.isLoaded,
        usuario: usuario,
        recetaId: receta._id
    }))

  return (
    <MainLayout title={"Historial de recetas"} pageDescription={"Historial de recetas"}>
        <Typography variant="h1" component='h1'>Historial de Recetas</Typography>

        <Grid container className='fadeIn'>
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = '' } = req.cookies;
    let isValidToken = false;
    let userId = ''

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
                destination: '/auth/login?p=/recetario',
                permanent: false
            }
        }
    }

    const usuario = await dbUsers.getUsuarioById( userId );

    if ( !usuario ) {
        return {
            redirect: {
                destination: '/auth/login?p=/recetario',
                permanent: false
            }
        }
    }

    const recetas = await dbRecetas.getRecetasByUser( userId );
    await db.disconnect();

    return {
        props: {
            id: userId,
            usuario,
            recetas
        }
    }
}

export default HistoryPage