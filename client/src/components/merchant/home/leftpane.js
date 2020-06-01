import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import DoneIcon from "@material-ui/icons/Done";

import { getMerchantData } from "../../../selectors/merchant-selector";
import { logoutUser } from "../../../thunks/merchant-thunk";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  cardpaper1: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: "rgba(172,201,2,0.5)",
  },

  cardpaper2: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: "rgba(247,95,102,0.5)",
  },
  cardpaper3: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: "rgba(255,209,0,0.5)",
  },
  welcomecardbox: {},
  hellotext: {
    textTransform: "capitalize",
    fontFamily: "'Comfortaa', cursive",
  },
  phrases: {
    marginTop: theme.spacing(1),

    fontFamily: "'Comfortaa', cursive",
    marginBottom: theme.spacing(1),
  },
  phrasesbuttons: {
    fontFamily: "'Comfortaa', cursive",
    cursor: "pointer",
  },
  logoutbutton: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  buttonbox: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const LeftPane = ({ setValue, merchantData, mLogoutUser }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Paper variant="outlined" className={classes.cardpaper1}>
            <Box className={classes.welcomecardbox}>
              <Typography variant="h6" className={classes.hellotext}>
                {`Hello ${String(merchantData.brandName)} `}&nbsp;{` 🎉`}
              </Typography>
              <Divider />
              <Typography variant="subtitle1" className={classes.phrases}>
                You're just few steps away from publishing your own site
              </Typography>
              <Typography variant="subtitle1" className={classes.phrases}>
                Just feel free to explore yourself all the above tabs, each one
                has specific functionality!
              </Typography>
              <Divider />

              <Typography variant="subtitle1" className={classes.phrases}>
                You can always view your running site by visiting this link :
                <Link
                  to={`/m/${merchantData.brandName}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="button" className={classes.phrases}>
                    {" " + merchantData.brandName}
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" className={classes.cardpaper2}>
            <Box className={classes.welcomecardbox}>
              <Typography variant="h6" className={classes.hellotext}>
                {"Useful Links to Tabs - For reference"}
              </Typography>
              <Divider />
              <Typography variant="subtitle1" className={classes.phrases}>
                • To add your new product -
                <Typography
                  variant="button"
                  onClick={() => {
                    setValue(1);
                  }}
                  className={classes.phrasesbuttons}
                >
                  {" Add product "}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" className={classes.phrases}>
                • To add inspiring story -
                <Typography
                  variant="button"
                  onClick={() => {
                    setValue(2);
                  }}
                  className={classes.phrasesbuttons}
                >
                  {" Add Story "}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" className={classes.phrases}>
                • To search and edit you products -
                <Typography
                  variant="button"
                  onClick={() => {
                    setValue(3);
                  }}
                  className={classes.phrasesbuttons}
                >
                  {" Inventory "}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" className={classes.phrases}>
                • See all of your customer orders -
                <Typography
                  variant="button"
                  onClick={() => {
                    setValue(4);
                  }}
                  className={classes.phrasesbuttons}
                >
                  {" My orders "}
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" className={classes.cardpaper3}>
            <Box className={classes.welcomecardbox}>
              <Typography variant="h6" className={classes.hellotext}>
                {"Statistical data from interaction on your website 🖋"}
              </Typography>
              <Divider />
              <Typography variant="subtitle1" className={classes.phrases}>
                ‣ Products added - {merchantData.products.length}
              </Typography>
              <Typography variant="subtitle1" className={classes.phrases}>
                ‣ Story added - <DoneIcon styles={{ fontSize: 8 }} />
              </Typography>
              <Typography variant="subtitle1" className={classes.phrases}>
                ‣ Customers Registers - 4
              </Typography>
              <Typography variant="subtitle1" className={classes.phrases}>
                ‣ Orders Placed - 20
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonbox}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                mLogoutUser();
              }}
              className={classes.logoutbutton}
            >
              Logout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
});

const mapDispatchToProps = (dispatch) => ({
  mLogoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPane);
