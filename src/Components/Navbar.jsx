import { Link } from "react-router-dom"



function Navbar() {
  return (
    <>
    <div className="navbar">
    <h2>Stranger Things</h2>
    <Link to='/'>Home</Link>
    <Link to='/posts'>Posts</Link>
    <Link to='/login'>Login</Link>
    </div>
    </>
  )
}

export default Navbar