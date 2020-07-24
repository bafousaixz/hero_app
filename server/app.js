var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Mongoose  = require( 'mongoose');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users')


var app = express();
var cors=require('cors');

app.use(cors({origin:true,credentials: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// connect DB
var url = 'mongodb://localhost:27017/hero';
Mongoose.connect(url);

const UserModel = Mongoose.model("myhero", {
  id: String,
  name: String,
  phone: String,
  email: String,
  adress: String
});

app.get("/users", async (request, response) => {
  try {
    var result = await UserModel.find().exec();
    response.send(result);

  } catch (error) { 
    response.status(500).send(error);
  }
});

app.get("/users/:id", async (request, response) => {
  try {
    var user = await UserModel.findById(request.params.id).exec();
    response.send(user);

  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/users/:id", async (request, response) => {
  try {
    var user = await UserModel.findById(request.params.id).exec();
    user.set(request.body);
    var result = await user.save();
    response.send(result);

  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/users/:id", async (request, response) => {
  try {
    var result = await UserModel.deleteOne({ _id: request.params.id }).exec();
    response.send(result);

  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/users', async (req, res)=>{
  try{
    var user = new UserModel(req.body);
    console.log(req.body);
    var result = await user.save();
    res.send(result);

  } catch(error){
    res.status(500).send(error);
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
