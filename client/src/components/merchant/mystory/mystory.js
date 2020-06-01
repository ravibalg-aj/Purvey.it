import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import LeftPane from "./leftpane";
// import RightPane from "./rightpane";

const MyStory = ({ value, setValue }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <LeftPane />
      </Grid>
      {/* <Grid item xs={4}>
        <RightPane />
      </Grid> */}
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyStory);
