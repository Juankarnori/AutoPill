import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { AuthLayout } from "@/components/layouts"
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { validations } from "@/utils";
import { autopillApi } from "@/api";
import { AuthContext } from "@/context";
import { ErrorOutline } from "@mui/icons-material";

type FormaData = {
    email: string;
    password: string;
    usuario: string;
}

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser, isLoggedIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormaData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const onRegisterForm = async( { email, password, usuario }: FormaData ) => {

        setShowError(false);
        const { hasError, message } = await registerUser(usuario,email,password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        
        const destination = router.query.p?.toString() || '/'
        router.replace(destination);

    }

  return (
    <AuthLayout title={"Registrarse"}>
        <form onSubmit={ handleSubmit(onRegisterForm) }>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Crear Cuenta</Typography>
                        <Chip 
                            label={errorMessage}
                            color="error"
                            icon={ <ErrorOutline /> }
                            className="fadeIn"
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            label='Usuario' 
                            variant="filled" 
                            fullWidth 
                            { ...register('usuario', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Minimo 2 caracteres'}
                            }) 
                            }
                            error={ !!errors.usuario }
                            helperText={ errors.usuario?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Correo' 
                            variant="filled" 
                            fullWidth
                            { ...register('email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            }) 
                            }
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Password' 
                            variant="filled" 
                            fullWidth
                            { ...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Minimo 6 caracteres'}
                            }) 
                            }
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit" 
                            color="secondary" 
                            className="circular-btn" 
                            size="large" 
                            fullWidth
                        >
                            Registrarse
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink 
                            href={ router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login'}
                            passHref 
                            legacyBehavior
                        >
                            <Link underline="always">
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage