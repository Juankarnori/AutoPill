import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from '@mui/material';
import { MedicalInformationOutlined, SearchOutlined } from '@mui/icons-material';
import { UiContext } from '@/context';

export const Navbar = () => {

    const { asPath } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>AutoPill |</Typography>
                    <Typography sx={{ ml: 0.5 }}>App</Typography>
                </Link>
            </NextLink>

            <Box flex={1} />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
               <NextLink href='/devices' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/devices' ? 'primary' : 'info' }>Dispositivos</Button>
                    </Link>
                </NextLink> 
               <NextLink href='/pills' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/pills' ? 'primary' : 'info' }>Medicamentos</Button>
                    </Link>
                </NextLink> 
            </Box>

            <Box flex={1}/>
            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href='/recetas' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ 2 } color='secondary'>
                            <MedicalInformationOutlined />  
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={ toggleSideMenu }>
                Menu
            </Button>

        </Toolbar>
    </AppBar>
  )
}
