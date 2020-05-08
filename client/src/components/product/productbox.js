import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: "#f1f1f155",
    fontFamily: "'Cinzel Decorative', cursive",
    fontSize:20
  },
  imageBox: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  nameRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  addtoCardRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Box className={classes.imageBox}>
        {/* https://3.imimg.com/data3/TG/SB/MY-896620/pink-kite-500x500.jpg */}
        {/* https://images.wallpaperscraft.com/image/coffee_mug_chair_124443_1280x720.jpg */}
          <img
            src="https://pluspng.com/img-png/kite-png-hd-images-kite-png-transparent-image-2128.png "
            height="100%"
            width="100%"
            alt="product img"
          />
        </Box>

        <Box pl={3} pr={3} className={classes.nameRow}>
          <Box>Kite</Box>
          <Box>₹25</Box>
        </Box>

        <Box pl={3} pr={3} className={classes.addtoCardRow}>
          <Button variant="outlined" color="secondary">
            Add to Cart
          </Button>
        </Box>
      </div>
    </Container>
  );
};

export default Product;
