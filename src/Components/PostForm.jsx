import COHORTNAME from "../API";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostForm () {
    const [title, setTitle] = useState(""); //initialize title with an empty string
    const [description, setDescription] = useState(""); //initialize description with an empty string
    const [price, setPrice] = useState(""); //initialize price with an empty string
    const [location, setLocation] = useState(""); //initialize location with an empty string
    const [checkbox, setCheckbox] = useState(false); //initialize checkbox with false, so that it starts unchecked
    const [successMessage, setSuccessMessage] = useState(""); //initialize successMessage with an empty string
    const [errorMessage, setErrorMessage] = useState(""); //initialize errorMessage with an empty string
    const [seller, setSeller] = useState(""); //initialize seller with an empty string
 
    const navigate = useNavigate();

    const handleSubmit = async (e) => { //should this const be fetchPost
        e.preventDefault(); //request to this endpoint fetches an arrary of post objects
        try {
            if (!isLoggedIn) { //if the user is not logged in, show a message and prevent the form from submitting
                setErrorMessage("Please login to create a post.");
                return;
            }
            const token = localStorage.getItem("tokenIsAuthor")
            console.log(token)
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: checkbox,
                }),
            });
            const result = await response.json();
            console.log(result);
            if (result.success) { //show a success message to the user
                setSuccessMessage("Listing created successfully!");
                navigate("/posts");
            } else { //handle errors returned by the API
                console.error("Oops! Something went wrong on the server.");
            }
            if (result.error) throw result.error; //display error message to the user if needed
        } catch (err) {
            console.error("Oops! Something went wrong. Try again!", err);
            setErrorMessage("Oops! Something went wrong."); //set errorMessage state variable when an error occurs
        }
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
            setPrice("");
            setLocation("");
            setCheckbox(false);
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
            </form>
        ) : (
            <p> Are you looking to make a post? Please, login.</p>
        )}
        {posts.map((post) => ( //check if the logged in user's id matches the author's id of each post and if they match render a delete button
            <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                {isLoggedIn && post.author._id === localStorage.getItem("userId") && (
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                )}
            </div>
        ))}
        {/* //display success message */}
        {successMessage && <div className="success">{successMessage}</div>}
        {/* //display error message */}
        {errorMessage && <div className="error">{errorMessage}</div>}
    </>
);
};
