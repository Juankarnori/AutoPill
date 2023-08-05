import { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from "@/components/layouts"
import { Typography } from "@mui/material"
import { jwt } from '@/utils'
import { User } from '@/models'
import { dbRecetas } from '@/database'
import { IRecetario } from '@/interface'

interface Props {
  receta: IRecetario;
}

const RecetasPage:NextPage<Props> = ({ receta }) => {

  console.log({receta})

  return (
    <MainLayout title={"Pagina de recetas"} pageDescription={"Pagina de recetas"}>
        <Typography variant="h1" component='h1'>Receta: {receta._id}</Typography>
    </MainLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const { id = '' } = query;

  const { token = '' } = req.cookies;

  if ( !token ) {
    return {
      redirect: {
        destination: `/auth/login?p=/recetas/${ id }`,
        permanent: false,
      }
    }
  }

  const userId = await jwt.isValidToken( token );

  const user = await User.findById( userId );

  if ( !user ) {
    return {
      redirect: {
        destination: `/auth/login?p=/recetas/${ id }`,
        permanent: false,
      }
    }
  }

  const receta = await dbRecetas.getRecetaById( id.toString() );

  if ( !receta ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  if ( receta.user !== userId ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      receta
    }
  }
}

export default RecetasPage