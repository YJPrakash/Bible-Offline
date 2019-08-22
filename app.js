const express = require('express');
const app = express();

app.use(express.static(__dirname));

// app.get('/',(req, res)=>{
//   res.sendfile('index.html');
// });

// app.listen(80, '0.0.0.0');
// console.log('Bible app running...');

module.exports = app;