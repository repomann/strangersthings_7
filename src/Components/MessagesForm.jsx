import { useParams } from "react-router-dom";
import COHORTNAME from "../API";

function MessagesForm() {
    let { POST_ID } = useParams()
    const postMessage = async () => {
        try {
          const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts/${POST_ID}/messages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              // token comes from sign up , log in 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              message: {
                content: ""
              }
            })
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }
  return (
    <form onSubmit={postMessage}>
    <input type="text" placeholder="Type Message"></input><br/>
    <button onClick={postMessage}>Send Message</button>
    </form>
  )
}

export default MessagesForm