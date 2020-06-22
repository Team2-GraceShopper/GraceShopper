import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

export default function About() {
  //   const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h6" align="left">
          ABOUT US
        </Typography>
      </Container>
    </React.Fragment>
  )
}
