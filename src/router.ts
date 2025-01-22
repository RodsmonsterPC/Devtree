import {Router} from "express"
import  {createAccount}  from "./handlers/index"

const router = Router()

//Autenticación y Registro

router.post("/auth/register", createAccount)

export default router