import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(185,185,185,0.4)",
    // backgroundColor: "rgba(110,120,60,0.6)",
  },
  leftbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "cesnter",
    padding: theme.spacing(4),
  },
  rightbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(8),
  },
  rightimg: {
    objectFit: "cover",
    height: "700px",
  },
  storytitle: {
    padding: theme.spacing(2),
  },
  storycontent: {
    fontSize: 20,
    padding: theme.spacing(2),
    lineHeight: "2",
  },
}));

const COurStory = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xl={7}
        lg={7}
        md={7}
        sm={12}
        xs={12}
        className={classes.leftbox}
      >
        <Box>
          <Typography className={classes.storytitle} variant="h1">
            Our Story
          </Typography>
        </Box>

        <Box>
          <Typography className={classes.storycontent} variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet
            enim tortor at auctor urna nunc id cursus metus. Turpis egestas
            pretium aenean pharetra magna ac placerat vestibulum. Non quam lacus
            suspendisse faucibus interdum posuere lorem. Sed viverra tellus in
            hac habitasse platea dictumst vestibulum rhoncus. Dui vivamus arcu
            felis bibendum. Sem nulla pharetra diam sit amet nisl. Viverra orci
            sagittis eu volutpat. Egestas diam in arcu cursus euismod quis
            viverra nibh. Diam phasellus vestibulum lorem sed risus ultricies
            tristique nulla. Est lorem ipsum dolor sit amet consectetur
            adipiscing. Dui vivamus arcu felis bibendum. Sem nulla pharetra diam
            sit amet nisl. Viverra orci sagittis eu volutpat. Egestas diam in
            arcu cursus euismod quis viverra nibh. Diam phasellus vestibulum
            lorem sed risus ultricies tristique nulla. Est lorem ipsum dolor sit
            amet consectetur adipiscing.
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xl={5}
        lg={5}
        md={5}
        sm={12}
        xs={12}
        className={classes.rightbox}
      >
        <img
          src="https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
          className={classes.rightimg}
          alt="merchant_owner"
        />
      </Grid>
    </Grid>
  );
};

export default COurStory;
