import '../App.css';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardContent, Divider, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function MyTasks() {

    const [taskList, setTaskList] = useState(null);
    const { value } = useContext(UserContext);

    let navigate = useNavigate();

    useEffect(() => {
        Axios.post('https://musict-deployment-test.herokuapp.com/fetchmytasks', {
            userID: value
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

    const deleteTask = (e) => {
        console.log(e);
        Axios.post('https://musict-deployment-test.herokuapp.com/deletetask', {
            taskID: e.TaskID
        }).then((response) => {
            navigate("/mineoppgaver");
        })
    };

    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Typography variant="h3" component="div" gutterBottom color='text.primary'>Mine Oppgaver</Typography>

            <Grid container spacing={0}>
                <Grid container justifyContent="center">
                    {taskList ? (
                        taskList.map((element => {
                            return <Grid item xs={5} >
                                <Card sx={{ margin: "auto", marginTop: "150px", width: "500px" }}>
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
                                </Card>
                                <div>
                                    <Button variant="contained" sx={{ margin: "5px" }} component={Link} to={"/oppgave/" + element.TaskID}>
                                        Åpne oppgaveside
                                    </Button>
                                    <Button variant="contained" component={Link} to={"/rediger/" + element.TaskID} sx={{ margin: "5px" }}>
                                        Rediger oppgave
                                    </Button>
                                    <Button variant="contained" onClick={() => { deleteTask(element) }} sx={{ margin: "5px" }}>
                                        Slett oppgave
                                    </Button>
                                </div>
                            </Grid>
                        }))
                    ) : (<Typography variant="h3" component="div" gutterBottom color='text.primary'>Ingen oppgaver funnet :|</Typography>)
                    }
                </Grid>
            </Grid>
        </Box >
    );
}