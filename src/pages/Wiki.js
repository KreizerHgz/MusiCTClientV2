import '../App.css';
import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import WikiPageList from '../components/WikiPageList';
import { WikiContext } from '../WikiContext';
import Axios from 'axios';

export default function Wiki() {

    const { wiki } = React.useContext(WikiContext);

    const [content, setContent] = React.useState(null);

    React.useEffect(() => {
        Axios.post('https://musict-v2.herokuapp.com/fetchwikipage', {
            title: wiki
        }).then((response) => {
            console.log(response.data);
            if (response.data.message) {
                return
            }
            else {
                setContent(response.data[0]);
            }
        })
    }, [wiki])

    React.useEffect(() => {
        if (wiki) {
            Axios.post('https://musict-v2.herokuapp.com/fetchwikipage', {
                title: wiki
            }).then((response) => {
                console.log(response.data);
                if (response.data.message) {
                    return
                }
                else {
                    setContent(response.data[0]);
                }
            })
        }
        else {
            console.log("Wiki not set");
        }
    }, [])


    return (
        <Box height="100vh" overflow="auto">
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <WikiPageList />
                </Grid>
                {content ? (
                    <Grid item xs={6}>
                        <Typography variant="h3" component="div" gutterBottom color='text.primary' marginTop="40px">
                            {content.Title}
                        </Typography>
                        <Typography align={"left"} color="text.secondary">
                            {content.Description}
                        </Typography>
                    </Grid>
                ) : (
                    <Grid item xs={6}>
                        <Typography variant="h5" component="div" gutterBottom color='text.primary' marginTop="40px">
                            Velkommen til wikisidene. I menyen til venstre finner du mye nyttig informasjon
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}