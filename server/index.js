// ==== Required Dependencies ===================================
const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      https = require('https'),
      contactCtrl = require('./controllers/contactCtrl');

      // config = require('../config.js');

// const dbPassword = config.dbPassword;
const port = process.env.PORT || 3001;
// const conStr = `postgres://postgres:${dbPassword}@localhost/relictwo`;


// ==== Server Initialization ==================================
const app = module.exports = express();

app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.json());

// app.use(session({
//   secret: config.secret,
//   resave: false,
//   saveUninitialized: false
// }));


// === Database Setup ==========================================
// let massiveInstance = massive.connectSync({connectionString:conStr});
// app.set('db', massiveInstance);



// === Controllers =============================================
// const serverCtrl = require('./controllers/serverCtrl.js'),
//       reviewCtrl = require('./controllers/reviewCtrl.js'),
//       userCtrl = require('./controllers/userCtrl.js');


//=====  ENDPOINTS =======================================
app.post('/relic/contact', contactCtrl.contactRelic);

// === Listen ==================================================
app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});

