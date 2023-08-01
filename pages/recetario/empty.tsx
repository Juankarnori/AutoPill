import NextLink from 'next/link'
import { MainLayout } from "@/components/layouts"
import { EventBusy } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"

const EmptyPage = () => {
  return (
    <MainLayout title={"Recetario Vacio"} pageDescription={"No hay mediacmentos en el recetario"}>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <EventBusy sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>Su recetario esta vacio</Typography>
                <NextLink href='/' passHref legacyBehavior>
                    <Link typography='h4' color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </MainLayout>
  )
}

export default EmptyPage