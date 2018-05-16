const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv').config();

// const passport = require('./strategies/sql.localstrategy');
// const sessionConfig = require('./modules/session-middleware');

// Route includes
const pitchRouter = require('./routes/pitches.router');
// const urlRouter = require('./routes/url.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// // Passport Session Configuration
// app.use(sessionConfig);

// // Start up passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

/* Routes */
app.use('/', pitchRouter);
// app.use('/api/url', urlRouter);

// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
