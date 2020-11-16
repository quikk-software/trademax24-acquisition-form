import React, { Component, useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import fetch from "node-fetch";
import ProgressBar from "../Util/ProgressBar";
require("dotenv").config();

class DropzoneAreaExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      files: [],
      progress: 0,
      currentFileIndex: 0,
      openDataSendSnackbar: false,
      openErrorSendSnackbar: false,
    };
  }

  handleChange(files) {
    this.setState({
      files: files,
    });
  }

  uploadFiles() {
    if (this.state.files.length === 0) return;
    const token =
      "iqGdmioUHBcAAAAAAAAAATeUDNWiIno_yW8upE8pz_Xt94W-jOufUtIXstEEqJKO";
    var filesCopy = this.state.files;
    for (var i = 0; i < filesCopy.length; i++) {
      fetch("https://content.dropboxapi.com/2/files/upload", {
        method: "POST",
        body: filesCopy[i],
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": `{\"path\": \"/${this.state.id}/${filesCopy[i].name}\",\"mode\": \"add\",\"autorename\": true,\"mute\": false,\"strict_conflict\": false}`,
        },
      })
        .then((res) => {
          if (
            Math.round(this.state.progress) <
            ((this.state.files.length - 1) / this.state.files.length) * 100
          ) {
            this.setState({
              progress: (this.state.progress += (1 / filesCopy.length) * 100),
            });
          } else {
            this.setState({
              progress: 0,
              openDataSendSnackbar: true,
              files: [],
            });
          }
        })
        .catch((err) => {
          this.setState({
            progress: 0,
            openErrorSendSnackbar: true,
          });
        });
    }
  }

  render() {
    return (
      <>
        <Snackbar
          open={this.state.openDataSendSnackbar}
          autoHideDuration={5000}
          onClose={() => this.setState({ openDataSendSnackbar: false })}
        >
          <Alert
            onClose={() => this.setState({ openDataSendSnackbar: false })}
            severity="success"
          >
            Ihre Bilder wurden erfolgreich übertragen!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.openErrorSendSnackbar}
          autoHideDuration={5000}
          onClose={() => this.setState({ openErrorSendSnackbar: false })}
        >
          <Alert
            onClose={() => this.setState({ openErrorSendSnackbar: false })}
            severity="error"
          >
            Es gab einen Fehler bei der Übertragung ihrer Bilder! Versuchen Sie
            es später noch einmal.
          </Alert>
        </Snackbar>
        <DropzoneArea
          onChange={this.handleChange.bind(this)}
          filesLimit={12}
          dropzoneText="Laden Sie ihre Bilder hoch"
          acceptedFiles={[
            ".jpg",
            ".jpeg",
            ".png",
            ".heic",
            ".JPG",
            ".JPEG",
            ".PNG",
            ".HEIC",
          ]}
          maxFileSize={7000000}
        />
        {this.state.files.length > 0 ? (
          <>
            <ProgressBar value={this.state.progress} />
            <div className="buttonwrapper">
              <Button color="secondary" onClick={() => this.uploadFiles()}>
                Upload bestätigen
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
        <style jsx>{`
          .buttonwrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
          }
        `}</style>
      </>
    );
  }
}

export default DropzoneAreaExample;
