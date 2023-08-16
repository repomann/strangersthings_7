import COHORTNAME from "../API"
import { useEffect } from "react"
import { useState } from "react"
import MessagesForm from "./MessagesForm"

function Posts() {
    const [data, setData] = useState([])
    useEffect(()=>{
        const fetchPosts = async () => {
            try {
              const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`)
          
              const result = await response.json();
              setData(result.data.posts)
              console.log(result);
              return result
            } catch (err) {
              console.error(err);
            }
          }
          fetchPosts();
    },[])

  return (
    <>
    <div>
        <h1>Posts</h1>
        {data.map((post)=>(
            <div key={post.id} className="postsSection">
                <h2>{post.title}</h2>
                <h2>{post.author.username}</h2>
                <h2>{post.price}</h2>
                <h2>{post.location}</h2>
                <p>{post.description}</p>
                <MessagesForm/>
            </div>
        ))}
    </div>
    </>
  )
}

export default Posts