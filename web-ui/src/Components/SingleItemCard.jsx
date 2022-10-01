import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';

const SingleItemCard = ({title , element, imageUrl = "none"}) => {
    let detailsElement = []
      for (const prop in element ){
        if (prop != "id" ){
            detailsElement.push(
                <div>
                    <h4>{prop}:  {element[prop]}</h4><br></br>
                </div>
            )
        }
      }

    if (imageUrl != "none"){
        return(
                <div>
                    <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh'}}>
                        <Card sx={{ p: 5, maxWidth: 1300, m:5}}>
                                <Box sx={{ display: 'inline-block' }} >
                                <CardMedia
                                    component="img"
                                    image={ imageUrl}
                                    direction="column" justifyContent="center"
                                    sx={{ width: 400, height:400, borderRadius:50}}
                                >
                                </CardMedia>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        right: '30%'
                                    }}
                                >
                                    <CardContent>
                                        {detailsElement}
                                    </CardContent>
                                </Box>
                        </Card>
                    </Grid>
                </div>
            )
    }else{
        return(
            <div>
                <Grid container spacing={5} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh'}} >
                    <Card sx={{p: 5 , maxWidth: 1300}}>
                    <h1> {title} </h1>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    right: '30%'
                                }}
                            >
                                <CardContent>
                                    {detailsElement.slice(0, detailsElement.length/2 )}
                                </CardContent>
                            </Box>

                            <Box
                                sx={{
                                    display: 'inline-block',
                                    right: '30%'
                                }}
                            >
                                <CardContent>
                                    {detailsElement.slice(detailsElement.length/2  , detailsElement.length )}
                                </CardContent>
                            </Box>
                    </Card>
                </Grid>
            </div>
        )
    }
}

export default SingleItemCard
