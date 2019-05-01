const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://clenio:144407@cluster0-qwjnt.mongodb.net/cleniobox?retryWrites=true', {
  useNewUrlParser: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));


app.listen(3000, ()  => {
    console.log('Example app listening on port 3000!');
  });