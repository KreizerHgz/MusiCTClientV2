import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Axios from 'axios';

const useStyles = makeStyles({
    icon: {
        fill: 'white',
    },
});

export default function TaskMenu(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteTask = (e) => {
        console.log(e);
        Axios.post('https://musict-v2.herokuapp.com/deletetask', {
            taskID: e.TaskID
        })
        alert("Oppgaven er slettet");
    };

    const updateVisibility = (e) => {
        let b;
        if (e.isPrivate === 0) {
            b = 1;
        }
        if (e.isPrivate === 1) {
            b = 0;
        }
        Axios.post('https://musict-v2.herokuapp.com/updatevisibility', {
            taskID: e.TaskID,
            isPrivate: b
        })
        if (e.isPrivate === 0) {
            alert("Oppgaven er nå privat og bare synlig for deg");
            console.log(e);
        }
        if (e.isPrivate === 1) {
            alert("Oppgaven er nå synlig for alle");
            console.log(e);
        }
    };


    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon className={classes.icon} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={Link} to={"/oppgave/" + props.element.TaskID}>Åpne Oppgaveside</MenuItem>
                <MenuItem component={Link} to={"/rediger/" + props.element.TaskID}>Rediger Oppgave</MenuItem>
                <MenuItem onClick={() => { deleteTask(props.element); handleClose() }}>Slett Oppgave</MenuItem>
                <MenuItem onClick={() => { updateVisibility(props.element); handleClose() }}>Endre synlighet</MenuItem>
            </Menu>
        </div>
    );
}
