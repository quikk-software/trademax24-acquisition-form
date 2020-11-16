import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 8,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 8,
  },
});

const DeviceCard = ({ device }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {device.model}
          </Typography>
          {device.size.map((size, i) => {
            if (device.size[0] !== "none") {
              return (
                <Typography
                  key={i}
                  className={classes.pos}
                  color="textSecondary"
                >
                  {size}
                </Typography>
              );
            }
          })}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DeviceCard;
