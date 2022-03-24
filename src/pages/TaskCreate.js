import '../App.css';
import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardActionArea, CardContent, Divider, FormControl, Grid, ListItemText, MenuItem, Modal, styled, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from '../UserContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#393939',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles({
    root: {
        width: 250,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        }
    },
    icon: {
        fill: 'white',
    },
});

export default function TaskCreate() {

    const [grade, setGrade] = useState("");
    const [learningObjective, setLearningObjective] = useState("");
    const [equipment, setEquipment] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [succeedes, setSucceedes] = useState(null);
    const [preceedes, setPreceedes] = useState(null);

    const classes = useStyles();

    const [gradeDefined, setGradeDefined] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { value } = useContext(UserContext);
    const [otherTasks, setOtherTasks] = useState(null);

    useEffect(() => {
        if (grade === "") {
            setGradeDefined(false);
        }
        else {
            setGradeDefined(true);
        }
    }, [grade, gradeDefined]);

    let navigate = useNavigate();

    useEffect(() => {
        if (submitted === false) {
        }
        else if (submitted === true) {
            return navigate("/");
        }
    }, [submitted, navigate]);

    useEffect(() => {
        Axios.post('https://musict-deployment-test.herokuapp.com/fetchusertasks', {
            userID: value
        }).then((response) => {
            console.log(response.data);
            if (response.data.message) {
                return
            }
            else {
                setOtherTasks(response.data);
            }
        })
    }, []);

    useEffect(() => {
        console.log("Succeedes:", succeedes);
        console.log("Preceedes:", preceedes);
    }, [succeedes, preceedes]);

    const save = () => {
        Axios.post('https://musict-deployment-test.herokuapp.com/submittask', {
            grade: grade,
            learningObjective: learningObjective,
            equipment: equipment,
            title: title,
            description: description,
            createdBy: value,
            succeedes: succeedes,
            preceedes: preceedes
        }).then(setSubmitted(true));
    };

    const [modalContent, setModalContent] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = (e) => {
        Axios.post('https://musict-deployment-test.herokuapp.com/fetchwikipage', {
            title: e
        }).then((response) => {
            console.log(response.data);
            if (response.data.message) {
                return
            }
            else {
                setModalContent(response.data[0]);
            }
        })
        setOpen(true);
    }

    const [similarTasks, setSimilarTasks] = useState(null);
    const [openSimilar, setOpenSimilar] = useState(false);
    const handleCloseSimilar = () => setOpenSimilar(false);

    const findTasks = () => {
        Axios.post('https://musict-deployment-test.herokuapp.com/fetchsimilartasks', {
            learningObjective: learningObjective,
            equipment: equipment
        }).then((response) => {
            console.log(response.data);
            if (response.data.message) {
                alert(response.data.message);
            }
            else {
                setSimilarTasks(response.data);
                setOpenSimilar(true);
            }
        })
    }

    const importTask = (e) => {
        setTitle(e.Title);
        setDescription(e.Description);
        setOpenSimilar(false);
        console.log(e, title, description);
    }

    const [openCreatorInfo, setOpenCreatorInfo] = useState(false);
    const handleCloseCreatorInfo = () => setOpenCreatorInfo(false);
    const handleOpenCreatorInfo = () => setOpenCreatorInfo(true);


    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Grid
                container spacing={0}
                align="center"
                justify="center"
                direction="column"
                marginTop={"20px"}
                marginBottom={"20px"}>
                <Grid container justifyContent="center">
                    <Typography variant="h3" component="div" gutterBottom color='text.primary'>Oppgavebygger</Typography>
                    <Button onClick={(e) => { e.stopPropagation(); handleOpenCreatorInfo() }}>
                        <HelpOutlineIcon />
                    </Button>
                </Grid>
            </Grid>
            <Divider />
            <Grid
                container spacing={0}
                align="center"
                justify="center"
                direction="column"
                marginTop={"20px"}
                marginBottom={"20px"}>
                <Grid container justifyContent="center">
                    <Grid item xs={2}>
                        <FormControl >
                            <TextField
                                value={grade}
                                label="Klassenivå"
                                onChange={(e) => { setGrade(e.target.value) }}
                                className={classes.root}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon }
                                }}
                            >
                                <MenuItem value={"1. - 2. trinn"}>1. - 2. trinn</MenuItem>
                                <MenuItem value={"3. - 4. trinn"}>3. - 4. trinn</MenuItem>
                                <MenuItem value={"5. - 7. trinn"}>5. - 7. trinn</MenuItem>
                                <MenuItem value={"8. - 10. trinn"}>8. - 10. trinn</MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl >
                            <TextField
                                value={learningObjective}
                                label={!gradeDefined ? ("Velg klassenivå først") : ("Kompetansemål")}
                                onChange={(e) => { setLearningObjective(e.target.value) }}
                                className={classes.root}
                                disabled={!(gradeDefined)}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon }
                                }}
                            >
                                {grade === "1. - 2. trinn" ? (
                                    <MenuItem value={"Utøve et repertoar av sangleker, sanger og danser hentet fra elevenes nære musikkultur og fra kulturarven"}>
                                        Utøve et repertoar av sangleker, sanger og danser hentet fra elevenes nære musikkultur og fra kulturarven</MenuItem>
                                ) : []}
                                {grade === "1. - 2. trinn" ? (
                                    <MenuItem value={"Utforske og eksperimentere med puls, rytme, tempo, klang, melodi, dynamikk, harmoni og form i dans, med stemmen og i spill på instrumenter"}>
                                        Utforske og eksperimentere med puls, rytme, tempo, klang, melodi, dynamikk, harmoni og form i dans, med stemmen og i spill på instrumenter</MenuItem>
                                ) : []}
                                {grade === "1. - 2. trinn" ? (
                                    <MenuItem value={"Leke med musikkens grunnelementer gjennom lyd og stemme, lage mønstre og sette sammen mønstrene til enkle improvisasjoner og komposisjoner, også med digitale verktøy"}>
                                        Leke med musikkens grunnelementer gjennom lyd og stemme, lage mønstre og sette sammen mønstrene til enkle improvisasjoner og komposisjoner, også med digitale verktøy</MenuItem>
                                ) : []}
                                {grade === "1. - 2. trinn" ? (
                                    <MenuItem value={"Formidle opplevelser av ulike musikalske uttrykk gjennom samtale og kunstneriske uttrykksformer"}>
                                        Formidle opplevelser av ulike musikalske uttrykk gjennom samtale og kunstneriske uttrykksformer</MenuItem>
                                ) : []}

                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Utøve og utforske et repertoar av sanger og danser fra ulike musikkulturer, inkludert samisk musikkultur"}>
                                        Utøve og utforske et repertoar av sanger og danser fra ulike musikkulturer, inkludert samisk musikkultur</MenuItem>
                                ) : []}
                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Synge og spille på instrumenter alene og sammen med andre ved bruk av gehør og enkel notasjon"}>
                                        Synge og spille på instrumenter alene og sammen med andre ved bruk av gehør og enkel notasjon</MenuItem>
                                ) : []}
                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Eksperimentere med rytmer, melodier og andre grunnelementer, sette sammen mønstre til komposisjoner, også ved bruk av digitale verktøy, og beskrive arbeidsprosesser og resultater"}>
                                        Eksperimentere med rytmer, melodier og andre grunnelementer, sette sammen mønstre til komposisjoner, også ved bruk av digitale verktøy, og beskrive arbeidsprosesser og resultater</MenuItem>
                                ) : []}
                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Formidle egne musikkopplevelser og beskrive bruk av musikalske virkemidler ved hjelp av enkle fagbegreper"}>
                                        Formidle egne musikkopplevelser og beskrive bruk av musikalske virkemidler ved hjelp av enkle fagbegreper</MenuItem>
                                ) : []}
                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Samtale om og reflektere over hvordan musikk skaper mening når den brukes i ulike sosiale sammenhenger"}>
                                        Samtale om og reflektere over hvordan musikk skaper mening når den brukes i ulike sosiale sammenhenger</MenuItem>
                                ) : []}

                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Utøve et repertoar av musikk, sang, andre vokale uttrykk og dans fra samtiden og historien"}>
                                        Utøve et repertoar av musikk, sang, andre vokale uttrykk og dans fra samtiden og historien</MenuItem>
                                ) : []}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Utforske og drøfte hvordan musikk fra fortiden påvirker dagens musikk"}>
                                        Utforske og drøfte hvordan musikk fra fortiden påvirker dagens musikk</MenuItem>
                                ) : []}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Øve inn og framføre sang og musikk, i samspill eller individuelt, gehørbasert og ved bruk av enkle notasjonsteknikker"}>
                                        Øve inn og framføre sang og musikk, i samspill eller individuelt, gehørbasert og ved bruk av enkle notasjonsteknikker</MenuItem>
                                ) : []}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Lytte, eksperimentere og skape nye uttrykk med instrumenter, kropp, stemme eller lyd fra andre kilder, og presentere resultatet"}>
                                        Lytte, eksperimentere og skape nye uttrykk med instrumenter, kropp, stemme eller lyd fra andre kilder, og presentere resultatet</MenuItem>
                                ) : []}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Bruke teknologi og digitale verktøy til å skape, øve inn og bearbeide musikk"}>
                                        Bruke teknologi og digitale verktøy til å skape, øve inn og bearbeide musikk</MenuItem>
                                ) : []}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Bruke fagbegreper i beskrivelse av og refleksjon over arbeidsprosesser, resultater, musikalske uttrykk og virkemidler"}>
                                        Bruke fagbegreper i beskrivelse av og refleksjon over arbeidsprosesser, resultater, musikalske uttrykk og virkemidler</MenuItem>
                                ) : []}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Utforske og formidle musikalske opplevelser og erfaringer"}>
                                        Utforske og formidle musikalske opplevelser og erfaringer</MenuItem>
                                ) : []}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Undersøke hvordan kjønn, kjønnsroller og seksualitet fremstilles i musikk og dans i det offentlige rom, og skape uttrykk som utfordrer stereotypier"}>
                                        Undersøke hvordan kjønn, kjønnsroller og seksualitet fremstilles i musikk og dans i det offentlige rom, og skape uttrykk som utfordrer stereotypier</MenuItem>
                                ) : []}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Reflektere over hvordan musikk kan spille ulike roller for utvikling av individer og gruppers identitet"}>
                                        Reflektere over hvordan musikk kan spille ulike roller for utvikling av individer og gruppers identitet</MenuItem>
                                ) : []}

                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Utøve et variert repertoar av musikk, sang, andre vokale uttrykk og dans"}>
                                        Utøve et variert repertoar av musikk, sang, andre vokale uttrykk og dans</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Reflektere over hvordan musikalske tradisjoner, inkludert samiske musikktradisjoner, bevares og fornyes"}>
                                        Reflektere over hvordan musikalske tradisjoner, inkludert samiske musikktradisjoner, bevares og fornyes</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Samarbeide med andre om å planlegge og gjennomføre øvingsprosesser hvor det inngår selvvalgt sang, andre vokale uttrykk, spill på instrumenter eller dans, og formidle resultatet i gruppe eller individuelt"}>
                                        Samarbeide med andre om å planlegge og gjennomføre øvingsprosesser hvor det inngår selvvalgt sang, andre vokale uttrykk, spill på instrumenter eller dans, og formidle resultatet i gruppe eller individuelt</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Skape og programmere musikalske forløp ved å eksperimentere med lyd fra ulike kilder"}>
                                        Skape og programmere musikalske forløp ved å eksperimentere med lyd fra ulike kilder</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Utforske og formidle musikalske opplevelser og erfaringer, og reflektere over bruk av musikalske virkemidler"}>
                                        Utforske og formidle musikalske opplevelser og erfaringer, og reflektere over bruk av musikalske virkemidler</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Lytte og prøve ut ulike uttrykk og begrunne valg i skapende prosesser fra idé til ferdig resultat"}>
                                        Lytte og prøve ut ulike uttrykk og begrunne valg i skapende prosesser fra idé til ferdig resultat</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Bruke gehør og notasjonsteknikker som støtte i skapende arbeid"}>
                                        Bruke gehør og notasjonsteknikker som støtte i skapende arbeid</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Bruke relevante fagbegreper i skapende arbeid og i refleksjon over prosesser og resultater"}>
                                        Bruke relevante fagbegreper i skapende arbeid og i refleksjon over prosesser og resultater</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Utforske og reflektere over hvordan musikk, sang og dans som estetiske uttrykk er påvirket av og uttrykk for historiske og samfunnsmessige forhold, og skape musikalske uttrykk som tar opp utfordringer i samtiden"}>
                                        Utforske og reflektere over hvordan musikk, sang og dans som estetiske uttrykk er påvirket av og uttrykk for historiske og samfunnsmessige forhold, og skape musikalske uttrykk som tar opp utfordringer i samtiden</MenuItem>
                                ) : []}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Utforske og drøfte musikkens og dansens betydning i samfunnet og etiske problemstillinger knyttet til musikalske ytringer og musikkulturer"}>
                                        Utforske og drøfte musikkens og dansens betydning i samfunnet og etiske problemstillinger knyttet til musikalske ytringer og musikkulturer</MenuItem>
                                ) : []}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl >
                            <TextField
                                value={equipment}
                                label="Utstyr/Plattform"
                                onChange={(e) => { setEquipment(e.target.value) }}
                                className={classes.root}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon }
                                }}
                            >
                                {equipment !== "Instrument - Gitar" ? (
                                    <MenuItem value={"Instrument - Gitar"}>
                                        <ListItemText>
                                            Instrument - Gitar
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen("Instrument - Gitar") }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ) : (
                                    <MenuItem value={"Instrument - Gitar"}>
                                        Instrument - Gitar
                                    </MenuItem>
                                )}
                                {equipment !== "Instrument - Piano" ? (
                                    <MenuItem value={"Instrument - Piano"}>
                                        <ListItemText>
                                            Instrument - Piano
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen("Instrument - Piano") }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ) : (
                                    <MenuItem value={"Instrument - Piano"}>
                                        Instrument - Piano
                                    </MenuItem>
                                )}
                                {equipment !== "Instrument - Slagverk" ? (
                                    <MenuItem value={"Instrument - Slagverk"}>
                                        <ListItemText>
                                            Instrument - Slagverk
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen("Instrument - Slagverk") }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ) : (
                                    <MenuItem value={"Instrument - Slagverk"}>
                                        Instrument - Slagverk
                                    </MenuItem>
                                )}
                                {equipment !== "Scratch" ? (
                                    <MenuItem value={"Scratch"}>
                                        <ListItemText>
                                            Scratch
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen("Scratch") }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ) : (
                                    <MenuItem value={"Scratch"}>
                                        Scratch
                                    </MenuItem>
                                )}
                                {equipment !== "Sonic Pi" ? (
                                    <MenuItem value={"Sonic Pi"}>
                                        <ListItemText>
                                            Sonic Pi
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen("Sonic Pi") }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ) : (
                                    <MenuItem value={"Sonic Pi"}>
                                        Sonic Pi
                                    </MenuItem>
                                )}
                                {equipment !== "Arduino" ? (
                                    <MenuItem value={"Arduino"}>
                                        <ListItemText>
                                            Arduino
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen("Arduino") }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ) : (
                                    <MenuItem value={"Arduino"}>
                                        Arduino
                                    </MenuItem>
                                )}
                                {equipment !== "Digital Audio Workstation" ? (
                                    <MenuItem value={"Digital Audio Workstation"}>
                                        <ListItemText>
                                            Digital Audio Workstation
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen("Digital Audio Workstation") }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ) : (
                                    <MenuItem value={"Digital Audio Workstation"}>
                                        Digital Audio Workstation
                                    </MenuItem>
                                )}
                                <MenuItem value={"Ekstra utstyr ikke nødvendig"}>Ekstra utstyr ikke nødvendig</MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            {learningObjective !== "" && equipment !== "" ? (
                <div>
                    <Button variant="contained" onClick={findTasks}>
                        Finn lignende oppgaver
                    </Button>
                </div>
            ) : (<></>)}
            <CssTextField value={title} label={title ? ("") : ("Tittel")} id="custom-css-outlined-input" sx={{ width: 600, marginTop: "20px" }} onChange={(e) => { setTitle(e.target.value) }} />
            <div>
                <CssTextField
                    id="outlined-multiline-static"
                    value={description}
                    label={description ? ("") : ("Oppgavebeskrivelse")}
                    multiline
                    rows={15}
                    sx={{ width: 600, marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </div>
            <div>
                <FormControl >
                    <TextField
                        value={succeedes}
                        label="Bygger videre på"
                        onChange={(e) => { setSucceedes(e.target.value) }}
                        className={classes.root}
                        sx={{ marginBottom: "20px" }}
                        select
                        SelectProps={{
                            classes: { icon: classes.icon }
                        }}
                    >
                        {otherTasks ? (
                            otherTasks.map((element) => {
                                return <MenuItem value={element.TaskID}>{element.Title}</MenuItem>
                            })
                        ) : (<></>)
                        }

                    </TextField>
                </FormControl>
            </div>
            <div>
                <FormControl >
                    <TextField
                        value={preceedes}
                        label="Neste nivå"
                        onChange={(e) => { setPreceedes(e.target.value) }}
                        className={classes.root}
                        sx={{ marginBottom: "20px" }}
                        select
                        SelectProps={{
                            classes: { icon: classes.icon }
                        }}
                    >
                        {otherTasks ? (
                            otherTasks.map((element) => {
                                return <MenuItem value={element.TaskID}>{element.Title}</MenuItem>
                            })
                        ) : (<></>)
                        }
                    </TextField>
                </FormControl>
            </div>
            <div>
                <Button variant="contained" sx={{ margin: "20px" }} onClick={save}>Lagre</Button>
                <Button variant="outlined" component={Link} to="/" sx={{ margin: "20px" }}>Avbryt</Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {modalContent ? (
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" color='text.primary'>
                            {modalContent.Title}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} color='text.secondary'>
                            {modalContent.Description}
                        </Typography>
                    </Box>
                ) : (<></>)}
            </Modal>

            <Modal
                open={openSimilar}
                onClose={handleCloseSimilar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                overflow="scroll"
            >
                <Box sx={style} overflow="auto" height="85vh">
                    <Grid
                        container spacing={0}
                        align="center"
                        justify="center"
                        direction="column"
                        marginTop={"20px"}
                        marginBottom={"20px"}>
                        <Grid container justifyContent="center">
                            {similarTasks ? (
                                similarTasks.map((element => {
                                    return (
                                        <div>
                                            <Card sx={{ margin: "20px", marginTop: "150px", width: "400px" }}>
                                                <CardActionArea component={Link} to={"/oppgave/" + element.TaskID} target={"_blank"} sx={{ width: "400px" }} >
                                                    <CardContent>
                                                        <Grid container spacing={0}>
                                                            <Grid item xs={10}>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    {element.Title}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <OpenInNewIcon />
                                                            </Grid>
                                                        </Grid>
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
                                            <Button variant="contained" onClick={() => importTask(element)}>
                                                Importer oppgave
                                            </Button>
                                        </div>
                                    );
                                }))
                            ) : (<Typography variant="h3" component="div" gutterBottom color='text.primary'>Ingen oppgaver funnet :|</Typography>)
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Modal >

            <Modal
                open={openCreatorInfo}
                onClose={handleCloseCreatorInfo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color='text.primary'>
                        Hva er oppgavebyggeren?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} color='text.secondary'>
                        Velkommen til Oppgavebyggeren!
                        Oppgavebyggeren er ditt verktøy for å lage oppgaver til bruk i undervisningen av deg og andre lærere.
                        Husk at det er andre lærere som vil se oppgavene dine slik at de ikke trenger å være rettet mot elevene nå.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} color='text.secondary'>
                        Oppgavebyggeren lar deg lage oppgaver som er tilpasset trinn, kompetansemål og utstyr som elevene trenger for å utføre oppgaven.
                        Oppgaven din kan også være koblet mot dine andre oppgaver som forrige og neste nivå dersom du ønsker en progresjon.
                        Oppgavebyggeren er lagd for å være veiledende og finner lignende oppgaver fra vår database for deg når klassenivå, kompetansemål og utstyr er definert.
                        Du kan enten åpne oppgavesidene for disse oppgavene for inspirasjon, eller du kan importere oppgaven inn i din oppgavebygger for å modifisere oppgaven slik at den passer deg
                    </Typography>
                </Box>
            </Modal>
        </Box >
    );
}