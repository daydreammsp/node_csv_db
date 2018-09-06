const express = require('express');



const app = express();
const bodyParser = require('body-parser');


// Route includes
 const dbMainSearch = require('./routes/dbMainSearch.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* Routes */
app.use('/', dbMainSearch);


// Serve static files
app.use(express.static('public'));

// App Set //
const PORT = process.env.PORT || 5002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
