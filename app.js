const express = require('express');

// Importamos la libreria express-oauth2-jwt-bearer
const { auth } = require("express-oauth2-jwt-bearer");

// Importamos el Middleware Error Handler
const errorHandler = require('./middleware/errorHandler');

// Configuracion Middleware con el Servidor de Autorización
const autenticacion = auth({
    audience: 'https://api.actividadclase6.com/api/libros',
    issuerBaseURL: 'https://dev-run172m6qa6lt7li.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require('./routes/libros');

// Configuramos el middleware de autenticación
app.use('/libros', autenticacion, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});