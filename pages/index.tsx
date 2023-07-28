import { MainLayout } from '@/components/layouts'
import { Typography } from '@mui/material';
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <MainLayout title={'AutoPill - Home'} pageDescription={'Pagina de aplicacion AutoPill'}>
      <Typography variant='h1' component='h1'>Home</Typography>
    </MainLayout>
  )
}

export default Home;
