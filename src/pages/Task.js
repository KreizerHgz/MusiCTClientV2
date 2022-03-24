import '../App.css';
import { Box, Card, CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Task() {
    const path = window.location.pathname.split("/")[2]

    const [taskData, setTaskData] = useState(null)
    const [preceedes, setPreceedes] = useState(null)
    const [succeedes, setSucceedes] = useState(null)

    useEffect(() => {
        Axios.post('https://musict-deployment-test.herokuapp.com/fetchtask', {
            taskID: path
        }).then((response) => {
            console.log(response.data);
            setTaskData(response.data[0]);
            if (response.data[0].Succeedes && response.data[0].Preceedes) {
                setSucceedes(response.data[1]);
                setPreceedes(response.data[2]);
            }
            else if (!response.data[0].Succeedes && response.data[0].Preceedes) {
                setPreceedes(response.data[1]);
            }
            else if (response.data[0].Succeedes && !response.data[0].Preceedes) {
                setSucceedes(response.data[1]);
            }
        })
    }, [path]);





    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                    {taskData ? (
                        <div>
                            <Typography variant="h3" component="div" gutterBottom color='text.primary' marginTop="40px">
                                {taskData.Title}
                            </Typography>
                            <Typography align={"left"} color="text.secondary">
                                Passer for {taskData.Grade}
                            </Typography>
                            <Divider width={500} />
                            <Typography align={"left"} color="text.secondary" maxWidth={500}>
                                Kompetansemål: {taskData.LearningObjective}
                            </Typography>
                            <Divider width={500} />
                            <Typography align={"left"} color="text.secondary">
                                Utstyr/Plattform: {taskData.Equipment}
                            </Typography>
                            <Typography align={"left"} color="text.secondary" marginTop="70px">
                                {taskData.Description}
                            </Typography>
                        </div>
                    ) :
                        (<></>)}
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid container justifyContent="center">
                    {succeedes ? (
                        <div>
                            <Typography gutterBottom variant="h5" component="div" color="text.secondary" sx={{ marginTop: "50px" }}>Bygger videre på:</Typography>
                            <Card sx={{ margin: "20px", marginTop: "20px", width: "400px" }}>
                                <CardActionArea component={Link} to={"/task/" + succeedes.TaskID} target={"_blank"} sx={{ width: "400px" }} >
                                    <CardContent>
                                        <Grid container spacing={0}>
                                            <Grid item xs={10}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {succeedes.Title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <OpenInNewIcon />
                                            </Grid>
                                        </Grid>
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Passer for {succeedes.Grade}
                                        </Typography>
                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Kompetansemål: {succeedes.LearningObjective}
                                        </Typography>
                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Utstyr/Plattform: {succeedes.Equipment}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    ) : (<></>)}
                    {preceedes ? (
                        <div>
                            <Typography gutterBottom variant="h5" component="div" color="text.secondary" sx={{ marginTop: "50px" }}>Neste nivå:</Typography>
                            <Card sx={{ margin: "20px", marginTop: "20px", width: "400px" }}>
                                <CardActionArea component={Link} to={"/task/" + preceedes.TaskID} target={"_blank"} sx={{ width: "400px" }} >
                                    <CardContent>
                                        <Grid container spacing={0}>
                                            <Grid item xs={10}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {preceedes.Title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <OpenInNewIcon />
                                            </Grid>
                                        </Grid>
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Passer for {preceedes.Grade}
                                        </Typography>
                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Kompetansemål: {preceedes.LearningObjective}
                                        </Typography>
                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Utstyr/Plattform: {preceedes.Equipment}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    ) : (<></>)}
                </Grid>
            </Grid>
        </Box >
    );
}