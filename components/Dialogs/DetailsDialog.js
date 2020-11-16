import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { Typography, List, DialogTitle, Dialog } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  list: {
    margin: theme.spacing(2),
  },
}));

const DetailsDialog = (props) => {
  const classes = useStyles();
  const { onClose, selectedObject, open } = props;

  const handleClose = () => {
    onClose(selectedObject);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <List className={classes.list}>
        <Typography variant="h6">Geräteinformationen</Typography>
        <Typography>
          {selectedObject.name}{" "}
          {selectedObject.size !== ""
            ? `[${selectedObject.size} - ${selectedObject.modelname}]`
            : `[${selectedObject.modelname}]`}
        </Typography>
        <Typography>Zustand: {selectedObject.condition}</Typography>
        {selectedObject.displayType !== "" ? (
          <Typography>Display-Typ: {selectedObject.displayType}</Typography>
        ) : (
          <></>
        )}
        {selectedObject.processor !== "" ? (
          <Typography>CPU: {selectedObject.processor}</Typography>
        ) : (
          <></>
        )}
        {selectedObject.graphics !== "" ? (
          <Typography>GPU: {selectedObject.graphics}</Typography>
        ) : (
          <></>
        )}
        {selectedObject.ram !== "" ? (
          <Typography>RAM: {selectedObject.ram}GB</Typography>
        ) : (
          <></>
        )}
        {selectedObject.drive !== "" ? (
          <Typography>Drive: {selectedObject.drive}GB</Typography>
        ) : (
          <></>
        )}
        {selectedObject.driveType !== "" ? (
          <Typography>Drive-Typ: {selectedObject.driveType}</Typography>
        ) : (
          <></>
        )}
        <Typography>
          Gerät funktioniert?: {selectedObject.deviceOperating ? "Ja" : "Nein"}
        </Typography>
        <Typography>
          Display funktioniert?:{" "}
          {selectedObject.displayOperating ? "Ja" : "Nein"}
        </Typography>
        <Typography>
          Batterie funktioniert?:{" "}
          {selectedObject.batteryOperating ? "Ja" : "Nein"}
        </Typography>
        <Typography>
          MagSafe verfügbar?: {selectedObject.magsafeAvaible ? "Ja" : "Nein"}
        </Typography>
        <Typography variant="h6">Zubehör</Typography>
        {selectedObject.equipment === undefined ? (
          <></>
        ) : (
          <>
            <Typography>
              OVP: {selectedObject.equipment.ovp ? "Ja" : "Nein"}
            </Typography>
            <Typography>
              Maus: {selectedObject.equipment.mouse ? "Ja" : "Nein"}
            </Typography>
            <Typography>
              Tastatur: {selectedObject.equipment.keyboard ? "Ja" : "Nein"}
            </Typography>
            <Typography>
              Trackpad: {selectedObject.equipment.trackpad ? "Ja" : "Nein"}
            </Typography>
            <Typography>
              Netzteil: {selectedObject.equipment.adapter ? "Ja" : "Nein"}
            </Typography>
            <Typography>
              Netzkabel: {selectedObject.equipment.cable ? "Ja" : "Nein"}
            </Typography>
          </>
        )}
        <Typography variant="h6">Anmerkung</Typography>
        <Typography>{selectedObject.message}</Typography>
      </List>
    </Dialog>
  );
};

export default DetailsDialog;
