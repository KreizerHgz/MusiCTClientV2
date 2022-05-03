import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { WikiContext } from '../WikiContext';

export default function WikiPageList() {
    const [openCT, setOpenCT] = React.useState(false);

    const handleClickCT = () => {
        setOpenCT(!openCT);
    };

    const [openMusic, setOpenMusic] = React.useState(false);

    const handleClickMusic = () => {
        setOpenMusic(!openMusic);
    };

    const [openPed, setOpenPed] = React.useState(false);

    const handleClickPed = () => {
        setOpenPed(!openPed);
    };

    const [openEq, setOpenEq] = React.useState(false);

    const handleClickEq = () => {
        setOpenEq(!openEq);
    };

    const colorIcon = "rgba(255, 255, 255, 0.7)";

    const { setWiki } = React.useContext(WikiContext);

    return (
        <List
            sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', border: 1 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Wikisider
                </ListSubheader>
            }
        >
            <Divider />
            <ListItemButton onClick={handleClickCT}>
                <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Algoritmisk tenkning</Typography>}
                />
                {openCT ? <ExpandLess htmlColor={colorIcon} /> : <ExpandMore htmlColor={colorIcon} />}
            </ListItemButton>
            <Divider />

            <Collapse in={openCT} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Algoritmisk tenkning - Oversikt")}>
                        <ListItemText disableTypography primary={<Typography type="body2" fontWeight={600} color="text.secondary">Oversikt</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Logikk")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Logikk</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Algoritmer")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Algoritmer</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Dekomposisjon")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Dekomposisjon</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Mønstre")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Mønstre</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Abstraksjon")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Abstraksjon</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Evaluering")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Evaluering</Typography>}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />

            <ListItemButton onClick={handleClickMusic}>
                <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Musikkteori</Typography>}
                />
                {openMusic ? <ExpandLess htmlColor={colorIcon} /> : <ExpandMore htmlColor={colorIcon} />}
            </ListItemButton>
            <Divider />

            <Collapse in={openMusic} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Musikkteori - Oversikt")}>
                        <ListItemText disableTypography primary={<Typography type="body2" fontWeight={600} color="text.secondary">Oversikt</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Noter")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Noter</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Skalaer")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Skalaer</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Kvintsirkelen")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Kvintsirkelen</Typography>}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />

            <ListItemButton onClick={handleClickPed}>
                <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Pedagogikk</Typography>}
                />
                {openPed ? <ExpandLess htmlColor={colorIcon} /> : <ExpandMore htmlColor={colorIcon} />}
            </ListItemButton>
            <Divider />
            <Collapse in={openPed} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Pedagogikk - Oversikt")}>
                        <ListItemText disableTypography primary={<Typography type="body2" fontWeight={600} color="text.secondary">Oversikt</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Elevsentrert undervisning")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Elevsentrert undervisning</Typography>}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />

            <ListItemButton onClick={handleClickEq}>
                <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Utstyr/Plattformer</Typography>}
                />
                {openEq ? <ExpandLess htmlColor={colorIcon} /> : <ExpandMore htmlColor={colorIcon} />}
            </ListItemButton>
            <Divider />
            <Collapse in={openEq} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Utstyr/Plattformer - Oversikt")}>
                        <ListItemText disableTypography primary={<Typography type="body2" fontWeight={600} color="text.secondary">Oversikt</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Instrument - Gitar")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Instrument - Gitar</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Instrument - Piano")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Instrument - Piano</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Instrument - Slagverk")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Instrument - Slagverk</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Scratch")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Scratch</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Sonic Pi")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Sonic Pi</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Arduino")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Arduino</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => setWiki("Digital Audio Workstations")}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Digital Audio Workstations</Typography>}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}
