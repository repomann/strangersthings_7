import { Link } from "react-router-dom"



function Navbar() {
  return (
    <>
    <Link to='/'>Home</Link>
    <Link to='/posts'>Posts</Link>
    <Link to='/login'>Login</Link>
    </>
  )
}

export default Navbar