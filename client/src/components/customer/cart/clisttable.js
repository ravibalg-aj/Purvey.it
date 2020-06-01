import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import RemoveIcon from "@material-ui/icons/Remove";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import lodash from "lodash";
import { connect } from "react-redux";
import Gpay from "./gpay";

import { removeFromCart } from "../../../thunks/customer-thunk";
import { getCustomerData } from "../../../selectors/customer-selector";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  gpaybuttonbox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  totalprice: {
    padding: theme.spacing(2),
  },
  address: {
    width: "30vw",
    padding: theme.spacing(2),
  },
  gpaybutton: {
    padding: theme.spacing(2),
  },
}));
const CListTable = ({ cart, onRemovePressed, customerData }) => {
  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [addressErr, setAddressErr] = useState("")

  const total = lodash.sumBy(cart, (product) => Number(product.price));
  const groupedCartByName = lodash.groupBy(cart, (products) => products.name);
  //   Object.keys(groupedCartByName).map((product) => console.log(groupedCartByName[product][0]));
  return (
    <Box>
      <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <caption>
              Click&nbsp;
              <RemoveIcon style={{ fontSize: 12 }} />
              &nbsp;to remove the item from cart!
            </caption>
            <TableHead>
              <TableRow>
                <TableCell>
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </TableCell>
                <TableCell>Item name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Per item price&nbsp;( ₹ )</TableCell>
                <TableCell align="right">Price&nbsp;( ₹ )</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(groupedCartByName)
                .sort()
                .map((product) => (
                  <TableRow key={product}>
                    <TableCell padding="checkbox">
                      <IconButton
                        onClick={() => {
                          onRemovePressed(
                            customerData._id,
                            groupedCartByName[product][0]._id
                          );
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product}
                    </TableCell>
                    <TableCell align="right">
                      {groupedCartByName[product].length}
                    </TableCell>
                    <TableCell align="right">
                      {groupedCartByName[product][0].price}
                    </TableCell>
                    <TableCell align="right">
                      {groupedCartByName[product][0].price *
                        groupedCartByName[product].length}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className={classes.gpaybuttonbox}>
        <Box className={classes.totalprice}>
          <Typography variant="h6">{`NET-AMOUNT - ₹ ${total}`}</Typography>
          <Divider variant="middle" />
        </Box>

        <Box className={classes.address}>
          <TextField
            id="filled-multiline-static"
            label="Address"
            multiline
            rows={5}
            variant="filled"
            fullWidth
            required
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            error={addressErr.length > 0 ? true : false}
            helperText={addressErr}
          />
        </Box>
        <Box className={classes.gpaybutton}>
          <Gpay address={address} addressErrFunction={setAddressErr} totalPrice={total}/>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  customerData: getCustomerData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (customerId, productId) =>
    dispatch(removeFromCart(customerId, productId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CListTable);
