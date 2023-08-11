import React from 'react';

export default function DeleteButton(/*post?*/) {
  const {post._id} = useParams();

  // from API information - below deletePost should delete determine if user is logged in, prior to allowing them to delete.
  const deletePost = async() => {
    try {
      const response = await fetch(`${BASE_URL}/posts/5e8d1bd48829fb0017d2233b`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN_STRING_HERE}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
  }


  return (
  
    // post will be defined once I can get the post component added into the top DeleteButton (post stuff goes here)
    // For each post, the delete handler will need a way to recover the post._id

    // is Author and the result seciont need to be corrected - looks like a syntax error becaues they are in the not defined in the sections needed.
    <div>
      <h2>{post._id}</h2>
      {isAuthor && <p>{result}</p>}
      {/* {error && <p>{error}</p>} */}
      <button onClick={()=> deletePost(post._id)}></button>
    </div>
  )
}}