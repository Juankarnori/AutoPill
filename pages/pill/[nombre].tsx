import { NextPage } from "next";
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { MainLayout } from "@/components/layouts"
import { FullScreenLoading } from "@/components/ui";
import { usePill, usePills } from "@/hooks";
import { IPill } from "@/interface";
import { Box, Button, Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { dbPills } from "@/database";

interface Props {
    pill: IPill
}

const PillPage:NextPage<Props> = ({ pill }) => {

    // const router = useRouter();
    // const { pill, isLoading, error } = usePill(`/pills/${ router.query.nombre }`);

    // if ( isLoading ) {
    //     return <FullScreenLoading />
    // }

    // if ( !pill ) {
    //     return <h1>No existe</h1>
    // }

  return (
    <MainLayout title={ pill.nombre } pageDescription={ pill.description }>
        <Grid container spacing={3}>

            <Grid item xs={12} sm={7}>
                <Card sx={{ padding: '10px 10px' }}>
                    <CardActionArea>
                        <CardMedia 
                            component='img'
                            image={ `/pills/${ pill.image }` }
                            alt={ pill.nombre }
                        />
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={12} sm={5}>
                <Box display='flex' flexDirection='column'>
                    
                    {/* titulos */}
                    <Typography variant="h1" component='h1'>{pill.nombre}</Typography>

                    {/* Agregar boton */}
                    <Button color="secondary" className="circular-btn" sx={{ mt: 2 }}>
                        Agregar
                    </Button>

                    {/* Descripcion */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h2" fontWeight={700}>Descripcion</Typography>
                        <Typography variant="subtitle1" fontWeight={400}>{pill.description}</Typography>
                    </Box>

                </Box>
            </Grid>

        </Grid>
    </MainLayout>
  )
}

// getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { nombre = '' } = params as { nombre: string };
    const pill = await dbPills.getPillByNombre( nombre );

    if ( !pill ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pill
        }
    }
}

export default PillPage