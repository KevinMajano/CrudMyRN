const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//INITIALIZATIONS
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//SETINGS
app.set('port', process.env.PORT || 3001);

//ROUTES
const peliculas = require('./routers/peliculas');
app.use('/peliculas',peliculas);


// STARTING
app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
  });