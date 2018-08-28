const express = require('express');
const cors = require('cors');


const app = express();
const bodyParser = require('body-parser');


// Route includes
 const csvInputRouter = require('./routes/csvInput.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* Routes */
app.use('/', csvInputRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
