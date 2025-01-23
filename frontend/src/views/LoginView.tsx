import { Link } from "react-router-dom"

const LoginView = () => {
  return (

    <>
    
    <div>
      <h1 className="text-6xl">Login views</h1>
    </div>

    <nav>
        <Link to="/auth/register">¿No tienes cuenta? Registrate aqui</Link>
    </nav>
    </>
  
  )
}

export default LoginView
