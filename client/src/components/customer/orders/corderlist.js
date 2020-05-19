import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  panelSummary: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  orderid: {
    flexGrow: 1,
  },
  orderdate: {
    flexGrow: 1,
  },
  orderitemscount: {
    flexGrow: 1,
  },
}));

const COrderList = ({ orders }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {orders.map((order) => (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box className={classes.panelSummary}>
              <Box className={classes.orderid}>
                <Typography className={classes.heading}>
                  Order ID ~ {order._id} 
                </Typography>
              </Box>
              <Box className={classes.status}>
                <Typography className={classes.heading}>
                  Status : {order.status}
                </Typography>
              </Box>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Box className={classes.panelSummary}>
              <Box className={classes.orderdate}>
                <Typography className={classes.heading}>
                  Dated : {String(order.createdAt).substr(0, 10)}
                </Typography>
              </Box>
              <Box className={classes.orderitemscount}>
                <Typography className={classes.heading}>
                  No of Items : {order.cart.length}
                </Typography>
              </Box>
              <Box className={classes.ordertotalprice}>
                <Typography className={classes.heading}>
                  Price : {order.totalPrice}
                </Typography>
              </Box>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Box>
  );
};
export default COrderList;
