import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import AccessTime from "@material-ui/icons/AccessTime";
import Filters from '../../components/Filters/Filters'; // Adjust path
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';
import withStyles from "@material-ui/core/styles/withStyles";

import {
  userRegistrationTrendChart,
  activeInactiveUsersChart,
  usersByRegionChart,
} from '../../variables/charts';

class Analytics extends Component {
    state = {
        filters: {
          dateRange: { start: "", end: "" },
          region: "",
        },
        filteredCharts: {
          userRegistrationTrend: userRegistrationTrendChart.data,
          activeInactiveUsers: activeInactiveUsersChart.data,
          usersByRegion: usersByRegionChart.data,
        },
      };
    
      handleFilterChange = (filters) => {
        this.setState({ filters }, this.applyFilters);
      };
    
      applyFilters = () => {
        const { dateRange, region } = this.state.filters;
    
        // Filter User Registration Trend
        const userRegistrationTrend = {
          labels: userRegistrationTrendChart.data.labels,
          series: userRegistrationTrendChart.data.series.map((series) =>
            series.filter((_, index) => this.filterByDate(index, dateRange))
          ),
        };
    
        // Filter Active vs Inactive Users
        const activeInactiveUsers = {
          ...activeInactiveUsersChart.data,
          series: activeInactiveUsersChart.data.series,
        };
    
        // Filter Users by Region
        const usersByRegion = {
          labels: usersByRegionChart.data.labels,
          series: usersByRegionChart.data.series.map((series) =>
            series.map((value, index) =>
              region && usersByRegionChart.data.labels[index] !== region ? 0 : value
            )
          ),
        };
    
        this.setState({
          filteredCharts: {
            userRegistrationTrend,
            activeInactiveUsers,
            usersByRegion,
          },
        });
      };
    
      filterByDate = (index, dateRange) => {
        const mockDates = ["2023-07-01", "2023-08-01", "2023-09-01", "2023-10-01", "2023-11-01", "2023-12-01"];
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
    
        if (!dateRange.start || !dateRange.end) return true; 
        const currentDate = new Date(mockDates[index]);
        return currentDate >= startDate && currentDate <= endDate;
      };

  render() {
    const { classes } = this.props;
    const { filteredCharts } = this.state;

    return (
      <div>
        <Filters onFilterChange={this.handleFilterChange} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={filteredCharts.userRegistrationTrend}
                  type="Line"
                  options={userRegistrationTrendChart.options}
                  listener={userRegistrationTrendChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>User Registration Trend</h4>
                <p className={classes.cardCategory}>Monthly registration trends</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated just now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={filteredCharts.activeInactiveUsers}
                  type="Pie"
                  options={activeInactiveUsersChart.options}
                  listener={activeInactiveUsersChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Active vs Inactive Users</h4>
                <p className={classes.cardCategory}>User activity distribution</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated just now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={filteredCharts.usersByRegion}
                  type="Bar"
                  options={usersByRegionChart.options}
                  responsiveOptions={usersByRegionChart.responsiveOptions}
                  listener={usersByRegionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Users by Region</h4>
                <p className={classes.cardCategory}>Regional user distribution</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated just now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Analytics.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Analytics);
