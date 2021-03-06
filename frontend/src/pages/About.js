import React, { useEffect } from "react"

import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"

import Typography from "@material-ui/core/Typography"

import { makeStyles } from "@material-ui/core/styles"

import { useDispatch, useSelector } from "react-redux"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"

import ListItemText from "@material-ui/core/ListItemText"

import { listPortfolios } from "../actions/portfolioActions"
import ButtonBase from "@material-ui/core/ButtonBase"
import Avatar from "@material-ui/core/Avatar"
import TopMenu from "../components/TopMenu"
import Footer from "../components/Footer"
import Container from "@material-ui/core/Container"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "960px",
    margin: "0 auto",
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: 20,
    maxWidth: 960,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  heroContent: {
    padding: theme.spacing(3, 0, 3),
  },
  ListItemText: {
    "& .MuiTypography-body2": {
      fontWeight: "bold",
    },
  },
}))
const Home = ({ match, location, history }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  //let i = useParams()
  //let query = useQuery()

  const portfolioList = useSelector((state) => state.portfolioList)
  const { data } = portfolioList
  console.log(data)

  useEffect(() => {
    dispatch(listPortfolios())
  }, [dispatch])

  return (
    <React.Fragment>
      <CssBaseline />
      <TopMenu />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          About me
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              {/* <img
                className={classes.img}
                alt="complex"
                src="uploads/profile.jpg"
              /> */}
              <Avatar
                className={classes.large}
                alt="Remy Sharp"
                src="uploads/profile.jpg"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Hi, there! I am a Full Stack Web Developer from Ukraine with
                  over 7+ years of experience in software development and
                  maintenance.
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Now I work with these technologies:
                </Typography>
                <List dense={true} className={classes.ListItemText}>
                  <ListItem>
                    <ListItemText primary="- PHP / Laravel / WordPress" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="- JS / React.js / Vue.js" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="- MySQL / MogngoDB" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="- Linux / Windows" />
                  </ListItem>
                </List>

                <div>
                  <List dense={true}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="uploads/gmail3.png"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="blyakher85@gmail.com" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="uploads/telegram2.png"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="@cumar85" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="uploads/skype2.png"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="cumar8585" />
                    </ListItem>
                  </List>
                </div>
                {/* <Typography variant="body2">
                  - PHP / Laravel / WordPress
                </Typography>
                <Typography variant="body2">
                  - JS / React.js / Vue.js
                </Typography>
                <Typography variant="body2">- MySQL / MogngoDB</Typography>
                <Typography variant="body2">- Linux / Windows</Typography> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default Home
