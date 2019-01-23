//Require Server stuff
const express = require('express');
const path = require('path');

const app = express(); //Create the Express app
const port = process.env.PORT || 3005; //Set the port

//Forward the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

//Set the listening port even if DB connection is unsuccessful
app.listen(port, () => console.log(`[server] Listening on port ${port}`));

module.exports = app;
