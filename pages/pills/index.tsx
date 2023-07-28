import { MainLayout } from '@/components/layouts'
import { PillList } from '@/components/pills';
import { initialData } from '@/database/seed-data';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

const PillsPage = () => {
  return (
    <MainLayout title={'Pagina de Medicamentos'} pageDescription={'En esta pagina se muestra todos los medicamentos'}>
        <Typography variant='h1' component='h1'>Medicamentos</Typography>

        <PillList 
          pills={ initialData.pills }          
        />

    </MainLayout>
  )
}

export default PillsPage