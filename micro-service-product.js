const express = require('express');
const app = express();

app.get('/product', (req, res, next) => {
  res.send({message: "An example of microservice - Product"});
});

app.listen(3001, () => {
  console.log('Server running on 3001');
});
