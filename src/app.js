// ************ Require's ************
const createError = require('http-errors');
const cookie = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const app = express();
const session = require('express-session');
const userLoggedAPP = require(path.join(__dirname, './middlewares/auths/userLoggedAPP'));
const PORT = 3000;

// ************ Middlewares - ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookie());
app.use(session({
  secret: 'Mensaje secreto',
  resave: false,
  saveUninitialized: false
}));
app.use(userLoggedAPP); //Middleware del usuario logueado
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
//---------------------------------------------------------------------------------------------------------------------------

app.set ("view engine", "ejs");
app.set ("views", path.join(__dirname, "views"));

// ************ Route System require and use() ************
const mainRouter = require("./routes/mainRoutes");
const authRouter = require("./routes/authRoutes");
const productsRouter = require("./routes/productsRoutes");

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);

// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en ' + PORT);
});

// ************ exports app ************
module.exports = app;