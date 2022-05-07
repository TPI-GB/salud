import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function GeneradorAgenda() {
  try {
    await client.connect();
    const database = client.db("turnerodb");
    const turnos = database.collection("Turnos");
    const query = {};
    const options = {};
    const cursor = turnos.find(query, options);
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}

GeneradorAgenda().catch(console.dir);

// async function initApp(appConfig, dbConfig) {
//   try {
//     console.log(dbConfig);
//     await connectDb(dbConfig);
//     console.log(`listen on ${appConfig.port}`);
//   } catch (e) {
//     console.error(e);
//     process.exit(0);
//   }
// }
