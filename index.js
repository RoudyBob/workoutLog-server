let express = require('express');
require('dotenv').config();
const app = express();
const sequelize = require('./db');

// import JSON support for Express
app.use(express.json());

// point to user and log controllers
const user = require('./controllers/user-controller');
const log = require('./controllers/log-controller');

sequelize.sync();

// header configuration for client requests
app.use(require('./middleware/headers'));

// User endpoint controller
app.use('/user', user);

// Log endpoint controller
app.use('/log', log);

app.listen(3000, function() {
    console.log("App is listening on port 3000");
})
