import { MainLayout } from '@/components/layouts'
import { PillList } from '@/components/pills';
import { FullScreenLoading } from '@/components/ui';
import { usePills } from '@/hooks';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

const PillsPage = () => {

  const { pills, isLoading, error } = usePills('/pills');

  return (
    <MainLayout title={'Pagina de Medicamentos'} pageDescription={'En esta pagina se muestra todos los medicamentos'}>
        <Typography variant='h1' component='h1'>Medicamentos</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <PillList pills={ pills } />
        }


    </MainLayout>
  )
}

export default PillsPage