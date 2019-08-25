const express = require('express');
const app = express();
const router = require('./routes/index');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(router);
// app.get('/',(req, res)=>{
//   res.sendfile('index.html');
// });

app.listen(80, '0.0.0.0');
console.log('Bible app running...');

// module.exports = app;