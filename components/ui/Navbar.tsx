import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from '@mui/material';
import { MedicalInformationOutlined, SearchOutlined } from '@mui/icons-material';

export const Navbar = () => {
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
                        <Button>Dispositivos</Button>
                    </Link>
                </NextLink> 
               <NextLink href='/pills' passHref legacyBehavior>
                    <Link>
                        <Button>Medicamentos</Button>
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

            <Button>
                Menu
            </Button>

        </Toolbar>
    </AppBar>
  )
}
