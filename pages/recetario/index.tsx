import { useContext, useEffect, useState } from "react"
import { GetServerSideProps, NextPage } from 'next'
import NextLink from "next/link";
import { useRouter } from "next/router"
import { Box, Button, Card, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { MainLayout } from "@/components/layouts"
import { RecetarioList } from "@/components/recetario"
import { RecetaContext } from "@/context"
import { EventBusy } from "@mui/icons-material"
import { jwt } from "@/utils";

const RecetarioPage:NextPage = () => {

    const { recetas, recetarios, addRecetario, isLoaded, createRecetario } = useContext(RecetaContext);
    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
      addRecetario(recetas)
    }, [recetas])

    const onCreateRecetario = async() => {
        setIsPosting(true);
        const { hasError, message } = await createRecetario();

        if ( hasError ) {
            setIsPosting(false);
            setErrorMessage( message );
            return;
        }

        router.replace(`/recetas/${ message }`);
        
    }
    
  return (
    <MainLayout title={"Recetario"} pageDescription={"Recetario"}>
        <Typography variant="h1" component='h1'>Recetario</Typography>
        
        <Grid container>
            <Grid item xs={ 12 } sm={ 7 } >
                {/* Recetario List */}
                <RecetarioList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 } >
                <Card className="summary-card">
                    <Typography variant="h2">Receta</Typography>
                    <Divider sx={{ my: 1 }} />

                    {/* Receta Summary */}
                    {
                        recetarios.map( r =>(
                            <Box key={r.hora}>
                                <Typography variant="subtitle1">Horario: {r.horario}</Typography>
                                {
                                    r.pills.map( p =>(
                                        <Box key={p._id}>
                                            <Typography>{p.nombre}</Typography>
                                        </Box>
                                    ))
                                }
                                <Divider color='negro' />
                            </Box>
                        ))
                    }

                    <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                        <Button 
                            color="secondary" 
                            className="circular-btn" 
                            fullWidth
                            onClick={ onCreateRecetario }
                            disabled={ isPosting }
                        >
                            Recetar
                        </Button>

                        <Chip 
                            color="error"
                            label={ errorMessage }
                            sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                        />
                    </Box>

                </Card>
            </Grid>
        </Grid>

    </MainLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken( token );
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/recetario',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default RecetarioPage