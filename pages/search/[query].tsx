import { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from '@/components/layouts'
import { PillList } from '@/components/pills';
import { FullScreenLoading } from '@/components/ui';
import { usePills } from '@/hooks';
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { dbPills } from '@/database';
import { IPill } from '@/interface';

interface Props {
    pills: IPill[];
    foundPills: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ pills, foundPills, query }) => {

  return (
    <MainLayout title={'Pagina de Busqueda'} pageDescription={'Pagina de Busqueda'}>
        <Typography variant='h1' component='h1'>Buscar Producto</Typography>

        {
            foundPills
                ? <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Termino: {query}</Typography>
                : (
                    <Box display='flex' >
                        <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningun producto</Typography>
                        <Typography variant='h2' sx={{ ml: 1 }} color='secondary' textTransform='capitalize'>{query}</Typography>
                    </Box>
                )
        }

        <PillList pills={ pills } />

    </MainLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let pills = await dbPills.getPillsByTerm( query );
    const foundPills = pills.length > 0;

    if ( !foundPills ) {
        pills = await dbPills.getAllPills();
    }

    return {
        props: {
            pills,
            foundPills,
            query
        }
    }
}

export default SearchPage