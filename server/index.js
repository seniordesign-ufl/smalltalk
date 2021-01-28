const express = require('express');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const mysql = require("mysql");
const fs = require('fs');
const connection = mysql.createConnection({
      host : '35.196.27.6',
      ssl: {
        ca: fs.readFileSync('server/server-ca.pem'),
        key: fs.readFileSync('server/client-key.pem'),
        cert: fs.readFileSync('server/client-cert.pem'),
      },
      user : 'smoll-talk',
      password : 'Pbeq0hcDejpO12cN',
      database : 'smol_talk',
});

connection.connect();

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react/build', 'index.html'));
    connection.query('INSERT INTO users (name, groupID) VALUES (John, test)', function (error, results, fields) {
        if (error) throw error;
        console.log("Added to database");
    });
});

app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
});