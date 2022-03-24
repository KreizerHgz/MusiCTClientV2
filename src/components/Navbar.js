import '../App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import Logout from '@mui/icons-material/Logout';

export default function Navbar() {
    const path = window.location.pathname.split("/")[1]

    const { value, setValue } = React.useContext(UserContext);

    let navigate = useNavigate();

    const logout = () => {
        setValue(null);
        navigate("/");
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1, height: "64px" }}>
            <AppBar position="static" color='' sx={{ height: "64px" }}>
                <Toolbar sx={{ height: "64px" }}>
                    <Button disabled></Button>
                    <Typography variant="h4" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration: 'none', color: 'unset' }}>
                        MusiCT
                    </Typography>
                    {value ? (
                        <div>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem component={Link} to="/mineoppgaver">
                                    Mine oppgaver
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={logout}>
                                    <Logout fontSize="small" />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Button color="inherit" component={Link} to="/innlogging">Logg inn</Button>)}
                </Toolbar>
            </AppBar>
        </Box >
    );
}
