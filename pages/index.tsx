import { NextPage } from 'next'
import { useContext } from 'react';
import { MainLayout } from '@/components/layouts'
import { Box, Typography } from '@mui/material';
import { AuthContext } from '@/context';

const Home: NextPage = () => {

  const { user } = useContext(AuthContext);

  return (
    <MainLayout title={'AutoPill - Home'} pageDescription={'Pagina de aplicacion AutoPill'}>
      <Typography variant='h1' component='h1'>Home</Typography>
      <Box display='flex' flexDirection='row' sx={{ display: user ? 'flex' : 'none'}} alignItems='center'>
        <Typography mr={1} variant='h1' fontWeight={500} >Bienvenido</Typography>
        <Typography autoCapitalize='true' variant='h2' fontSize={30}  fontWeight={200} >{ user?.usuario }</Typography>
      </Box>
    </MainLayout>
  )
}

export default Home;
