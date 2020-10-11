require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const workoutLog = require('./Controllers/workoutLogController');
const user = require('./Controllers/userController');

db.sync();

app.use(require('./Middleware/headers'));
app.use(express.json());
app.use('/user', user);
app.use('/log', workoutLog);

app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}`));
