import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import DetailsDialog from "../Dialogs/DetailsDialog";
import Axios from "axios";
import { lighten, makeStyles } from "@material-ui/core/styles";
import {
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
  Checkbox,
  Paper,
  Typography,
  Toolbar,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        <TableCell align="left">ID</TableCell>
        <TableCell align="left">Gerät</TableCell>
        <TableCell align="right">Vorname</TableCell>
        <TableCell align="right">Nachname</TableCell>
        <TableCell align="right">E-Mail</TableCell>
        <TableCell align="right">Telefon</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({
  requests,
  selected,
  setRequests,
  setSelected,
}) => {
  const classes = useToolbarStyles();
  const requestsCopy = [...requests];

  const [openDialog, setOpenDialog] = new useState(false);
  const [selectedObject, setSelectedObject] = new useState({});

  const onInfoClick = () => {
    requestsCopy.forEach((obj) => {
      if (obj._id == selected) {
        setSelectedObject(obj);
        setOpenDialog(true);
      }
    });
  };

  const handleClose = (object) => {
    setOpenDialog(false);
    setSelectedObject(object);
  };

  const onDeleteClick = () => {
    selected.forEach(async (select, x) => {
      console.log(select);
      await Axios.delete(`/api/requests/${select}`)
        .then((res) => {
          requestsCopy.forEach((item, i) => {
            if (item._id == select) {
              requestsCopy.splice(i, 1);
              setRequests(requestsCopy);
              setSelected(selected.splice(x, 1));
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selected.length > 0,
      })}
    >
      {selected.length > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} ausgewählt
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Anfragen
        </Typography>
      )}

      {selected.length === 1 ? (
        <Tooltip onClick={onInfoClick} title="Info">
          <IconButton aria-label="info">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
      {selected.length > 0 ? (
        <Tooltip title="Löschen" onClick={onDeleteClick}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
      <DetailsDialog
        selectedObject={selectedObject}
        open={openDialog}
        onClose={handleClose}
      />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const RequestTable = () => {
  const classes = useStyles();
  const [selected, setSelected] = new useState([]);
  const [page, setPage] = new useState(0);
  const [dense, setDense] = new useState(false);
  const [rowsPerPage, setRowsPerPage] = new useState(5);
  const [requests, setRequests] = new useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: tables } = await Axios.get("/api/requests");
      setRequests(tables);
    };
    fetchEvents();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = requests.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          requests={requests}
          selected={selected}
          setRequests={setRequests}
          setSelected={setSelected}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={requests.length}
            />
            <TableBody>
              {requests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell>{row._id}</TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.size !== ""
                          ? `${row.name} [${row.size} - ${row.modelname}]`
                          : `${row.name} [${row.modelname}]`}
                      </TableCell>
                      <TableCell align="right">{row.surname}</TableCell>
                      <TableCell align="right">{row.lastname}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.telefon}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="verengen"
      />
    </div>
  );
};

export default RequestTable;
