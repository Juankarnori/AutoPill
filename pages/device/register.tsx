import { useForm } from "react-hook-form";
import { MainLayout } from "@/components/layouts"
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { DeviceContext } from "@/context";
import { useRouter } from "next/router";
import { ErrorOutline } from "@mui/icons-material";
import { GetServerSideProps } from "next";
import { jwt } from "@/utils";
import { db, dbDevice } from "@/database";
import { Device } from "@/models";

type FormaData = {
    nombre: string;
    chipId: string;
}

const RegisterDevice = () => {

    const router = useRouter();
    const { registerDevice } = useContext(DeviceContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormaData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterDevice = async( { nombre, chipId}:FormaData ) =>{

        setShowError(false);
        const { hasError, message } = await registerDevice(nombre,chipId);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        router.replace('/device')

    }

  return (
    <MainLayout title={"Crear Dispositivo"} pageDescription={"En esta pagina se creara un dispositivo"}>
        <Typography variant="h1" component='h1'>Nuevo Dispositivo</Typography>
        <Chip 
            label={errorMessage}
            color="error"
            icon={ <ErrorOutline /> }
            className="fadeIn"
            sx={{ display: showError ? 'flex' : 'none' }}
        />
        <form onSubmit={ handleSubmit(onRegisterDevice) }>
            <Grid container mt={2} spacing={2}>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Nombre' 
                        variant="filled" 
                        fullWidth
                        { ...register('nombre') }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField 
                        label='ChipId' 
                        variant="filled" 
                        fullWidth
                        { ...register('chipId') }
                    />
                </Grid>

                <Grid item display='flex' flex={1} justifyContent='center'>
                    <Button
                        type="submit"
                        sx={{ mt: 2 }}
                        color="secondary" 
                        className="circular-btn" 
                        // onClick={ onAgregarDevice }
                    >
                        Crear Dispositivo
                    </Button>
                </Grid>

            </Grid>
        </form>
    </MainLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { token = '' } = req.cookies;
    let isValidToken = false;
    let userId = '';

    try {
        userId = await jwt.isValidToken( token );
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }
  
    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/device/register',
                permanent: false
            }
        }
    }

    const device = await dbDevice.getDeviceByUser(userId);
    console.log({device});

    if ( device ) {
        await db.disconnect();
        return {
            redirect: {
                destination: '/device',
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default RegisterDevice