import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  Drawer,
  Typography,
  List, ListItem, ListItemText
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor, onDeleteUser } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(tableData);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((row) =>
    row.some((cell) => cell.toString().toLowerCase().includes(searchQuery))
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (row) => {
    setSelectedRow(row);
    setDrawerOpen(true);
  };

  const handleDeleteConfirmation = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setData(data.filter((row) => row !== selectedRow));
    onDeleteUser(); // Update the parent state to track deleted users
    setDeleteDialogOpen(false);
  };

  return (
    <div className={classes.tableResponsive}>
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        className={classes.searchInput}
      />
      <Table className={classes.table}>
        {tableHead !== undefined && (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => (
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}
                  key={key}
                >
                  {prop}
                </TableCell>
              ))}
              <TableCell className={classes.tableCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, key) => (
              <TableRow key={key}>
                {row.map((cell, cellKey) => (
                  <TableCell className={classes.tableCell} key={cellKey}>
                    {cell}
                  </TableCell>
                ))}
                <TableCell className={classes.tableCell}>
                  <Tooltip title="View Details">
                    <IconButton color="primary" onClick={() => handleViewDetails(row)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteConfirmation(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this row?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="default">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Drawer for Viewing Details */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div
          style={{
            width: 350,
            padding: 20,
            background: "#f9f9f9",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Close Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Row Details
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "#ddd",
              margin: "16px 0",
            }}
          ></div>

          {/* List of Items */}
          {selectedRow && (
            <List>
              {selectedRow.map((cell, index) => (
                <ListItem
                  key={index}
                  style={{
                    borderRadius: "8px",
                    margin: "4px 0",
                    padding: "10px 15px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <ListItemText primary={cell} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </Drawer>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onDeleteUser: PropTypes.func.isRequired, // Function to update deleted users count
};

export default withStyles(tableStyle)(CustomTable);
