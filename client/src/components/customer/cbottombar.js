import React from "react";
import {
  makeStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Paper from "@material-ui/core/Paper"
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 0,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    color: "#f1f1f1",
  },
  cartBadge: {
    top: "3px",
    padding:'2px',
  },
  offset: theme.mixins.toolbar,
}));

const MBottomBar = () => {
  const classes = useStyles();
  return (
    <Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Fab
            color="secondary"
            aria-label="add"
            className={classes.fabButton}
            size="large"
          >
            <Badge
              badgeContent={4}
              color="inherit"
              className={classes.cartBadge}
              max={9}
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </Paper>
  );
};

export default MBottomBar;
