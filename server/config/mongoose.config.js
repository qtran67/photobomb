const mongoose = require('mongoose');
const dbName = "photobomb-db";

mongoose
    .connect(`mongodb://localhost/${dbName}`)
    .then(() => console.log(`Established a connection to the ${dbName} database`))
    .catch(err => console.log("Something went wrong when connecting to the database", err));

