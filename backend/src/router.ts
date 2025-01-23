import {Router} from "express"
import {body} from "express-validator"
import  {createAccount, login}  from "./handlers/index"
import { handleInputErrors } from "./middleware/validation"

const router = Router()

//Autenticación y Registro

router.post("/auth/register", 
    body("handle")
    .notEmpty()
    .withMessage("El handle no puede ir vacio"),
    body("name")
    .notEmpty()
    .withMessage("El nombre no puede ir vacio"),
    body("email")
    .isEmail()
    .withMessage("Email no valido"), 
    body("password")
    .isLength({min:8})
    .withMessage("El Password es muy corto minimo 8 caracteres"),
    handleInputErrors,
    createAccount)

router.post("/auth/login", 
            body("email")
            .isEmail()
            .withMessage("Email no valido"), 
            body("password")
            .notEmpty()
            .withMessage("El Password es obligatorio"),
            handleInputErrors,
            login )

export default router