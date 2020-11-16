const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config;

export default async (req, res) => {
  const uri = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.2ccpq.mongodb.net/${process.env.MONGODB_DATABASENAME}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { requestId } = req.query;
  console.log(requestId);
  try {
    switch (req.method) {
      case "GET":
        break;
      case "PUT":
        break;
      case "DELETE":
        await client.connect(async function (err) {
          await client
            .db("requests")
            .collection("request")
            .deleteOne({ _id: parseInt(requestId) }, function (err) {
              if (err) throw err;
              console.log(`ID ${requestId} was deleted successfully!`);
            });
        });
        break;
      default:
        res.end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  } finally {
    res.end();
    await client.close();
  }
};
