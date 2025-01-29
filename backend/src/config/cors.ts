import { CorsOptions } from "cors";
console.log()
export const corsConfig : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
           callback(null, true)
        }else{
            callback(new Error("Error de Cors"))
        }
    }
}