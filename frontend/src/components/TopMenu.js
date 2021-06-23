import React from "react"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
//import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Link from "@material-ui/core/Link"
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}))

const TopMenu = () => {
  const classes = useStyles()
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Alex85 programmer
        </Typography>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            href="/"
            className={classes.link}
          >
            Portfolio
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="/about"
            className={classes.link}
          >
            About me
          </Link>
        </nav>
        {/* <Button
          href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
        >
          Login
        </Button> */}
      </Toolbar>
    </AppBar>
  )
}

export default TopMenu
