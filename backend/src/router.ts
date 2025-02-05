import {Router} from "express"
import {body} from "express-validator"
import  {createAccount, getUser, login, UpdateProfile, uploadImage}  from "./handlers/index"
import { handleInputErrors } from "./middleware/validation"
import { authenticate } from "./middleware/auth"

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

router.get("/user", authenticate, getUser)
router.patch("/user", 
    body("handle")
    .notEmpty()
    .withMessage("El handle no puede ir vacio"),
    body("description")
    .notEmpty()
    .withMessage("La descripción no puede ir vacia"),
    handleInputErrors,
    authenticate, 
    UpdateProfile)


    router.post("/user/image", authenticate, uploadImage)

export default router