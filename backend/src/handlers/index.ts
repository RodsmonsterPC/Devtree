import User from "../models/User"
import slug from "slug"
import {validationResult} from "express-validator"
import {Request, Response} from "express"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"
import formidable from "formidable"
import cloudinary from "../config/cloudinary"
import { v4 as uuid } from "uuid"

export const createAccount = async (req: Request, res: Response)=>{

    //Manejar errores

    let errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return 
    }

    const {email, password} = req.body

    const userExists = await User.findOne({email})


    if(userExists){
        const error = new Error("Un usuario ya esta registrado con ese email")
         res.status(409).json({
            error : error.message
        })
        return
    }

    const handle = slug(req.body.handle, "")

    const handleExist = await User.findOne({handle})
    if(handleExist){
        const error = new Error("Nombre de usuario no disponible")
         res.status(409).json({
            error : error.message
        })
        return
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    console.log(user)
    await user.save()
    
    res.status(201).send("Registro Creado Correctamente")
}

export const login = async (req:Request, res: Response) =>{
     //Manejar errores

     let errors = validationResult(req)

     if(!errors.isEmpty()){
         res.status(400).json({errors: errors.array()})
         return 
     }

     const {email, password} = req.body

     //Revisar si el usuario existe

     const user = await User.findOne({email})   
     if(!user){
         const error = new Error("El Usuario no existe")
          res.status(404).json({
             error : error.message
         })
         return
        } 
     
        //Comprobar password

      const isPasswordCorrect = await checkPassword(password, user.password)

      if(!isPasswordCorrect){
        const error = new Error("Password incorrecto")
        res.status(401).json({error: error.message})
        return
      }


     const token = generateJWT({id: user._id})
      res.send(token)
}

export const getUser = async (req: Request, res: Response) =>{

        res.json(req.user)
  
}

export const UpdateProfile = async (req:Request, res: Response) =>{
    try {
     const {description, links} = req.body
     const handle = slug(req.body.handle, "")

    const handleExist = await User.findOne({handle})
    if(handleExist && handleExist.email !== req.user.email ){
        const error = new Error("Nombre de usuario no disponible")
         res.status(409).json({
            error : error.message
        })
        return
    }

    //Actualizar el usuario

    req.user.description = description
    req.user.handle = handle
    req.user.links = links
    await req.user.save()
    res.send("Perfil actualizando correctamente")

    } catch (e) {
        const error = new Error("Hubo un error")
        res.status(500).json({error: error.message})
        return
    }
}

export const uploadImage = async (req:Request, res: Response) =>{
    try {
        const form = formidable({multiples: false})
        form.parse(req, (error, fields, files) =>{
            

            cloudinary.uploader.upload(files.file[0].filepath, {public_id: uuid()}, async function (error, result) {
                if (error){
                    const error = new Error("Hubo un error al subir la imagen")
                    res.status(500).json({error: error.message})
                }

                if (result){
                   req.user.image = result.secure_url
                   await req.user.save()
                   res.json({image:result.secure_url})
                }
            } )
        })



    } catch (e) {
        const error = new Error("Hubo un error")
        res.status(500).json({error: error.message})
    }
}


export const getUserHandle = async (req:Request, res: Response) =>{
    try {
        
       const {handle} = req.params

       const user = await  User.findOne({handle}).select('-_id -__v -email -password')

       if(!user){
        const error = new Error('El Usuarui no existe')

         res.status(404).json({error: error.message})
         return
      
       }

       res.json(user)


    } catch (e) {
        const error = new Error("Hubo un error")
        res.status(500).json({error: error.message})
    }
}

export const SearchByHandle = async (req:Request, res: Response) =>{
    try {
        
       const {handle} = req.body

       const userExists = await User.findOne({handle})
       if(userExists){
        const error = new Error(`${handle} ya esta registrado`)
        res.status(409).json({error: error.message})
        return
       }

       res.send(`${handle} está disponible`)

    } catch (e) {
        const error = new Error("Hubo un error")
        res.status(500).json({error: error.message})
    }
}