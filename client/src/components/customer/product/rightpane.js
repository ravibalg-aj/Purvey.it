import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  rightpane: {
    width: "50%",
    padding: theme.spacing(3),
    justifyContent: "center",
    alignSelf: "flex-start",
    position: "-webkit-sticky" /* for Safari */,
    position: "sticky",
    top: 0,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  imgTag: {
    objectFit: "cover",
    height: "700px",
  },
  productimage: {
    
  },
}));

const RightPane = ({ product }) => {
  const classes = useStyles();

  return (
    <Box className={classes.rightpane}>
      <Box className={classes.productimage}>
        <GridList className={classes.gridList} cols={1} cellHeight="auto">
          {product.imageUrls.map((imageUrl, i) => (
            <GridListTile key={i}>
              <img
                src={imageUrl}
                alt="product img"
                className={classes.imgTag}
              />
            </GridListTile>
          ))}
        </GridList>
      </Box>
    </Box>
  );
};

export default RightPane;
