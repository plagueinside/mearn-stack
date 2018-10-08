const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const itemRoutes = require('./routes/api/items');
const userRoutes = require('./routes/api/users');

const app = express();

app.use(bodyParser.json());

const db = require('./config/config').mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server running on port ${port}`));