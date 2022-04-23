import '../App.css';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, Divider, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { UserContext } from '../UserContext';
import TaskMenu from '../components/TaskMenu';

export default function MyTasks() {

    const [taskList, setTaskList] = useState(null);
    const { value } = useContext(UserContext);

    useEffect(() => {
        Axios.post('https://musict-v2.herokuapp.com/fetchmytasks', {
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
                                        <Grid container spacing={0}>
                                            <Grid item xs={10}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {element.Title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TaskMenu element={element} />
                                            </Grid>
                                        </Grid>
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Passer for {element.Grade}
                                        </Typography>
                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            Utstyr/Plattform: {element.Equipment}
                                        </Typography>
                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                        <Typography align="left" variant="body2" color="text.secondary">
                                            AT Metode(r): {element.CT}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        }))
                    ) : (<Typography variant="h3" component="div" gutterBottom color='text.primary'>Ingen oppgaver funnet :|</Typography>)
                    }
                </Grid>
            </Grid>
        </Box >
    );
}