import NextLink from 'next/link'
import { MainLayout } from "@/components/layouts"
import { Box, Button, Card, Divider, Grid, Link, Typography } from "@mui/material"
import { EventBusy } from "@mui/icons-material"

const RecetarioEmpty = () => {
  return (
    <MainLayout title={"Recetario Vacio"} pageDescription={"Recetario Vacio"}>
        <Typography variant="h1" component='h1'>Recetario</Typography>
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
                <NextLink href='/pills' passHref legacyBehavior>
                    <Link typography='h4' color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </MainLayout>
  )
}

export default RecetarioEmpty