const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient

require("dotenv").config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movie');
const eventsRouter = require('./routes/event');


const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const socket = require('./socket')(io);

async function init() {
    try {
        const options = {useNewUrlParser: true, useUnifiedTopology: true};
        await mongoose.connect(process.env.MONGODB_URI, options); 
        console.log("connected to the database!");   
    } catch (error) {
        console.error(error);
    }
}

init();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movie', moviesRouter);
app.use('/event', eventsRouter);

module.exports = app;
