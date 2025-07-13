/**
 * Backend code for the EMA app
 * @author Sihao Zhao & Minh Le Tuan
 */

/**
 * express module
 * @constant
 */
const express = require("express");

/**
 * app instance
 * @constant
 */
const app = express();

/**
 *  Middleware for logging HTTP requests to the console
 * @constant
 * */
const morgan = require('morgan');
app.use(morgan('tiny'));

/**
 * Middleware for parsing incoming request bodies
 */
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());

/**
 * Set the port number for the Express app
 */
app.set('port', 8088);

/**
 * Set the view engine for rendering HTML templates
 */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/**
 *  Serve static assets for CSS and images
 */
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("public"));
app.use(express.static("images"));

/** 
 * required mongoose module
 * @requires mongoose
 * @const
 */
const mongoose = require("mongoose");

/**
 * Require the Event Module
 */
const Event = require('./models/event');

/**
 * Require the Operation Module
 */
const Operation = require('./models/operation');

/**
 * Require the Category Module
 */
const Category = require('./models/category');

const eventRoute = require('./routes/event-routes');
const eventAPIRoute = require('./routes/event-api');

const categoryRoute = require('./routes/category-routes');
const categoryAPIRoute = require('./routes/category-api');

/**
 * The URL for the MongoDB database to connect to.
 * @const {string}
 */
const url = "mongodb://127.0.0.1:27017/EMA";

/**
 * Connects to the MongoDB at the specified URL.
 * @async
 * @function
 * @param {string} url - The URL of the database to connect to.
 * @returns {string}a message indicating the database has connected successfully.
 */
async function connect(url) {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return `Connected Successfully to ${url}`;
}


/**
 * Connect to the database and initialize the operations counter if necessary.
 *
 * @param {string} url - The URL of the database to connect to.
 * @returns {Promise<void>} A promise that resolves when the database connection is established.
 */
connect(url)
  .then(async (res) => {
    console.log(res);
    const counter = await Operation.countDocuments({});
    if (counter === 0) {
      const defaultCounter = new Operation({});
      await defaultCounter.save();
    }
  })
  .catch((err) => console.log(err));

/**
 * Define routes/API routes for the Express application.
 */
app.use('/sihao', eventRoute);
app.use('/sihao', eventAPIRoute);
app.use('/', categoryRoute);
app.use('/api/v1/category/31239552', categoryAPIRoute);

/**
 * Handle the root route. If theres no Url parameter renders the home page.
 * @name get/
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
app.get('/', async function (req, res) {
  const noOfEvents = await Event.countDocuments();
  const noOfCategories = await Category.countDocuments();
  const counter = await Operation.findOne({});

  res.render('index',
    {
      noOfCategories,
      noOfEvents,
      insertCount: counter.insertCount,
      deleteCount: counter.deleteCount,
      updateCount: counter.updateCount
    }
  );
}

);

/**
 * Start the Express app and listen on the specified port
 * @name listen
 * @function 
 * @param {int} port - Express path
 * @param {function} callback - Express callback
 */
app.listen(app.get('port'));