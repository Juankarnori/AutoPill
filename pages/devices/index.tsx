import { MainLayout } from "@/components/layouts"
import { Typography } from '@mui/material';

const DevicesPage = () => {
  return (
    <MainLayout title={"Pagina de Dispositivos"} pageDescription={"En esta pagina se encuentra todos los dispositivos"}>
        <Typography variant="h1" component='h1'>Dispositivos</Typography>
    </MainLayout>
  )
}

export default DevicesPage