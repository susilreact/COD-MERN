const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { readdirSync } = require('fs');
const app = express();
//const authRoutes = require('./routes/auth');


//database connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('DB CONNECTED'))
    //.catch((err) => console.log('DB CONNECTION ERR', err));

    //Middleware 

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

//My Routes
    readdirSync('./routes').map((r) =>
        app.use('/api', require('./routes/' + r))
    );

   // app.use('/api',authRoutes)


//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
