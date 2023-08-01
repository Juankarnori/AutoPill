import { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from 'next';
// import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { MainLayout } from "@/components/layouts"
import { DosisCounter, FullScreenLoading } from "@/components/ui";
import { usePill, usePills } from "@/hooks";
import { Data, IPill, Receta } from "@/interface";
import { Box, Button, Card, CardActionArea, CardMedia, Divider, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { dbPills } from "@/database";
import { useEffect, useState } from "react";
import { horarios } from "@/utils";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

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

    const [quantity, setQuantity] = useState(0);
    const [hora, setHora] = useState(horarios[6].name);
    const [datos, setDatos] = useState<Data[]>([]);
    const elementos: number[] = [];

    for (let index = 0; index < quantity; index++) {
        elementos.push(index+1)
    }

    const onChageHora = ( event: SelectChangeEvent ) => {
        setHora(event.target.value);
    }

    const addQuantity = () => {

        let dato:Data = {
            dosis: quantity + 1,
            hora: horarios.find( ({name}) => name === hora )?.code!,
            horario: hora
        }

        if ( quantity >= 6 ) return;

        setQuantity( quantity + 1 );
        setDatos([...datos, dato]);
    }

    const removeQuantity = () => {
        if ( quantity === 0 ) return;

        setQuantity( quantity - 1 );
        setDatos(datos.slice(0,quantity-1))
    }

    const receta: Receta = {
        pill: pill.nombre,
        datos
    }

    const onAddReceta = () => {
        console.log({ receta })
    }

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
                    <Typography variant="h2">Horarios</Typography>

                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        <Select
                            variant="filled"
                            label='Hora'
                            value={ hora }
                            onChange={ onChageHora }
                        >
                            {
                                horarios.map( horario => (
                                    <MenuItem
                                        key={ horario.name }
                                        value={ horario.name }
                                    >
                                        { horario.name }
                                    </MenuItem>
                                ))
                            }
                        </Select>
                        <Box display='flex' alignItems='center'>
                            <IconButton onClick={ () => removeQuantity() }>
                                <RemoveCircleOutline />
                            </IconButton>
                            <Typography sx={{ width: 40, textAlign: 'center' }}> {quantity} </Typography>
                            <IconButton onClick={ () => addQuantity() }>
                                <AddCircleOutline />
                            </IconButton>
                        </Box>
                    </Box>

                    {
                        datos.map( dato => (
                            <Box key={dato.dosis}>
                                <Divider />
                                <Typography variant="subtitle1">Dosis: {dato.dosis}</Typography>
                                <Typography variant="subtitle2">Hora: {dato.horario} </Typography>
                            </Box>
                        ))
                    }

                    {/* Agregar boton */}
                    <Button 
                        onClick={ onAddReceta }
                        color="secondary" 
                        className="circular-btn" 
                        sx={{ mt: 2 }}
                    >
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

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//     const { nombre = '' } = params as { nombre: string };
//     const pill = await dbPills.getPillByNombre( nombre );

    // if ( !pill ) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false
    //         }
    //     }
    // }

//     return {
//         props: {
//             pill
//         }
//     }
// }

// getStaticPaths
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pillNombres = await dbPills.getAllPillsNombres();

    return {
        paths: pillNombres.map( ({ nombre }) =>({
            params: {
                nombre
            }
        })),
        fallback: "blocking"
    }
}

// getStaticProps
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {

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
        },
        revalidate: 86400
    }
}

export default PillPage