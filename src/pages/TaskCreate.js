import '../App.css';
import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardActionArea, CardContent, Checkbox, Divider, Drawer, FormControl, FormControlLabel, Grid, IconButton, List, ListItemText, MenuItem, Modal, styled, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from '../UserContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
    disabled: {
        width: 250,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        }
    },
    icon: {
        fill: 'white',
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start',
}));

const drawerWidth = 250;

export default function TaskCreate() {

    const [grade, setGrade] = useState("");
    const [learningObjective, setLearningObjective] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [CT, setCT] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [evaluation, setEvaluation] = useState("");
    const [outcome, setOutcome] = useState("");
    const [succeedes, setSucceedes] = useState(null);
    const [preceedes, setPreceedes] = useState(null);

    const classes = useStyles();

    const [gradeDefined, setGradeDefined] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { value } = useContext(UserContext);
    const [otherTasks, setOtherTasks] = useState(null);

    const [searchGrade, setSearchGrade] = useState(true);
    const [searchLO, setSearchLO] = useState(true);
    const [searchEquip, setSearchEquip] = useState(true);
    const [searchCT, setSearchCT] = useState(true);

    useEffect(() => {
        if (grade === "") {
            setGradeDefined(false);
        }
        else {
            setGradeDefined(true);
            setLearningObjective([]);
        }
    }, [grade, gradeDefined]);

    let navigate = useNavigate();

    useEffect(() => {
        if (submitted === false) {
        }
        else if (submitted === true) {
            alert("Oppgaven er lagret");
            return navigate("/");
        }
    }, [submitted, navigate]);

    useEffect(() => {
        Axios.post('https://musict-v2.herokuapp.com/fetchusertasks', {
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

    const save = (int) => {
        Axios.post('https://musict-v2.herokuapp.com/submittask', {
            grade: grade,
            learningObjective: learningObjective,
            equipment: equipment,
            CT: CT,
            title: title,
            evaluation: evaluation,
            outcome: outcome,
            description: description,
            createdBy: value,
            succeedes: succeedes,
            preceedes: preceedes,
            isPrivate: int
        }).then(setSubmitted(true));
    };

    const [modalContent, setModalContent] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = (e) => {
        Axios.post('https://musict-v2.herokuapp.com/fetchwikipage', {
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
        handleCloseSearchDialogue();
        if (searchGrade && !searchLO && !searchEquip && !searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                grade: grade
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
        else if (searchGrade && !searchLO && searchEquip && !searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                grade: grade,
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
        else if (searchGrade && !searchLO && !searchEquip && searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                grade: grade,
                CT: CT
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
        else if (searchGrade && !searchLO && searchEquip && searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                grade: grade,
                equipment: equipment,
                CT: CT
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
        else if (searchLO && !searchEquip && !searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                learningObjective: learningObjective
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
        else if (searchLO && searchEquip && !searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
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
        else if (searchLO && !searchEquip && searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                learningObjective: learningObjective,
                CT: CT
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
        else if (searchLO && searchEquip && searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                learningObjective: learningObjective,
                equipment: equipment,
                CT: CT
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
        else if (!searchGrade && !searchLO && !searchEquip && searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                CT: CT
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
        else if (!searchGrade && !searchLO && searchEquip && !searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
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
        else if (!searchGrade && !searchLO && searchEquip && searchCT) {
            Axios.post('https://musict-v2.herokuapp.com/fetchsimilartasks', {
                equipment: equipment,
                CT: CT
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
    }

    const importTask = (e) => {
        if (!gradeDefined) {
            setGrade(e.Grade);
        }
        if (learningObjective.length === 0) {
            setLearningObjective(e.LearningObjective.split('|'));
        }
        if (equipment.length === 0) {
            setEquipment(e.Equipment.split(','));
        }
        if (CT.length === 0) {
            setCT(e.CT.split(','));
        }
        setTitle(e.Title);
        setDescription(e.Description);
        setEvaluation(e.Evaluation);
        setOutcome(e.Outcome);
        setOpenSimilar(false);
        console.log("LO: " + learningObjective);
    }

    const [openCreatorInfo, setOpenCreatorInfo] = useState(false);
    const handleCloseCreatorInfo = () => setOpenCreatorInfo(false);
    const handleOpenCreatorInfo = () => setOpenCreatorInfo(true);

    const [openSaveDialogue, setOpenSaveDialogue] = useState(false);
    const handleCloseSaveDialogue = () => setOpenSaveDialogue(false);
    const handleOpenSaveDialogue = () => setOpenSaveDialogue(true);

    const [openSearchDialogue, setOpenSearchDialogue] = useState(false);
    const handleCloseSearchDialogue = () => setOpenSearchDialogue(false);
    const handleOpenSearchDialogue = () => setOpenSearchDialogue(true);

    const updateLO = (e) => {
        setLearningObjective(
            typeof e === 'string' ? e.split('|') : e,
        );
    }

    const updateEq = (e) => {
        setEquipment(
            typeof e === 'string' ? e.split(',') : e,
        );
    }

    const updateCT = (e) => {
        setCT(
            typeof e === 'string' ? e.split(',') : e,
        );
    }

    const LOSet1 = [
        "ut??ve et repertoar av sangleker, sanger og danser hentet fra elevenes n??re musikkultur og fra kulturarven",
        "utforske og eksperimentere med puls, rytme, tempo, klang, melodi, dynamikk, harmoni og form i dans, med stemmen og i spill p?? instrumenter",
        "leke med musikkens grunnelementer gjennom lyd og stemme, lage m??nstre og sette sammen m??nstrene til enkle improvisasjoner og komposisjoner, ogs?? med digitale verkt??y",
        "formidle opplevelser av ulike musikalske uttrykk gjennom samtale og kunstneriske uttrykksformer"
    ];

    const LOSet2 = [
        "ut??ve og utforske et repertoar av sanger og danser fra ulike musikkulturer, inkludert samisk musikkultur",
        "synge og spille p?? instrumenter alene og sammen med andre ved bruk av geh??r og enkel notasjon",
        "eksperimentere med rytmer, melodier og andre grunnelementer, sette sammen m??nstre til komposisjoner, ogs?? ved bruk av digitale verkt??y, og beskrive arbeidsprosesser og resultater",
        "formidle egne musikkopplevelser og beskrive bruk av musikalske virkemidler ved hjelp av enkle fagbegreper",
        "samtale om og reflektere over hvordan musikk skaper mening n??r den brukes i ulike sosiale sammenhenger"
    ];

    const LOSet3 = [
        "ut??ve et repertoar av musikk, sang, andre vokale uttrykk og dans fra samtiden og historien",
        "utforske og dr??fte hvordan musikk fra fortiden p??virker dagens musikk",
        "??ve inn og framf??re sang og musikk, i samspill eller individuelt, geh??rbasert og ved bruk av enkle notasjonsteknikker",
        "lytte, eksperimentere og skape nye uttrykk med instrumenter, kropp, stemme eller lyd fra andre kilder, og presentere resultatet",
        "bruke teknologi og digitale verkt??y til ?? skape, ??ve inn og bearbeide musikk",
        "bruke fagbegreper i beskrivelse av og refleksjon over arbeidsprosesser, resultater, musikalske uttrykk og virkemidler",
        "utforske og formidle musikalske opplevelser og erfaringer",
        "unders??ke hvordan kj??nn, kj??nnsroller og seksualitet fremstilles i musikk og dans i det offentlige rom, og skape uttrykk som utfordrer stereotypier",
        "reflektere over hvordan musikk kan spille ulike roller for utvikling av individer og gruppers identitet"
    ];

    const LOSet4 = [
        "ut??ve et variert repertoar av musikk, sang, andre vokale uttrykk og dans",
        "reflektere over hvordan musikalske tradisjoner, inkludert samiske musikktradisjoner, bevares og fornyes",
        "samarbeide med andre om ?? planlegge og gjennomf??re ??vingsprosesser hvor det inng??r selvvalgt sang, andre vokale uttrykk, spill p?? instrumenter eller dans, og formidle resultatet i gruppe eller individuelt",
        "skape og programmere musikalske forl??p ved ?? eksperimentere med lyd fra ulike kilder",
        "utforske og formidle musikalske opplevelser og erfaringer, og reflektere over bruk av musikalske virkemidler",
        "lytte og pr??ve ut ulike uttrykk og begrunne valg i skapende prosesser fra id?? til ferdig resultat",
        "bruke geh??r og notasjonsteknikker som st??tte i skapende arbeid",
        "bruke relevante fagbegreper i skapende arbeid og i refleksjon over prosesser og resultater",
        "utforske og reflektere over hvordan musikk, sang og dans som estetiske uttrykk er p??virket av og uttrykk for historiske og samfunnsmessige forhold, og skape musikalske uttrykk som tar opp utfordringer i samtiden",
        "utforske og dr??fte musikkens og dansens betydning i samfunnet og etiske problemstillinger knyttet til musikalske ytringer og musikkulturer"
    ];

    const Equip = [
        "Instrument - Gitar",
        "Instrument - Piano",
        "Instrument - Slagverk",
        "Scratch",
        "Sonic Pi",
        "Arduino",
        "Digital Audio Workstation"
    ]

    const CTmethods = [
        "Logikk",
        "Algoritmer",
        "Dekomposisjon",
        "M??nstre",
        "Abstraksjon",
        "Evaluering"
    ];

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };


    const reviewQuestions = [
        "Om passelig, er oppgaven utforskende?",
        "Tar oppgaven hensyn til elevenes kulturelle bakgrunn?",
        "Gir oppgaven tilstrekkelig utfordring for alle elever?",
        "Er spr??kbruken tilpasset algoritmisk tenkning? (Se CTL i Wiki)"
    ]

    const [currentQuestion, setCurrentQuestion] = useState(reviewQuestions[0]);

    const UpdateQuestionPrev = () => {
        setCurrentQuestion(reviewQuestions[reviewQuestions.indexOf(currentQuestion) - 1]);
    }

    const UpdateQuestionNext = () => {
        setCurrentQuestion(reviewQuestions[reviewQuestions.indexOf(currentQuestion) + 1]);
    }


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
                                label="Klasseniv??*"
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
                                label={!gradeDefined ? ("Velg klasseniv?? f??rst") : ("Kompetansem??l*")}
                                disabled={!(gradeDefined)}
                                className={!gradeDefined ? (classes.disabled) : (classes.root)}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon },
                                    multiple: true,
                                    value: learningObjective,
                                    onChange: (e) => { updateLO(e.target.value) },
                                    renderValue: (selected) => selected.join("| ")
                                }}
                            >
                                {grade === "1. - 2. trinn" ? (
                                    LOSet1.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={learningObjective.indexOf(item) > -1} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "3. - 4. trinn" ? (
                                    LOSet2.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={learningObjective.indexOf(item) > -1} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "5. - 7. trinn" ? (
                                    LOSet3.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={learningObjective.indexOf(item) > -1} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "8. - 10. trinn" ? (
                                    LOSet4.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={learningObjective.indexOf(item) > -1} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl >
                            <TextField
                                label="Utstyr/Plattform*"
                                className={classes.root}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon },
                                    multiple: true,
                                    value: equipment,
                                    onChange: (e) => { updateEq(e.target.value) },
                                    renderValue: (selected) => selected.join(", ")
                                }}
                            >
                                {Equip.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        <Checkbox checked={equipment.indexOf(item) > -1} />
                                        <ListItemText>
                                            {item}
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen(item) }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ))}
                                <MenuItem key={"Ekstra utstyr ikke n??dvendig"} value={"Ekstra utstyr ikke n??dvendig"}>
                                    <Checkbox checked={equipment.indexOf("Ekstra utstyr ikke n??dvendig") > -1} />
                                    <ListItemText>
                                        {"Ekstra utstyr ikke n??dvendig"}
                                    </ListItemText>
                                </MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl >
                            <TextField
                                label="AT metode*"
                                className={classes.root}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon },
                                    multiple: true,
                                    value: CT,
                                    onChange: (e) => { updateCT(e.target.value) },
                                    renderValue: (selected) => selected.join(", ")
                                }}
                            >
                                {CTmethods.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        <Checkbox checked={CT.indexOf(item) > -1} />
                                        <ListItemText>
                                            {item}
                                        </ListItemText>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpen(item) }}>
                                            <HelpOutlineIcon />
                                        </Button>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            {(gradeDefined || learningObjective.length > 0 || equipment.length > 0 || CT.length > 0) ? (
                <div>
                    <Button variant="contained" onClick={handleOpenSearchDialogue}>
                        Finn lignende oppgaver
                    </Button>
                </div>
            ) : (<></>)}
            <CssTextField value={title} label={title ? ("") : ("Tittel*")} id="custom-css-outlined-input" sx={{ width: 800, marginTop: "20px" }} onChange={(e) => { setTitle(e.target.value) }} />
            <div>
                <CssTextField
                    id="outlined-multiline-static"
                    value={description}
                    label={description ? ("") : ("Oppgavebeskrivelse*")}
                    multiline
                    rows={15}
                    sx={{ width: 800, marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </div>
            <div>
                <CssTextField
                    id="outlined-multiline-static"
                    value={evaluation}
                    label={evaluation ? ("") : ("Vurdering*")}
                    multiline
                    rows={15}
                    sx={{ width: 800, marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => { setEvaluation(e.target.value) }}
                />
            </div>
            <div>
                <CssTextField
                    id="outlined-multiline-static"
                    value={outcome}
                    label={outcome ? ("") : ("Potensielt L??ringsutbytte*")}
                    multiline
                    rows={15}
                    sx={{ width: 800, marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => { setOutcome(e.target.value) }}
                />
            </div>
            <div>
                <FormControl >
                    <TextField
                        value={succeedes}
                        label="Bygger videre p??"
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
                        label="Neste niv??"
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
                <Button variant="contained" onClick={handleDrawerOpen}>
                    Se refleksjonssp??rsm??l
                </Button>

            </div>
            <div>
                <Button variant="contained" sx={{ margin: "20px" }} onClick={handleOpenSaveDialogue}>Lagre</Button>
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
                                                            Utstyr/Plattform: {element.Equipment}
                                                        </Typography>
                                                        <Divider sx={{ borderBottomWidth: 3 }} />
                                                        <Typography align="left" variant="body2" color="text.secondary">
                                                            AT Metode(r): {element.CT}
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
                        Oppgavebyggeren er ditt verkt??y for ?? lage oppgaver til bruk i undervisningen av deg og andre l??rere.
                        Husk at det er andre l??rere som vil se oppgavene dine slik at de ikke trenger ?? v??re rettet mot elevene n??.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} color='text.secondary'>
                        Oppgavebyggeren lar deg lage oppgaver som er tilpasset trinn, kompetansem??l og utstyr som elevene trenger for ?? utf??re oppgaven.
                        Oppgaven din kan ogs?? v??re koblet mot dine andre oppgaver som forrige og neste niv?? dersom du ??nsker en progresjon.
                        Oppgavebyggeren er lagd for ?? v??re veiledende og finner lignende oppgaver fra v??r database for deg n??r klasseniv??, kompetansem??l og utstyr er definert.
                        Du kan enten ??pne oppgavesidene for disse oppgavene for inspirasjon, eller du kan importere oppgaven inn i din oppgavebygger for ?? modifisere oppgaven slik at den passer deg.
                        Felter markert med * m?? fylles ut for at oppgaven kan lagres
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} color='text.secondary'>
                        F??r du lagrer oppgaven din kan du g?? gjennom oppgavebyggerens refleksjonssp??rsm??l.
                        Disse er lagd for ?? f?? deg til ?? reflektere over kvaliteten p?? oppgaven din ved ?? stille sp??rsm??l om spesfikke ting ved oppgaven.
                        ?? g?? gjennom sp??rsm??lene er frivillig, men gjerne ta en titt :)
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={openSaveDialogue}
                onClose={handleCloseSaveDialogue}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid
                        container spacing={0}
                        align="center"
                        justify="center"
                        direction="column"
                        marginTop={"20px"}
                        marginBottom={"20px"}>
                        <Grid container justifyContent="center">
                            <Typography id="modal-modal-title" variant="h6" component="h2" color='text.primary'>
                                ??nsker du at oppgaven skal lagres privat slik at den bare er tilgjengelig for deg?
                            </Typography>
                            <div>
                                <Button variant="contained" sx={{ margin: "20px" }} onClick={() => { save(1) }}>Ja</Button>
                                <Button variant="contained" sx={{ margin: "20px" }} onClick={() => { save(0) }}>Nei</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Modal
                open={openSearchDialogue}
                onClose={handleCloseSearchDialogue}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid
                        container spacing={0}
                        align="center"
                        justify="center"
                        direction="column"
                        marginTop={"20px"}
                        marginBottom={"20px"}>
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2" color='text.primary'>
                                Finn oppgaver med samme:
                            </Typography>
                        </div>
                        <Grid container justifyContent="center">
                            <div>
                                {gradeDefined ? (
                                    <FormControlLabel control={<Checkbox checked={searchGrade} onChange={() => { setSearchGrade(!searchGrade) }} />} label="Klassetrinn" sx={{ color: 'text.secondary' }} />
                                ) : (<></>)}
                                {learningObjective.length > 0 ? (
                                    <FormControlLabel control={<Checkbox checked={searchLO} onChange={() => { setSearchLO(!searchLO) }} />} label="Kompetansem??l" sx={{ color: 'text.secondary' }} />
                                ) : (<></>)}
                                {equipment.length > 0 ? (
                                    <FormControlLabel control={<Checkbox checked={searchEquip} onChange={() => { setSearchEquip(!searchEquip) }} />} label="Utstyr/Plattform" sx={{ color: 'text.secondary' }} />
                                ) : (<></>)}
                                {CT.length > 0 ? (
                                    <FormControlLabel control={<Checkbox checked={searchCT} onChange={() => { setSearchCT(!searchCT) }} />} label="AT Metode(r)" sx={{ color: 'text.secondary' }} />
                                ) : (<></>)}
                            </div>
                        </Grid>
                        <div>
                            <Button variant="contained" sx={{ margin: "20px" }} onClick={findTasks}>S??k</Button>
                        </div>
                        {(!gradeDefined || learningObjective.length === 0 || equipment.length === 0 || CT.length === 0) ? (
                            <div>
                                <Typography id="modal-modal-title" color='text.secondary'>
                                    (Fyll ut flere av feltene ovenfor for ?? s??ke etter lignende oppgaver med samme verdi for de feltene)
                                </Typography>
                            </div>
                        ) : (<></>)}
                    </Grid>
                </Box>
            </Modal>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={openDrawer}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {<ChevronRightIcon className={classes.icon} sx={{ marginTop: 3, marginBottom: 3, fontSize: 40 }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Typography sx={{ marginTop: "25vh" }}>
                    {currentQuestion}
                </Typography>
                <div>
                    {currentQuestion === reviewQuestions[0] ? (
                        <Button disabled sx={{ margin: "10px", width: 75 }}></Button>) :
                        (
                            <Button variant="contained" sx={{ margin: "10px", width: 75 }} onClick={UpdateQuestionPrev}>Forrige</Button>
                        )}
                    {currentQuestion === reviewQuestions[reviewQuestions.length - 1] ? (
                        <Button disabled sx={{ margin: "10px", width: 75 }}></Button>) :
                        (
                            <Button variant="contained" sx={{ margin: "10px", width: 75 }} onClick={UpdateQuestionNext}>Neste</Button>
                        )}
                </div>
            </Drawer>
        </Box >
    );
}