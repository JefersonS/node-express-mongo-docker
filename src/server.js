import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors';
import expressLayouts from 'express-ejs-layouts';
import router from './mainRouter';
import {debug} from './common/utils.js';

// Start Express
const app = express();

// Set up MongoDB
const mongoDB = 'mongodb://mongo:27017/testDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('connected', () => debug('MongoDB connected to:' + mongoDB));
db.on('error', (err) => debug(console, 'MongoDB connection error:'));

// Setting view engine
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '../public'))

// Body parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Setting cors
app.use(cors());
app.options('*', cors());

// Import all routes
app.use('/', router);

// Starts server
const PORT = process.env.PORT || 3000;
try {
  app.listen(PORT, () => {
    debug(`App listening on ${PORT}`);
  })
} catch (error) {
  debug(`Something went wrong when trying to listen to port ${PORT}: ${error}`);
}