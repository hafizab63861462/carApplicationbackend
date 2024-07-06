var express = require("express")
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoDb = require("./plugins/mongoConnection").MongoDb;


async function initServer() {
  const app = express()


  app.use(
    cors(),
    bodyParser.json(),
  );


  app.use((req, res) => {
    res.send("Server start successfully")
  })

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () => {
    console.log(`Node js server is running on PORT ${PORT}`)
  })
}


initServer()