import '../App.css';
import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Checkbox, Divider, FormControl, Grid, ListItemText, MenuItem, styled, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from '../UserContext';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
    }
});

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



export default function EditTask() {

    const [grade, setGrade] = useState("");
    const [learningObjective, setLearningObjective] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [CT, setCT] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [evaluation, setEvaluation] = useState("");
    const [outcome, setOutcome] = useState("");

    const classes = useStyles();

    const [gradeDefined, setGradeDefined] = useState(false);
    const [gradeDefinedCounter, setGradeDefinedCounter] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const { value } = useContext(UserContext);
    const path = window.location.pathname.split("/")[2]

    const [objectives, setObjectives] = useState([]);
    const [EquipOptions, setEquipOptions] = useState([]);
    const [CTmethods, setCTmethods] = useState([]);

    const LOSet1 = [
        "utøve et repertoar av sangleker, sanger og danser hentet fra elevenes nære musikkultur og fra kulturarven",
        "utforske og eksperimentere med puls, rytme, tempo, klang, melodi, dynamikk, harmoni og form i dans, med stemmen og i spill på instrumenter",
        "leke med musikkens grunnelementer gjennom lyd og stemme, lage mønstre og sette sammen mønstrene til enkle improvisasjoner og komposisjoner, også med digitale verktøy",
        "formidle opplevelser av ulike musikalske uttrykk gjennom samtale og kunstneriske uttrykksformer"
    ];

    const LOSet2 = [
        "utøve og utforske et repertoar av sanger og danser fra ulike musikkulturer, inkludert samisk musikkultur",
        "synge og spille på instrumenter alene og sammen med andre ved bruk av gehør og enkel notasjon",
        "eksperimentere med rytmer, melodier og andre grunnelementer, sette sammen mønstre til komposisjoner, også ved bruk av digitale verktøy, og beskrive arbeidsprosesser og resultater",
        "formidle egne musikkopplevelser og beskrive bruk av musikalske virkemidler ved hjelp av enkle fagbegreper",
        "samtale om og reflektere over hvordan musikk skaper mening når den brukes i ulike sosiale sammenhenger"
    ];

    const LOSet3 = [
        "utøve et repertoar av musikk, sang, andre vokale uttrykk og dans fra samtiden og historien",
        "utforske og drøfte hvordan musikk fra fortiden påvirker dagens musikk",
        "øve inn og framføre sang og musikk, i samspill eller individuelt, gehørbasert og ved bruk av enkle notasjonsteknikker",
        "lytte, eksperimentere og skape nye uttrykk med instrumenter, kropp, stemme eller lyd fra andre kilder, og presentere resultatet",
        "bruke teknologi og digitale verktøy til å skape, øve inn og bearbeide musikk",
        "bruke fagbegreper i beskrivelse av og refleksjon over arbeidsprosesser, resultater, musikalske uttrykk og virkemidler",
        "utforske og formidle musikalske opplevelser og erfaringer",
        "undersøke hvordan kjønn, kjønnsroller og seksualitet fremstilles i musikk og dans i det offentlige rom, og skape uttrykk som utfordrer stereotypier",
        "reflektere over hvordan musikk kan spille ulike roller for utvikling av individer og gruppers identitet"
    ];

    const LOSet4 = [
        "utøve et variert repertoar av musikk, sang, andre vokale uttrykk og dans",
        "reflektere over hvordan musikalske tradisjoner, inkludert samiske musikktradisjoner, bevares og fornyes",
        "samarbeide med andre om å planlegge og gjennomføre øvingsprosesser hvor det inngår selvvalgt sang, andre vokale uttrykk, spill på instrumenter eller dans, og formidle resultatet i gruppe eller individuelt",
        "skape og programmere musikalske forløp ved å eksperimentere med lyd fra ulike kilder",
        "utforske og formidle musikalske opplevelser og erfaringer, og reflektere over bruk av musikalske virkemidler",
        "lytte og prøve ut ulike uttrykk og begrunne valg i skapende prosesser fra idé til ferdig resultat",
        "bruke gehør og notasjonsteknikker som støtte i skapende arbeid",
        "bruke relevante fagbegreper i skapende arbeid og i refleksjon over prosesser og resultater",
        "utforske og reflektere over hvordan musikk, sang og dans som estetiske uttrykk er påvirket av og uttrykk for historiske og samfunnsmessige forhold, og skape musikalske uttrykk som tar opp utfordringer i samtiden",
        "utforske og drøfte musikkens og dansens betydning i samfunnet og etiske problemstillinger knyttet til musikalske ytringer og musikkulturer"
    ];

    const Equipfull = [
        "Instrument - Gitar",
        "Instrument - Piano",
        "Instrument - Slagverk",
        "Scratch",
        "Sonic Pi",
        "Arduino",
        "Digital Audio Workstation",
        "Ekstra utstyr ikke nødvendig"
    ]

    const CTfull = [
        "Logikk",
        "Algoritmer",
        "Dekomposisjon",
        "Mønstre",
        "Abstraksjon",
        "Evaluering"
    ];

    useEffect(() => {
        if (grade === "") {
            setGradeDefined(false);
        }
        else {
            setGradeDefined(true);
            setLearningObjective([]);
        }
        setGradeDefinedCounter(gradeDefinedCounter + 1);
        console.log(gradeDefinedCounter);
    }, [grade]);

    let navigate = useNavigate();

    useEffect(() => {
        if (submitted === false) {
        }
        else if (submitted === true) {
            alert("Endringene er lagret");
            return navigate("/");
        }
    }, [submitted, navigate]);

    useEffect(() => {
        Axios.post('https://musict-v2.herokuapp.com/fetchmytasks', {
            userID: value
        }).then((response) => {
            if (response.data.message) {
                return
            }
            else {
                for (const i in response.data) {
                    const e = response.data[i];
                    if (e.TaskID === parseInt(path)) {
                        const t = response.data.splice(response.data.indexOf(e), 1);
                        console.log(t);
                        setGrade(t[0].Grade);
                        setLearningObjective(t[0].LearningObjective.split("| "));
                        setEquipment(t[0].Equipment.split(", "));
                        setCT(t[0].CT.split(", "));
                        setTitle(t[0].Title);
                        setDescription(t[0].Description);
                        setEvaluation(t[0].Evaluation);
                        setOutcome(t[0].Outcome);
                    }
                }
            }
        })
    }, []);

    useEffect(() => {
        console.log(learningObjective)
        const a = [];
        if (grade === "1. - 2. trinn") {
            for (const entry of LOSet1) {
                if (!learningObjective.includes(entry)) {
                    a.push(entry);
                }
            }
        }
        if (grade === "3. - 4. trinn") {
            for (const entry of LOSet2) {
                if (!learningObjective.includes(entry)) {
                    a.push(entry);
                }
            }
        }
        if (grade === "5. - 7. trinn") {
            for (const entry of LOSet3) {
                if (!learningObjective.includes(entry)) {
                    a.push(entry);
                }
            }
        }
        if (grade === "8. - 10. trinn") {
            for (const entry of LOSet4) {
                if (!learningObjective.includes(entry)) {
                    a.push(entry);
                }
            }
        }
        console.log(a);
        setObjectives(a);
    }, [learningObjective])

    useEffect(() => {
        const a = [];
        for (const entry of Equipfull) {
            if (!equipment.includes(entry)) {
                a.push(entry);
            }
        }
        setEquipOptions(a);
    }, [equipment])

    useEffect(() => {
        const a = [];
        for (const entry of CTfull) {
            if (!CT.includes(entry)) {
                a.push(entry);
            }
        }
        setCTmethods(a);
    }, [CT])

    const save = () => {
        Axios.post('https://musict-v2.herokuapp.com/updatetask', {
            grade: grade,
            learningObjective: learningObjective,
            equipment: equipment,
            CT: CT,
            title: title,
            description: description,
            evaluation: evaluation,
            outcome: outcome,
            taskID: path
        }).then(setSubmitted(true));
    };

    const updateLO = (e) => {
        setLearningObjective(
            typeof e === 'string' ? e.split(',') : e,
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
                    <Typography variant="h3" component="div" gutterBottom color='text.primary'>Rediger Oppgave</Typography>
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
                                label={!gradeDefined ? ("Velg klassenivå først") : ("Kompetansemål*")}
                                disabled={!(gradeDefined)}
                                className={classes.root}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon },
                                    multiple: true,
                                    value: learningObjective,
                                    onChange: (e) => { updateLO(e.target.value) },
                                    renderValue: (selected) => selected.join(", ")
                                }}
                            >
                                {grade === "1. - 2. trinn" && gradeDefinedCounter === 1 ? (
                                    learningObjective.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={true} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "1. - 2. trinn" && gradeDefinedCounter === 1 ? (
                                    objectives.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={false} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "3. - 4. trinn" && gradeDefinedCounter === 1 ? (
                                    learningObjective.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={true} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "3. - 4. trinn" && gradeDefinedCounter === 1 ? (
                                    objectives.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={false} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "5. - 7. trinn" && gradeDefinedCounter === 1 ? (
                                    learningObjective.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={true} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "5. - 7. trinn" && gradeDefinedCounter === 1 ? (
                                    objectives.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={false} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "8. - 10. trinn" && gradeDefinedCounter === 1 ? (
                                    learningObjective.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={true} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {grade === "8. - 10. trinn" && gradeDefinedCounter === 1 ? (
                                    objectives.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={false} />
                                            <ListItemText>
                                                {item}
                                            </ListItemText>
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }

                                {grade === "1. - 2. trinn" && gradeDefinedCounter !== 1 ? (
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
                                {grade === "3. - 4. trinn" && gradeDefinedCounter !== 1 ? (
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
                                {grade === "5. - 7. trinn" && gradeDefinedCounter !== 1 ? (
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
                                {grade === "8. - 10. trinn" && gradeDefinedCounter !== 1 ? (
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
                                label="Utstyr/Pattform*"
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
                                {equipment.length > 0 ? (
                                    equipment.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={true} />
                                            {item}
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {equipment.length > 0 ? (
                                    EquipOptions.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={false} />
                                            {item}
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
                                {CT.length > 0 ? (
                                    CT.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={true} />
                                            {item}
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                                {CT.length > 0 ? (
                                    CTmethods.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={false} />
                                            {item}
                                        </MenuItem>
                                    ))
                                ) : (<></>)
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <CssTextField value={title} label={title ? ("") : ("Tittel")} id="custom-css-outlined-input" sx={{ width: 800, marginTop: "20px" }} onChange={(e) => { setTitle(e.target.value) }} />
            <div>
                <CssTextField
                    id="outlined-multiline-static"
                    value={description}
                    label={description ? ("") : ("Oppgavebeskrivelse")}
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
                    label={outcome ? ("") : ("Potensielt Læringsutbytte*")}
                    multiline
                    rows={15}
                    sx={{ width: 800, marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => { setOutcome(e.target.value) }}
                />
            </div>
            <div>
                <Button variant="contained" sx={{ margin: "20px" }} onClick={save}>Lagre</Button>
                <Button variant="outlined" component={Link} to="/" sx={{ margin: "20px" }}>Avbryt</Button>
            </div>
        </Box >
    );
}