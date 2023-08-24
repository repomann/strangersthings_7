import  { useState, useEffect } from "react";
import { COHORTNAME } from "../API";
import MessagesForm from "./MessagesForm";
import PostForm from "./PostForm";

function Posts() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`
        );

        const result = await response.json();
        setData(result.data.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  // Filtering the posts based on the search query
  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Posts</h1>
        {/* Search bar */}
        <div>
          <PostForm />
        </div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredData.map((post) => (
          <div key={post.id} className="postsSection">
            <h2>{post.title}</h2>
            <h2>{post.author.username}</h2>
            <h2>{post.price}</h2>
            <h2>{post.location}</h2>
            <p>{post.description}</p>
            <MessagesForm />
          </div>
        ))}
      </div>
    </>
  );
}

export default Posts;
