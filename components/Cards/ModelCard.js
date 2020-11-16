import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@material-ui/core";

export default function ImgMediaCard({ image, name, id, reflink }) {
  return (
    <div className="modelcard">
      <Card>
        <CardActionArea href={`/form?id=${id}`}>
          <CardMedia
            component="img"
            alt={id}
            height="200"
            image={image}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Verkaufen Sie Ihr {name}-Gerät und erhalten Sie Ihr Geld schon per
              Vorkasse via PayPal
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className="cardaction">
            <Button href={reflink} target="_blank" size="small" color="secondary">
              Artikel kaufen
            </Button>
            <Button href={`/form?id=${id}`} size="medium" color="primary">
              Jetzt verkaufen
            </Button>
          </div>
        </CardActions>
      </Card>
      <style jsx>{`
        .modelcard {
          max-width: 345px;
          margin: 1em;
          justify-content: center;
        }

        .cardaction {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
