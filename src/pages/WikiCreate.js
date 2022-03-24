import '../App.css';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, styled, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
    }
});

export default function WikiCreate() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [submitted, setSubmitted] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (submitted === false) {
        }
        else if (submitted === true) {
            return navigate("/");
        }
    }, [submitted, navigate]);

    const save = () => {
        Axios.post('https://musict-deployment-test.herokuapp.com/createwikipage', {
            title: title,
            description: description
        }).then(setSubmitted(true));
    };

    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Typography variant="h3" component="div" gutterBottom color='text.primary'>Lag wikiside</Typography>
            <CssTextField label="Tittel" id="custom-css-outlined-input" sx={{ width: 600, marginTop: "20px" }} onChange={(e) => { setTitle(e.target.value) }} />
            <div>
                <CssTextField
                    id="outlined-multiline-static"
                    label="Oppgavebeskrivelse"
                    multiline
                    rows={15}
                    sx={{ width: 600, marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </div>
            <div>
                <Button variant="contained" sx={{ margin: "20px" }} onClick={save}>Lagre</Button>
                <Button variant="outlined" component={Link} to="/" sx={{ margin: "20px" }}>Avbryt</Button>
            </div>
        </Box>
    );
}