import { Link } from "react-router-dom"


const Logo = () => {
  return (
    <Link to={'/'}>
    <img src="/logo.svg" className="w-full block" alt="Logotipo Devtree"/>
    
    </Link>
  )
}

export default Logo
