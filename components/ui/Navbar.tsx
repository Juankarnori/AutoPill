import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, MedicalInformationOutlined, SearchOutlined } from '@mui/icons-material';
import { RecetaContext, UiContext } from '@/context';

export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );
    const { isLoaded, recetas } = useContext(RecetaContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {

        if ( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);

    }

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

            <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className='fadeIn'>
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
               {/* <NextLink href='/recetas/history' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/recetas/history' ? 'primary' : 'info' }>Recetas</Button>
                    </Link>
                </NextLink>  */}
            </Box>

            <Box flex={1}/>

            {
                isSearchVisible
                ? (
                    <Input
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        className='fadeIn'
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyUp={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ () => setIsSearchVisible(false) }
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                )
                : (
                    <IconButton
                        onClick={ () => setIsSearchVisible(true) }
                        className='fadeIn'
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                        <SearchOutlined />
                    </IconButton>
                )
            }


            <IconButton
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                onClick={ toggleSideMenu }
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href='/recetario' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ recetas.length } color='secondary'>
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
