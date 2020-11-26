'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');

const port = process.env.PORT || 5000
app.listen(port, () => {
    log(`Listening on port ${port}...`)
})

app.use(express.static(path.join(__dirname, '/pub')))


// app.get('/', function (req, res) {
//     res.send("hello world")
// }).listen(port)


// // another approach
// app.set('views', '.');
// app.engine('html', engines.mustache);
// app.set('view engine', 'html');

// // app.get('/', function (req, res) {
// //     res.render('./example.html');
// // });

// app.get('/', function (req, res) {
//     res.sendFile(path.resolve('./example.html'));
// });
