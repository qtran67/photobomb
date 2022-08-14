const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const busboy = require('connect-busboy');

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload({
    limits: {fileSize:50*1024*1024},
    abortOnLimit: true,
}));
app.use(busboy());

app.post('/uploadFile', async (req, res) => {
    console.log(req.files.file)
    await req.files.file.mv(`${__dirname}/images/${req.files.file.name}`)
    res.send('Uploaded')
    })

require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/photo.routes')(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );
