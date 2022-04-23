import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { UserContext } from '../UserContext';


export default function FrontPage() {

    const { value } = React.useContext(UserContext);

    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Grid container spacing={0}>
                <Grid container justifyContent="center">
                    <Grid item xs={4}>
                        <Card sx={{ margin: "20px", marginTop: "150px", height: "200px" }}>
                            <CardActionArea component={Link} to="/wiki" sx={{ height: "200px" }} >
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        Wikisider
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Her kan du finne mer informasjon om algoritmisk tenkning og hvordan det kan integreres i musikkundervisningen
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ margin: "20px", marginTop: "150px", height: "200px" }}>
                            <CardActionArea component={Link} to="/lagoppgave" disabled={!(value)} sx={{ height: "200px" }} >
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        Lag en oppgave
                                    </Typography>
                                    {value ? (<Typography variant="body2" color="text.secondary">
                                        Her kan du lage en oppgave til bruk i undervisningen som passer deg og din klasse gjennom vår mal-baserte
                                        oppgavebygger
                                    </Typography>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            For å bruke oppgavebyggeren må du logge deg inn
                                        </Typography>
                                    )}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ margin: "20px", marginTop: "150px", height: "200px" }}>
                            <CardActionArea component={Link} to="/seoppgaver" sx={{ height: "200px" }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        Søk i oppgaver
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Her kan du gå gjennom alle oppgavene i vår database og sortere etter klassenivå og plattform
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid >
            <Link to="/about" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="text.secondary" position="fixed" sx={{ top: 'auto', bottom: 10, width: window.innerWidth }}>
                    Om MusiCT
                </Typography>
            </Link>
        </Box >
    );
}