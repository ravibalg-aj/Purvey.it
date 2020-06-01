import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  imgTag: {
    objectFit: "contain",
    height: "700px",
  },
  productimage: {
    borderRadius: "16px",
  },
}));

const PRightPane = ({ product }) => {
  const classes = useStyles();

  return (
    <Box className={classes.productimage}>
      <GridList className={classes.gridList} cols={1} cellHeight="auto">
        {product.imageUrls.map((imageUrl, i) => (
          <GridListTile key={i}>
            <img src={imageUrl} alt="product img" className={classes.imgTag} />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
};

export default PRightPane;
