// *************** requerimos path *************** //
const path = require('path');

// *************** requerimos y guardamos express *************** //
const methodOverride = require('method-override');
const express = require('express');
const cors = require('cors');
const app = express();
const publicPath = path.resolve(__dirname, '../public');

//*************** requerimos express-session *************** //
const session = require('express-session'); 
const cookies = require("cookie-parser")
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware.js")

//*************** uso de session en la aplicacion global *************** //
app.use(session({
    secret:'secret!',
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
/* si el middleware tiene que ver algo con session o con algun paquete que se instalo previamente, debe ir despues de dicho paquete */
app.use(userLoggedMiddleware)

// ************ Middlewares - (don't touch) ************
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false })); // Para requerir del body
app.use(express.json()); 
app.use(methodOverride('_method'));
app.use(cors());

// *************** configuramos view engine *************** //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// *************** requerimos los enrutadores *************** //
let mainRouter = require('./routes/mainRouter.js');
let productsRouter = require('./routes/productsRouter.js');
let usersRouter = require('./routes/usersRouter.js');
let cartRouter = require('./routes/cartRouter.js');
let allProducts = require('./routes/allProductsRouter.js');
let usersApiRouter = require("./routes/API/userRouter.js")
let productsApiRouter = require("./routes/API/productsRouter.js")
/* let registerRouter = require('./routes/registerRouter.js'); */

// *************** rutas *************** //
app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/user', usersRouter);
app.use('/cart', cartRouter);
app.use('/allProducts', allProducts);
app.use("/api/user", usersApiRouter)
app.use("/api/product", productsApiRouter)
/* app.use('/register', registerRouter); */

// *************** ponemos a escuchar el servidor *************** //
app.listen(3060, () => console.log('El servidor esta corriendo en: http://localhost:3060'));