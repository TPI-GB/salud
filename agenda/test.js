const { MongoClient } = require("mongodb");
const Turno = require("../turnero-backend/model/turno-model");

async function main() {
  const uri =
    "mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    Turno.find({}, function (err, data) {
      if (err) return console.error(err);
      console.log(Turno);
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main();
