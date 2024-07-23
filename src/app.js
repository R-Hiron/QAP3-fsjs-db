const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const userRoutes = require('./routes/index');

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000 - http://localhost:3000/users');
});
