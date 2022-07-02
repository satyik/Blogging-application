const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const index = require('./routes/index');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://satyik:spykar1234@cluster0.ieihysh.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log(`Connected to mongoDb`))
  .catch((err) => console.log(err));


//app.use('/', indexRouter);
app.get('*', checkUser);

app.get('/',index);
app.use('/article', requireAuth, articleRoutes);
app.use('/user', requireAuth,userRoutes);
app.use(authRoutes);


app.listen(5000, function () {
  console.log('app listening at http://localhost:5000')
});

module.exports = app;




