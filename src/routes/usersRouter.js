// *************** Require Express and safe Router *************** //
const express = require('express');
const router = express.Router();

// *************** Require Path *************** //
const path = require('path');

// *************** Require Multer *************** //
const multer = require('multer');

// *************** Require Body from Express-Validator *************** //
const { body } = require('express-validator');

// *************** Validations Config *************** //
const validations = [
    body('name')
        .notEmpty().withMessage('Tienes que ingresar tu nombre'),
    body('lastName')
        .notEmpty().withMessage('Tienes que ingresar tu apellido'),
    body('email')
        .notEmpty().withMessage('Tienes que ingresar un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un correo valido'),
    body('password')
        .notEmpty().withMessage('Tienes que ingresar una contraseña'),
    body('avatar')
        .custom((value, { req }) => {
            let acceptedExtensions = ['.jpeg', '.jpg', '.png', '.gif'];
            
            let file = req.file;

            if(file){
                let fileExtensions = path.extname(file.originalname).toLowerCase();
                if (!acceptedExtensions.includes(fileExtensions))
                    throw new Error(`Los tipo de imagenes permitidas son ${acceptedExtensions.join(', ')}`);
            } 
                
            

           
            return true;
        })
]

// *************** Multer Config *************** //
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, './public/img/avatars')
    },

    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb (null, fileName);
    }
})

const uploadFile = multer ({ storage });

const guestMiddleware = require("../middlewares/guestMiddleware.js")
const authMiddleware = require("../middlewares/authMiddleware.js")

// *************** Require User Controller *************** //
const userController = require('../controllers/usersController.js')

// *************** User Routes *************** //
router.get('/login',guestMiddleware, userController.viewLogin)
router.post('/login', userController.userLogin)
router.get('/register', guestMiddleware, userController.viewRegister)
router.post('/register', uploadFile.single('avatar'), validations, userController.userCreate)
router.get('/profile',authMiddleware, userController.profile)
router.get('/logout', userController.logout)
router.get('/editProfile',authMiddleware, userController.userEdit)
/* no se estaba trayendo nada del body, porque no se habia llamado a multer, asi que hay que tener cuidado con eso */
router.post('/editProfile/:id',authMiddleware,uploadFile.single('avatar'), userController.userEditProcces)

// *************** Export Router *************** //
module.exports = router;