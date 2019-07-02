const express = require('express');
const multer  = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
const AuthController = require('./controllers/AuthController');


//box
routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.get("/boxes", BoxController.showAllBoxes);
//file
routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);
//auth
routes.post("/auth/register", AuthController.register);



module.exports = routes;