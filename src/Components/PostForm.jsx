import { COHORTNAME } from "../API";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostForm () {
    const [title, setTitle] = useState(""); //initialize title with an empty string
    const [description, setDescription] = useState(""); //initialize description with an empty string
    const [seller, setSeller] = useState(""); //initialize seller with an empty string
    const [price, setPrice] = useState(""); //initialize price with an empty string
    const [location, setLocation] = useState(""); //initialize location with an empty string
    const [checkbox, setCheckbox] = useState(false); //initialize checkbox with false, so that it starts unchecked
    const [successMessage, setSuccessMessage] = useState(""); //initialize successMessage with an empty string
    const [errorMessage, setErrorMessage] = useState(""); //initialize errorMessage with an empty string
    const [posts, setPosts] = useState([]); //initialize posts with an empty array
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`);
            const result = await response.json();
            if (result.success) {
                setPosts(result.data.posts);
            } else {
                console.error("Oops! Something went wrong while fetching posts.");
            }
        } catch (err) {
            console.error("Oops! Something went wrong while fetching posts.", err);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => { 
        e.preventDefault(); //request to this endpoint fetches an arrary of post objects
        try {
            if (!isLoggedIn) { //if the user is not logged in, show a message to prevent the form submission
                setErrorMessage("Please log in to create a post.");
                return;
            }

            const token = localStorage.getItem("token")
            console.log(token)
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    post:{
                    title: title,
                    description: description,
                    seller: seller,
                    price: price,
                    location: location,
                    willDeliver: checkbox,
                }}),
            });
            const result = await response.json();
            console.log(result);
            navigate("/posts")

            if (result.success) { //show a success message to the user
                setSuccessMessage("Listing created successfully!");
                fetchPosts(); //fetch updated posts after creating a new post
            } else { //handle errors returned by the API
                console.error("Oops! Something went wrong on the server.");
            }
            if (result.error) throw result.error; //display error message to the user if needed

            //check if the requesting token is the author
            if (result.data.tokenIsAuthor) {
                console.log("User is the author");
            }
                        
            //check if there are messages for the posted item
            if (Array.isArray(result.data.message) && result.data.message.length > 0) {
                console.log("Messages exists:", result.data.message);
            } else {
                console.log("No messages for this item");
            }
            
            //clear the form inputs and reset checkbox after successful submission
            setTitle("");
            setDescription("");
            setSeller("");
            setPrice("");
            setLocation("");
            setCheckbox(false);
        } catch (err) {
            console.error("Oops! Something went wrong. Try again!", err);
            setErrorMessage("Oops! Something went wrong."); //set errorMessage state variable when an error occurs
        }


    };

    const handleDelete = async (postId) => {
        try {
            if (!isLoggedIn) {
                setErrorMessage("Please log in to delete a post.");
                return;
            }

            const token = localStorage.getItem("tokenIsAuthor");
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            
            const result = await response.json();
            if (result.success) {
                setSuccessMessage("Listing deleted successfully!");
                fetchPosts(); //fetch updated posts after deleting a post
            } else {
                console.error("Oops! Something went wrong on the server.");
            }
            if (result.error) throw result.error;
            
        } catch (err) {
            console.error("Oops! Something went wrong. Try again!", err);
            setErrorMessage("Oops! Something went wrong.");
        }
    };

    return (
        <>
            <h2>Add a New Post</h2>
            {isLoggedIn ? ( //added ternary statement so that only logged in users can make a post
                <form onSubmit={handleSubmit}>
                    <label>Title: {""}
                        <input value={title} onChange={(e) => {setTitle(e.target.value);
                        }}>
                        </input>
                    </label>
    
                    <label>Descripton: {""}
                        <input value={description} onChange={(e) => {setDescription(e.target.value);
                        }}>
                        </input>
                    </label>
                    
                    <label>Seller: {""}
                        <input value={seller} onChange={(e) => {setSeller(e.target.value);
                        }}>
                        </input>
                    </label>
    
                    <label>Price: {""}
                        <input value={price} onChange={(e) => {setPrice(e.target.value);
                        }}>
                        </input>
                    </label>
    
                    <label>Location: {""}
                        <input value={location} onChange={(e) => {setLocation(e.target.value);
                        }}>
                        </input>
                    </label>
        
                    <div>
                        <label>Willing to Deliver?: 
                            <input type="checkbox" value={checkbox} checked={checkbox} onChange={() => setCheckbox(!checkbox)}>
                            </input>
                        </label>
                    </div>
        
                    <button className="create" type="submit">Create</button>
                    
                    {/* //display success message */}
                    {successMessage && <div className="success">{successMessage}</div>} 
                    {/* //display error message */}
                    {errorMessage && <div className="error">{errorMessage}</div>}
                </form>
            ) : (
                <p> Are you looking to make a post? Please, login.</p>
            )}

            {posts.map((post) => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    {isLoggedIn && post.author._id === localStorage.getItem("userId") && (
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    )}
                </div>
            ))}
        </>
    );
};

