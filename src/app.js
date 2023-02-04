// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

const app = express();

// ************ Middlewares - ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
//---------------------------------------------------------------------------------------------------------------------------

app.set ("view engine", "ejs");
app.set ("views", path.join(__dirname, "views"));

const PORT = 3000;

// ************ Route System require and use() ************
const mainRouter = require("./routes/mainRoutes");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/products");

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);


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