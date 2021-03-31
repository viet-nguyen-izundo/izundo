import * as React from "react"
import { Link } from "gatsby"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"
import {
  Container,
  Grid,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

import icLogo from "../images/logo.png"
import icIzundo from "../images/logoIzundo.png"
import icTwitter from "../images/twitter.svg"
import icFacebook from "../images/facebook.svg"
import icInta from "../images/inta.svg"

const useStyles = makeStyles(theme => ({
  header: {
    // flexGrow: 1,
  },

  appBar: {
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "#ffffff",
  },

  toolBar: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },

  containerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  icLogo: {
    objectFit: "contain",
    marginRight: 40,
    maxWidth: 74,

    "@media (max-width: 768px)": {
      marginRight: 20,
      maxWidth: 37,
    },
  },

  imgLogo: {
    objectFit: "contain",
    maxWidth: 171,

    "@media (max-width: 768px)": {
      maxWidth: 85,
    },
  },

  menuItem: {
    color: "rgba(196, 196, 196, 0.7)",
    textDecoration: "none",
    marginRight: theme.spacing(5),
    fontSize: 12,
  },

  menuItemActive: {
    color: "#1c1c1c",
  },

  menuItemMobile: {
    textAlign: "center",
    padding: 20,
    color: "rgba(196, 196, 196, 0.7)",
    fontSize: 12,
    borderStyle: "solid",
    borderWidth: "0 0 1px 0",
    borderColor: "rgba(196, 196, 196, 0.7)",
  },

  menuItemMobileActive: {
    color: "#1c1c1c",
  },

  main: {
    paddingTop: 150,
  },

  footer: {
    backgroundColor: "#f5f5f5",
    padding: "30px 35px 30px 35px",
  },

  aboutUs: {
    textAlign: "left",
    fontSize: 12,

    "@media (max-width: 768px)": {
      textAlign: "center",
    },
  },

  contact: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",

    "@media (max-width: 768px)": {
      justifyContent: "center",
      alignItems: "center",
    },
  },
}))

const NAV_CONFIG = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "PHILOSOPHY",
    href: "/philosophy",
  },
  {
    title: "WHAT WE DO",
    href: "/what_we_do",
  },
  {
    title: "HOW WE WORK",
    href: "/how_we_work",
  },
  {
    title: "TEAM",
    href: "/team",
  },
  {
    title: "CONTACT",
    href: "/contact",
  },
]

const Layout = ({ location, title, children }) => {
  const classes = useStyles()

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  // let header

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  const [state, setState] = React.useState({
    mobileView: false,
    drawerOpen: false,
  })

  const { mobileView, drawerOpen } = state

  const displayMobile = () => {
    const handleDrawerOpen = () => {
      setState(prevState => ({ ...prevState, drawerOpen: true }))
    }

    const handleDrawerClose = () => {
      setState(prevState => ({ ...prevState, drawerOpen: false }))
    }

    return (
      <Toolbar className={classes.toolBar}>
        <Container className={classes.containerHeader}>
          <Link to="/">
            <Box style={{ display: "flex", alignItems: "center" }}>
              <img alt="Logo" src={icLogo} className={classes.icLogo} />
              <img alt="Logo" src={icIzundo} className={classes.imgLogo} />
            </Box>
          </Link>
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon style={{ color: "#c4c4c4", fontSize: 32 }} />
          </IconButton>
        </Container>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div style={{ minWidth: 250 }}>
            {NAV_CONFIG.map(({ title, href }, index) => (
              <Link to={href} key={index} style={{ textDecoration: "none" }}>
                <Box
                  className={clsx(classes.menuItemMobile, {
                    [classes.menuItemMobileActive]: location.pathname === href,
                  })}
                >
                  {title}
                </Box>
              </Link>
            ))}
          </div>
        </Drawer>
      </Toolbar>
    )
  }

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolBar}>
        <Container className={classes.containerHeader}>
          <Link to="/">
            <Box style={{ display: "flex", alignItems: "center" }}>
              <img alt="Logo" src={icLogo} className={classes.icLogo} />
              <img alt="Logo" src={icIzundo} className={classes.imgLogo} />
            </Box>
          </Link>
          <Box>
            {NAV_CONFIG.map(({ title, href }, index) => (
              <Link
                key={index}
                to={href}
                className={clsx(classes.menuItem, {
                  [classes.menuItemActive]: location.pathname === href,
                })}
              >
                {title}
              </Link>
            ))}
          </Box>
        </Container>
      </Toolbar>
    )
  }

  React.useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState(prevState => ({ ...prevState, mobileView: true }))
        : setState(prevState => ({ ...prevState, mobileView: false }))
    }
    setResponsiveness()
    window.addEventListener("resize", () => setResponsiveness())
  }, [])

  return (
    <div data-is-root-path={isRootPath}>
      <header className={classes.header}>
        <AppBar position="fixed" elevation={0} className={classes.appBar}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
      <main className={classes.main}>
        <Container>{children}</Container>
        <Container>{children}</Container>
      </main>
      <footer className={classes.footer}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={12} sm={12} md={6} lg={6}>
              <Box className={classes.aboutUs}>
                © {new Date().getFullYear()} Izundo. All Rights Reserved.
              </Box>
            </Grid>
            <Grid item xs={12} xl={12} sm={12} md={6} lg={6}>
              <Box className={classes.contact}>
                <Link to="/" style={{ width: 24, marginRight: 16 }}>
                  <img alt="Twitter" src={icTwitter} />
                </Link>
                <Link to="/" style={{ width: 16, marginRight: 16 }}>
                  <img alt="Facebook" src={icFacebook} />
                </Link>
                <Link to="/" style={{ width: 20 }}>
                  <img alt="Inta" src={icInta} />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  )
}

export default Layout
