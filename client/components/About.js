import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  aboutus: {
    paddingBottom: theme.spacing(6),
    paddingTop: theme.spacing(2)
  },

  image: {
    height: '80%',
    width: '85%',
    display: 'flex',
    paddingLeft: theme.spacing(10)
  },
  img: {
    display: 'flex',
    maxWidth: '60%',
    maxHeight: '70%'
    // height: '750px',
    // marginRight: 40,
    // marginLeft: 40
  },

  intro: {
    height: '300px',
    width: '300px',
    maxHeight: '50%',
    display: 'flex',
    paddingTop: theme.spacing(6)
  }
}))

export default function About() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography variant="h4" align="center" className={classes.aboutus}>
        ABOUT US
      </Typography>

      <Grid container direction="row" spacing={2}>
        <Grid item className={classes.img}>
          <img
            src="https://i1.wp.com/frenchmoments.eu/wp-content/uploads/2015/03/Marais-Walk-14-March-2015-19-copyright-French-Moments1.jpg?fit=2048%2C1536&ssl=1"
            className={classes.image}
          />
        </Grid>

        <Grid className={classes.intro} spacing={2} container>
          <Typography variant="subtitle1" align="center">
            Maison Corona has been a household name for over 3 months since
            COVID hit the planet and has mastered the art of selling you fancy
            stuff that you don't really need. Anything but your average
            essentials, we continue to create chic nonsense with a modern touch.
            From grandma's leftover to knock-off Lysol, each piece strikes the
            perfect balance between comfort and style.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
