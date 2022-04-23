import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';


export default function About() {

    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Typography variant="h3" component="div" gutterBottom color='text.primary' marginTop="40px">
                            Om MusiCT
                        </Typography>
                        <Typography align={"left"} color="text.secondary" marginTop="20px">
                            MusiCT er et system laget av Kristoffer Hegge Østreim i forbindelse med en masteroppgave.
                            Systemet er bare en prototype og ikke egnet for kommersiell bruk pga. blant annet manglende sikkeretstiltak.
                            Derfor må sensitiv informasjon ikke lagres i dette systemet!
                        </Typography>
                        <Typography align={"left"} color="text.secondary" marginTop="20px">
                            MusiCT har som mål å bistå lærere i å integrere algoritmisk tenkning inn i musikkundervisningen i grunnskolen.
                            Dette gjør systemet gjennom å la deg som bruker lage oppgaver gjennom vår veiledende oppgavebygger.
                            Tanken er at ved å få hjelp til å lage oppgaver og deretter bruke disse i undervisningen vil du tilegne deg praktisk kunnskap om hvordan algoritmisk tenkning passer inn i undervisningen.
                            Etter oppgaven er prøvd ut i klasserommet kan du redigere oppgaven ved å gå inn på oversikten over dine oppgaver.
                            I tillegg har vi Wikisidene våre som gir deg ytterligere teoretisk kunnskap om algoritmisk tenkning, musikkfaget, pedagogikk og utstyr og plattformer du kanskje ikke har hørt om før.
                        </Typography>
                        <Typography align={"left"} color="text.secondary" marginTop="20px">
                            Over tid vil oppgavene danne en samling som kan brukes til å ytterligere veilede brukere i å lage egne oppgaver.
                            Du kan også bruke andres oppgaver i din egen undervisning uten å gjøre noen endringer.
                            Ettersom dette systemet er ment for lærere trenger ikke oppgavebeskrivelsene å være ment for elever. Tenk på det når du lager dine egne oppgaver.
                        </Typography>
                        <Typography align={"left"} color="text.secondary" marginTop="20px">
                            I MusiCT er en oppgave en læringsaktivitet som utføres av elever i en klassetime.
                            De er ment til å være realtivt små og utførbare iløpet av kort tid.
                            På grunn av dette har vi lagt inn muligheten for å lenke sammen flere av oppgavene dine for å lage et lengre løp med progresjon.
                            Mer informasjon om dette finner du i oppgavebyggeren.
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Box >
    );
}