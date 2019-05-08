const express = require("express");
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send();
})
   
const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
