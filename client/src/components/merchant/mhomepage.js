import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Home from "./home/home";
import AddProductForm from "./addproduct/addproduct";
import MyStory from "./mystory/mystory";
import Inventory from "./inventory/inventory";
import MyOrders from "./myorders/myorders";

// const isEmpty = require("is-empty");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#6b63ff",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tablist: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(228,233,239)",
    // borderBottom:"1px solid #00000033"
  },
  tabs: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MHomePage = ({ mSetCurrentUser, mLogoutUser, merchantData }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(4);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          className={classes.tablist}
        >
          <Tab label="Home" {...a11yProps(0)} className={classes.tabs} />
          <Tab label="Add Product" {...a11yProps(1)} className={classes.tabs} />
          <Tab label="My Story" {...a11yProps(2)} className={classes.tabs} />
          <Tab label="Inventory" {...a11yProps(3)} className={classes.tabs} />
          <Tab label="My Orders" {...a11yProps(4)} className={classes.tabs} />
          <Tab
            label="Miscellaneous"
            {...a11yProps(5)}
            className={classes.tabs}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Home setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddProductForm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyStory />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Inventory />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <MyOrders />
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default MHomePage;
