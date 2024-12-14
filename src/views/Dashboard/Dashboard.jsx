import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Accessibility from "@material-ui/icons/Accessibility";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Update from "@material-ui/icons/Update";
import LocalOffer from "@material-ui/icons/LocalOffer";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    deletedUsersCount: 0, 
    users: [
      ["1", "Amit Sharma", "amit.sharma@gmail.com", "Active", "India"],
      ["2", "Neha Gupta", "neha.gupta@gmail.com", "Inactive", "India"],
      ["3", "Rajesh Kumar", "rajesh.kumar@gmail.com", "Active", "India"],
      ["4", "Priya Rani", "priya.rani@gmail.com", "Active", "India"],
      ["5", "Vikram Singh", "vikram.singh@gmail.com", "Inactive", "India"],
      ["6", "Ravi Patel", "ravi.patel@gmail.com", "Active", "India"],
      ["7", "Shalini Verma", "shalini.verma@gmail.com", "Inactive", "India"],
      ["8", "Sandeep Yadav", "sandeep.yadav@gmail.com", "Active", "India"],
      ["9", "Simran Kaur", "simran.kaur@gmail.com", "Inactive", "India"],
      ["10", "Suresh Reddy", "suresh.reddy@gmail.com", "Active", "India"],
      ["11", "Anjali Desai", "anjali.desai@gmail.com", "Inactive", "India"],
      ["12", "Siddharth Mehta", "siddharth.mehta@gmail.com", "Active", "India"],
      ["13", "Pooja Agarwal", "pooja.agarwal@gmail.com", "Active", "India"],
      ["14", "Rohit Joshi", "rohit.joshi@gmail.com", "Inactive", "India"],
      ["15", "Ankit Verma", "ankit.verma@gmail.com", "Active", "India"],
    ],
  };

  calculateUserMetrics = () => {
    const { users, deletedUsersCount } = this.state;
    const totalUsers = users.length - deletedUsersCount; 
    const activeUsers = users.filter((user) => user[3] === "Active").length;
    return { totalUsers, activeUsers, deletedUsers: deletedUsersCount };
  };

  handleDeleteUser = () => {
    this.setState((prevState) => ({
      deletedUsersCount: prevState.deletedUsersCount + 1,
    }));
  };

  render() {
    const { classes } = this.props;

    const { totalUsers, activeUsers, deletedUsers } = this.calculateUserMetrics();

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Total Users</p>
                <h3 className={classes.cardTitle}>{totalUsers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <AccountBalance />
                </CardIcon>
                <p className={classes.cardCategory}>Active Users</p>
                <h3 className={classes.cardTitle}>{activeUsers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Deleted Users</p>
                <h3 className={classes.cardTitle}>{deletedUsers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from session
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Users</h4>
                <p className={classes.cardCategoryWhite}>
                  New users on 14th December, 2024
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Email", "Status", "Country"]}
                  tableData={this.state.users}
                  onDeleteUser={this.handleDeleteUser}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
