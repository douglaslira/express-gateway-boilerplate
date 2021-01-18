const express = require('express');
const app = express();

app.get('/message', (req, res, next) => {
  res.send({message: "An example of microservice - Message"});
});

app.listen(3002, () => {
  console.log('Server running on 3002');
});
