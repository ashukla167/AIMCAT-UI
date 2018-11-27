const express = require('express');
const compression = require('compression')
const app = express();

app.use(compression())
app.use(express.static('assets'));
app.listen(process.env.PORT || 9000, () => {
  console.log(`Listening on port ${process.env.PORT || 9000}`);
})