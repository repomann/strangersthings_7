import {useState} from "react";
import { useEffect } from "react";
import Login from "./Login.jsx"


// Assuming Login function will be what I need here... other option is TOKEN_STRING_HERE

function Home(Login) {

// API sample GET call for users logged in information
  const [data, setData] = useState([])
  const [error, setError]= useState(null);
  // const isAuthor = TOKEN_STRING_HERE // not sure what to do with isAuthor... I know this is wrong.

  useEffect(() => {   
  async function fetchUserData () {

    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN_STRING_HERE}`
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
}, []);


  return (
    
    <div>
      {error && <p>{error} Youre not signed in. No messages available</p>}
      {/* {isAuthor && <p>{data}</p>} */}
        {data.map((me)=>(
          <div key={me._id} className="homeProfile">
            <h2>Welcome {me.username}</h2>
            <h2>Your Posts</h2>
            <p>{me.posts}</p>
            <h2>Your Messages</h2>
            <p>{me.messages}</p>
          </div>
        ))}
      
      </div>
  )
}

export default Home