import { FC, useState } from "react"
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { IPill } from "@/interface"

interface Props {
    pill: IPill;
}

export const PillCard:FC<Props> = ({ pill }) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Grid item xs={6} sm={4}>
        <Card>
            <NextLink href={`/pill/${ pill.nombre }`} passHref legacyBehavior prefetch={ false }>
                <Link>
                    <CardActionArea>
                        <CardMedia 
                            component='img'
                            className="fadeIn"
                            image={ `/pills/${ pill.image }` }
                            alt={ pill.nombre }
                            onLoad={ () => setIsImageLoaded(true) }
                        />
                    </CardActionArea>
                </Link>
            </NextLink>
        </Card>

        <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
            <Typography fontWeight={700}>{ pill.nombre }</Typography>
        </Box>

    </Grid>
  )
}
