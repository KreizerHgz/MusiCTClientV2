import '../App.css';
import Typography from '@mui/material/Typography';
import { Box, Card, CardActionArea, CardContent, Divider, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function TaskBrowse() {

    const [taskList, setTaskList] = useState(null);

    useEffect(() => {
        Axios.post('https://musict-deployment-test.herokuapp.com/fetchtasks', {
        }).then((response) => {
            console.log(response.data);
            if (response.data.message) {
                return
            }
            else {
                setTaskList(response.data);
            }
        })
    }, []);

    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Typography variant="h3" component="div" gutterBottom color='text.primary'>Søk i oppgaver</Typography>

            <Grid container spacing={0}>
                <Grid container justifyContent="center">


                    {taskList ? (
                        taskList.map((element => {
                            return <Card sx={{ margin: "20px", marginTop: "150px", width: "400px" }}>
                                <CardActionArea component={Link} to={"/oppgave/" + element.TaskID} sx={{ width: "400px" }} >
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {element.Title}
                                        </Typography>
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Passer for {element.Grade}
                                        </Typography>
                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Kompetansemål: {element.LearningObjective}
                                        </Typography>
                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Utstyr/Plattform: {element.Equipment}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        }))
                    ) : (<Typography variant="h3" component="div" gutterBottom color='text.primary'>Ingen oppgaver funnet :|</Typography>)
                    }
                </Grid>
            </Grid>
        </Box>
    );
}