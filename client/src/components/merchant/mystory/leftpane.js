import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";

import Lottie from "react-lottie";
import animationData from "../addproduct/lottie/loading.json";

import {
  getErrors,
  getMerchantData,
  getMerchantStory,
} from "../../../selectors/merchant-selector";

import { addStory } from "../../../thunks/merchant-thunk";

var isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: theme.spacing(3),
  },
  story: {
    display: "flex",
    flexDirection: "column",
    height: "fill-available",
  },
  storyheading: {},
  storydescription: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  storytextfield: {
    width: "100%",
  },
  storyimagebox: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    height: "fill-available",
    padding: theme.spacing(3),
  },
  storyimage: {
    width: "100%",
    objectFit: "cover",
    borderRadius: "16px",
  },
}));

const LeftPane = ({ mystory, errors, onSubmitPressed, merchantData }) => {
  const classes = useStyles();

  const [story, setStory] = useState(isEmpty(mystory) ? "" : mystory.content);
  const [imageUrl, setImageUrl] = useState(
    isEmpty(mystory) ? "" : mystory.imageUrl
  );

  const [image, setImage] = useState([]);

  const [editOn, setEditOn] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    setShowLottie(false);
  }, [errors]);

  useEffect(() => {
    setShowLottie(false);
    setImageUrl("");
    setImageUrl(isEmpty(mystory) ? "" : mystory.imageUrl);
    setEditOn(false);
  }, [mystory]);

  const onReset = () => {
    setStory(isEmpty(mystory) ? "" : mystory.content);
    setImageUrl(isEmpty(mystory) ? "" : mystory.imageUrl);
    setEditOn(false);
  };

  const onSubmit = () => {
    errors = {};

    const newStory = {
      content: story,
      imageUrl: imageUrl,
      image: image,
    };

    console.log(newStory);
    onSubmitPressed(newStory, merchantData._id);
    setShowLottie(true);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Box className={classes.story}>
            <Box className={classes.storyheading}>
              <Typography variant="h3">My Story</Typography>
            </Box>
            <Box className={classes.storydescription}>
              <Box className={classes.storytextfield}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={32}
                  variant="outlined"
                  value={story}
                  label={"We'd love to hear your"}
                  onChange={(e) => {
                    setStory(e.target.value);
                  }}
                  fullWidth
                  error={errors.content ? true : false}
                  helperText={errors.content ? errors.content : ""}
                  className={classes.productheading}
                  InputProps={{
                    readOnly: !editOn,
                  }}
                />
              </Box>
              {editOn ? (
                <Box>
                  <Box>
                    <ButtonGroup
                      variant="contained"
                      color="primary"
                      className={classes.submitbutton}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                        startIcon={<PublishOutlinedIcon />}
                      >
                        {isEmpty(image) ? "" : image[0].name}
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            setImage(e.target.files);
                          }}
                          multiple
                        />
                      </Button>

                      <Button onClick={onSubmit}>Save it</Button>
                      <Button onClick={onReset}>Reset</Button>
                    </ButtonGroup>
                    {errors.imageUrl ? (
                      <Typography
                        variant="caption"
                        style={{ padding: "10px", color: "#f44336" }}
                      >
                        {errors.imageUrl}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box>
                    {showLottie ? (
                      <Lottie options={defaultOptions} height={50} width={50} />
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setEditOn(true);
                    }}
                    className={classes.submitbutton}
                  >
                    Edit it
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.storyimagebox}>
            <img src={imageUrl} alt={"story"} className={classes.storyimage} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
  mystory: getMerchantStory(state),
  errors: getErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitPressed: (storyData, merchantId) =>
    dispatch(addStory(storyData, merchantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPane);
