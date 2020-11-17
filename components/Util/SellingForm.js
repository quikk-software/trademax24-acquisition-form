import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Snackbar,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Alert from "@material-ui/lab/Alert";
import Axios from "axios";
import { Devices } from "../../data/Devices";
import DropzoneDialog from "../Dialogs/DropzoneDialog";
import validator from "validator";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: "0.5em",
  },
}));

const SellingForm = ({ id, name, model }) => {
  const classes = useStyles();

  const [_id, setMongoId] = new useState(Date.now());
  const [clicked, setClicked] = new useState(false);
  const [condition, setCondition] = new useState("");
  const [size, setSize] = new useState("");
  const [displayType, setDisplayType] = new useState("");
  const [processor, setProcessor] = new useState("");
  const [graphics, setGraphics] = new useState("");
  const [ram, setRam] = new useState("");
  const [drive, setDrive] = new useState("");
  const [driveType, setDriveType] = new useState("");
  const [surname, setSurname] = new useState("");
  const [lastname, setLastname] = new useState("");
  const [email, setEmail] = new useState("");
  const [telefon, setTelefon] = new useState("");
  const [deviceOperating, setDeviceOperating] = new useState(false);
  const [displayOperating, setDisplayOperating] = new useState(false);
  const [batteryOperating, setBatteryOperating] = new useState(false);
  const [magsafeAvaible, setMagsafeAvaible] = new useState(false);
  const [message, setMessage] = new useState("");
  const [dataSecurity, setDataSecurity] = new useState(false);
  const [firstPage, setFirstPage] = new useState(true);
  const [openDataSnackbar, setOpenDataSnackbar] = new useState(false);
  const [openEmailSnackbar, setOpenEmailSnackbar] = new useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = new useState(false);
  const [openInvalidEmailSnackbar, setOpenInvalidEmailSnackbar] = new useState(false);
  const [equipment, setEquipment] = new useState({
    ovp: false,
    mouse: false,
    keyboard: false,
    trackpad: false,
    adapter: false,
    cable: false,
  });

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleDisplayTypeChange = (event) => {
    setDisplayType(event.target.value);
  };

  const handleProcessorChange = (event) => {
    setProcessor(event.target.value);
  };

  const handleGraphicsChange = (event) => {
    setGraphics(event.target.value);
  };

  const handleRamChange = (event) => {
    setRam(event.target.value);
  };

  const handleDriveChange = (event) => {
    setDrive(event.target.value);
  };

  const handleDriveTypeChange = (event) => {
    setDriveType(event.target.value);
  };

  const handleEquipmentChange = (event) => {
    setEquipment({ ...equipment, [event.target.name]: event.target.checked });
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTelefonChange = (event) => {
    setTelefon(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleDisplayOperatingChange = () =>
    displayOperating ? setDisplayOperating(false) : setDisplayOperating(true);
  const handleDeviceOperatingChange = () =>
    deviceOperating ? setDeviceOperating(false) : setDeviceOperating(true);
  const handleBatteryOperatingChange = () =>
    batteryOperating ? setBatteryOperating(false) : setBatteryOperating(true);
  const handleMagsafeAvaibleChange = () =>
    magsafeAvaible ? setMagsafeAvaible(false) : setMagsafeAvaible(true);
  const handleOnDataSecurityChange = () =>
    dataSecurity ? setDataSecurity(false) : setDataSecurity(true);

  const sendMail = async (obj) => {
    await Axios.post("/api/sendMail", { obj }).then(function (res) {
      res.data ? setOpenEmailSnackbar(true) : setOpenErrorSnackbar(true);
    });
  };

  const sendMailAndPushDataToMongoDb = (obj) => {
    Axios.post("/api/requests", { obj });
    sendMail(obj);
  };

  const proceed = () => {
    if (condition === "") {
      setOpenDataSnackbar(true);
    } else {
      setFirstPage(false);
    }
  };

  const back = () => {
    setFirstPage(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDataSnackbar(false);
    setOpenEmailSnackbar(false);
    setOpenErrorSnackbar(false);
    setOpenInvalidEmailSnackbar(false);
  };

  const validateFormAndSend = () => {
    if (surname && name && email && dataSecurity) {
      if(validator.isEmail(email)) {
        setClicked(true);
        const modelname = model.model;
        const dataObject = {
          id,
          _id,
          name,
          condition,
          modelname,
          size,
          displayType,
          processor,
          graphics,
          ram,
          drive,
          driveType,
          deviceOperating,
          displayOperating,
          batteryOperating,
          magsafeAvaible,
          equipment,
          message,
          dataSecurity,
          surname,
          lastname,
          email,
          telefon,
        };
        sendMailAndPushDataToMongoDb(dataObject);
      } else {
        setOpenInvalidEmailSnackbar(true);
      }
    } else {
      setOpenDataSnackbar(true);
    }
  };

  return (
    <>
      <Snackbar
        open={openDataSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          Es fehlen verpflichtende Angaben! Füllen Sie alle mit einem *
          makierten Felder aus.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openEmailSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Ihre Daten wurden erfolgreich übermittelt! Vielen Dank!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Es gab ein Problem bei der Übermittlung Ihrer Daten! Bitte versuchen
          Sie es später erneut.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openInvalidEmailSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {`Die von Ihnen angegebene E-Mail ${email} ist ungültig.`} 
        </Alert>
      </Snackbar>
      
      {firstPage ? (
        <div className="specswrapper">
          <h1 className="formheadline">{model.model}</h1>
          <div className="specscontainer">
            {
              <FormControl
                variant="outlined"
                className={classes.formControl}
                width={1}
              >
                <InputLabel>Zustand *</InputLabel>
                <Select
                  labelId="sizeselectlabel"
                  id="sizeselect"
                  value={condition}
                  onChange={handleConditionChange}
                  label={condition}
                  width={1}
                  required
                >
                  {Devices["condition"].map((val, i) => {
                    return (
                      <MenuItem key={i} width={1} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            }
          </div>
          <div className="specscontainer">
            {Array.isArray(model["size"]) && model["size"][0] !== "none" ? (
              <FormControl
                variant="outlined"
                className={classes.formControl}
                width={1}
              >
                <InputLabel>Bildschirmdiagonale *</InputLabel>
                <Select
                  labelId="sizeselectlabel"
                  id="sizeselect"
                  value={size}
                  onChange={handleSizeChange}
                  label={size}
                  width={1}
                  required
                >
                  {model["size"].map((val, i) => {
                    return (
                      <MenuItem key={i} width={1} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            ) : (
              <></>
            )}
          </div>
          <div className="specscontainer">
            {(id === "display" && model.model === "Pro Display XDR") ||
            (id === "imac" && model.model === "2020") ? (
              <FormControl
                variant="outlined"
                className={classes.formControl}
                width={1}
              >
                <InputLabel>Glastyp *</InputLabel>
                <Select
                  labelId="displaytypeselectlabel"
                  id="displaytypeselect"
                  value={displayType}
                  onChange={handleDisplayTypeChange}
                  label={displayType}
                  width={1}
                  required
                >
                  {model["displaytype"].map((val, i) => {
                    return (
                      <MenuItem key={i} width={1} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            ) : (
              <></>
            )}
          </div>
          <div className="specscontainer">
            {id === "display" ? (
              <></>
            ) : (
              <FormControl
                variant="outlined"
                className={classes.formControl}
                width={1}
              >
                <InputLabel>Prozessor *</InputLabel>
                <Select
                  labelId="processorselectlabel"
                  id="processorselect"
                  value={processor}
                  onChange={handleProcessorChange}
                  label={processor}
                  width={1}
                  required
                >
                  {model["processor"].map((val, i) => {
                    return (
                      <MenuItem key={i} width={1} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </div>
          <div className="specscontainer">
            {id === "display" ? (
              <></>
            ) : (
              <FormControl
                variant="outlined"
                className={classes.formControl}
                width={1}
              >
                <InputLabel>Grafikkarte *</InputLabel>
                <Select
                  labelId="graphicsselectlabel"
                  id="graphicsselect"
                  value={graphics}
                  onChange={handleGraphicsChange}
                  label={graphics}
                  width={1}
                  required
                >
                  {model["graphics"].map((val, i) => {
                    return (
                      <MenuItem key={i} width={1} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </div>
          <div className="specscontainer">
            {id === "display" ? (
              <></>
            ) : (
              <TextField
                id="outlined-number"
                label="Arbeitsspeicher (in GB)"
                type="number"
                onChange={handleRamChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: 9999 } }}
                value={ram}
                required
              />
            )}
          </div>
          <div className="specscontainer">
            {id === "display" ? (
              <></>
            ) : (
              <TextField
                id="outlined-number"
                label="Festplattenspeicher (in GB)"
                type="number"
                onChange={handleDriveChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: 99999 } }}
                value={drive}
                required
              />
            )}
          </div>
          <div className="specscontainer">
            {id === "display" ? (
              <></>
            ) : (
              <FormControl
                variant="outlined"
                className={classes.formControl}
                width={1}
              >
                <InputLabel>Festplattentyp *</InputLabel>
                <Select
                  labelId="drivetypeselectlabel"
                  id="drivetypeselect"
                  value={driveType}
                  onChange={handleDriveTypeChange}
                  label={driveType}
                >
                  <MenuItem key={1} width={1} value="HDD">
                    Hard Disk Drive (HDD)
                  </MenuItem>
                  <MenuItem key={2} width={1} value="SSD">
                    Solid State Disk (SSD)
                  </MenuItem>
                  <MenuItem key={3} width={1} value="Fusion Drive">
                    Fusion Drive (HDD + SSD)
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
          <div className="specscontainer">
            <DropzoneDialog id={_id} />
          </div>
          <div className="specscontainer">
            <Tooltip
              title={`Das Gerät lässt sich ohne Einschränkungen verwenden, alle Funktionen sind gegeben. Ein technischer Defekt oder Mangel liegt NICHT vor. Sofern Veränderungen an dem Gerät durchgeführt wurden - z.B. Festplattenspeicher aufgerüstet - geben Sie dies bitte unter dem Freifeld „Weitere Anmerkungen“ an. Sofern ein technischer Defekt oder Mangel vorliegt, lassen Sie dieses Feld bitte frei und geben dies ebenfalls unter dem Freifeld „Weitere Anmerkungen“ an.`}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={deviceOperating}
                    onChange={handleDeviceOperatingChange}
                    name="operating"
                    color="primary"
                  />
                }
                label="Gerät funktioniert einwandfrei"
              />
            </Tooltip>
          </div>
          <div className="specscontainer">
            {id === "macmini" || id === "macpro" ? (
              <></>
            ) : (
              <Tooltip
                title={
                  <span>
                    Das Display weist KEINE Mängel oder Defekte auf wie z.B.
                    Displayflackern, Absplitterungen am oder gerissenes Display,
                    Staingate (*1), Tastaturabdrücke, Pixelfehler,
                    Ausleuchtungsfehler (Clouding), Kratzer, Gelbstiche oder
                    Staubeinlagerungen im Display (*2). Je älter das Gerät ist,
                    desto wahrscheinlicher sind Defekte oder Mängel am Display,
                    bitte prüfen Sie im Vorfeld die Funktionalität in dem Sie
                    z.B. einen weißen, blauen und roten Hintergrund auswählen
                    und das Display nach etwaigen Fehlern absuchen. Sofern ein
                    Mangel besteht, lassen Sie dieses Feld bitte frei und
                    vermerken dies unter dem Freifeldtext. <br /> <br />
                    (*1) Staingate: Lösen der Antireflexionsbeschichtung.
                    <br />
                    (*2) Staubeinlagerungen setzen sich ggf. unten den unteren
                    beiden Displayecken ab. Am besten prüfen Sie dies, indem Sie
                    einen weißen Hintergrund auswählen.
                  </span>
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={displayOperating}
                      onChange={handleDisplayOperatingChange}
                      name="operating"
                      color="primary"
                    />
                  }
                  label="Display funktioniert einwandfrei"
                />
              </Tooltip>
            )}
          </div>
          <div className="specscontainer">
            {id === "macbookair" || id === "macbookpro" ? (
              <Tooltip
                title={
                  <span>
                    Sofern die Batterie weniger als 70% Restkapazität oder mehr
                    als 700 Ladezyklen aufweist, lassen Sie diese Checkbox bitte
                    frei. Sofern vom System der Zustand als „Jetzt austauschen“
                    oder „Batterie warten“ bewertet wird, lassen Sie die
                    Checkbox ebenfalls frei. <br />
                    <br />
                    Den Zustand der Batterie können Sie unter Ihrem Mac prüfen,
                    indem Sie auf „Über diesen Mac“ &rarr; „Systembericht“
                    &rarr; „Stromversorgung“ klicken und Informationen zum
                    Batteriezustand entnehmen. Ebenfalls liefert das kostenfreie
                    Programm <strong>Coconut Battery</strong> hilfreiche
                    Informationen zum Batteriezustand.
                  </span>
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={batteryOperating}
                      onChange={handleBatteryOperatingChange}
                      name="operating"
                      color="primary"
                    />
                  }
                  label="Batterie funktioniert einwandfrei"
                />
              </Tooltip>
            ) : (
              <></>
            )}
          </div>
          <div className="specscontainer">
            {id === "macbookair" || id === "macbookpro" ? (
              <Tooltip title="Bitte nur bei originalen MagSafe-Netzteil bestätigen. Nachgekaufte Netzteile eines Drittanbieters können nicht akzeptiert werden. Es dürfen keine Kabelbrüche oder defekte Isolierungen vorhanden sein. Das Ladekabel/Netzteil muss funktionsfähig sein.">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={magsafeAvaible}
                      onChange={handleMagsafeAvaibleChange}
                      name="avaible"
                      color="primary"
                    />
                  }
                  label="Original MagSafe-Netzteil beiliegend"
                />
              </Tooltip>
            ) : (
              <></>
            )}
          </div>
          <div className="specscontainer">
            <Typography variant="h5">Zubehör</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={equipment.ovp}
                  onChange={handleEquipmentChange}
                  name="ovp"
                  color="primary"
                />
              }
              label="Originalverpackung"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={equipment.mouse}
                  onChange={handleEquipmentChange}
                  name="mouse"
                  color="primary"
                />
              }
              label="Maus"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={equipment.keyboard}
                  onChange={handleEquipmentChange}
                  name="keyboard"
                  color="primary"
                />
              }
              label="Tastatur"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={equipment.trackpad}
                  onChange={handleEquipmentChange}
                  name="trackpad"
                  color="primary"
                />
              }
              label="Trackpad"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={equipment.adapter}
                  onChange={handleEquipmentChange}
                  name="adapter"
                  color="primary"
                />
              }
              label="Netzteil"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={equipment.cable}
                  onChange={handleEquipmentChange}
                  name="cable"
                  color="primary"
                />
              }
              label="Netzkabel"
            />
          </div>
          <div className="specscontainer">
            <TextField
              id="outlined-multiline-static"
              label="Weitere Anmerkungen"
              multiline
              onChange={handleMessageChange}
              rows={4}
              variant="outlined"
              fullWidth={true}
            />
          </div>
          <div className="specscontainer">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => proceed()}
            >
              Weiter
            </Button>
          </div>
        </div>
      ) : (
        <div className="infowrapper">
          <div className="infocontainer">
            <TextField
              id="outlined-static"
              label="Vorname"
              variant="outlined"
              fullWidth={true}
              type="text"
              onChange={handleSurnameChange}
              required
            />
          </div>
          <div className="infocontainer">
            <TextField
              id="outlined-static"
              label="Nachname"
              variant="outlined"
              fullWidth={true}
              type="text"
              onChange={handleLastnameChange}
              required
            />
          </div>
          <div className="infocontainer">
            <TextField
              id="outlined-static"
              label="E-Mail"
              variant="outlined"
              fullWidth={true}
              type="email"
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="infocontainer">
            <TextField
              id="outlined-static"
              label="Telefon"
              variant="outlined"
              fullWidth={true}
              type="tel"
              onChange={handleTelefonChange}
            />
          </div>
          <div className="infocontainer">
            <FormControlLabel
              control={
                <Checkbox
                  checked={dataSecurity}
                  onChange={handleOnDataSecurityChange}
                  name="avaible"
                  color="primary"
                />
              }
            />
            <br />
            <label>
              Ich stimme hiermit der{" "}
              <a
                href="https://www.trademax24.de/datenschutzerklaerung"
                target="_blank"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Datenschutzerklärung
              </a>{" "}
              zu &amp; erkläre mich mit der Speicherung meiner angegebenen Daten
              zum Zwecke der Ankaufsbearbeitung einverstanden.
            </label>
          </div>
          <div className="infocontainer">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => back()}
            >
              Zurück
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon>Absenden</SendIcon>}
              onClick={() => validateFormAndSend()}
              disabled={clicked}
            >
              Absenden
            </Button>
          </div>
        </div>
      )}
      <style jsx>{`
        .specswrapper,
        .infowrapper {
          width: 100%;
          max-width: 500px;
        }

        .specscontainer,
        .infocontainer {
          margin: 1em;
        }

        .formheadline {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default SellingForm;
