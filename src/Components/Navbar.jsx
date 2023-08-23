import { Link } from "react-router-dom"



function Navbar({setToken}) {
  const handleClick = () => {
    localStorage.removeItem('token')
    setToken('')
  }
  return (
    <>
    <div className="navbar">
    <h2>Stranger Things</h2>
    <Link to='/'>Home</Link>
    <Link to='/posts'>Posts</Link>
   
    {localStorage.getItem('token')? <button onClick={handleClick}>Logout</button> : <Link to='/login'>Login</Link> }
    </div>
    </>
  )
}

export default Navbar