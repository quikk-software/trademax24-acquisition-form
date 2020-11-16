const MongoClient = require("mongodb").MongoClient;
require("dotenv").config;

export default async function getDataFromMongo(req, res) {
  const uri = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.2ccpq.mongodb.net/${process.env.MONGODB_DATABASENAME}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    switch (req.method) {
      case "GET":
        await client.connect(async function (err) {
          await client
            .db("requests")
            .collection("request")
            .find({ eventId: req.body.eventId })
            .toArray((err, items) => {
              if (err) throw err;
              res.send(items);
            });
        });
        break;
      case "POST":
        await client.connect(async function (err) {
          await client
            .db("requests")
            .collection("request")
            .insertOne(req.body.obj, function (err, res) {
              if (err) throw err;
            });
        });
        break;
      default:
        res.end();
        break;
    }
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  } finally {
    await client.close();
  }
}
