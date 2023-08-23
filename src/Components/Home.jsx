import {useState} from "react";
import { useEffect } from "react";
import Login from "./Login.jsx"
import { BASE_URL } from "../API/index.js";
import { Navigate } from "react-router";


// Test Data
// const mockUser = {
//   _id: 1, 
//   username: "Rebekah", 
//   posts: "this is a test Post", 
//   messages: "Hi!!!!"
// };


function Home(Login) {

  const [data, setData] = useState([])
  const [error, setError]= useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!! localStorage.getItem("token"));
  // const [isLoggedIn, setIsLoggedIn] = useState(false);  // Testing data
  
  useEffect(() => {   
  async function fetchUserData () {

    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      setData(result.data.me)
      console.log(result);
      return result
    } catch (error) {
      setError(error);
    }
  }

  fetchUserData();
}, [])



useEffect(() => {
  console.log(data);
}, [isLoggedIn, data])

return(
  <div>
      { isLoggedIn ? (
          <div>
              {data.map((me) => {
                return( 
                  <div key={me._id} className="homeProfile">
                  <h2>Welcome {me.username}</h2>
                  <h2>Your Posts</h2>
                  <p>{me.posts}</p>
                  <h2>Your Messages</h2>
                  <p>{me.messages}</p>
              </div> 
                )

              })}
          </div>
      )
          :
      (
          <div>
              <h1>Please login to access your posts and messages, or regiser to create an account.</h1>
              {/* <button onClick={()=>setIsLoggedIn(true)}>Login</button> TEST BUTTON */}
              
              <button onClick={()=> Navigate('/login')}>Login</button>

              <div>
              <button onClick={()=> Navigate('/register')}>Register</button>
              </div>
          </div>
      )
  }
  </div>
)}


export default Home