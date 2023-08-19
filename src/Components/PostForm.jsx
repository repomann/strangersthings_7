import COHORTNAME from "../API";
import { useState } from "react";

export default function PostForm () {
    const [title, setTitle] = useState(""); //initialize title with an empty string
    const [description, setDescription] = useState(""); //initialize description with an empty string
    const [price, setPrice] = useState(""); //initialize price with an empty string
    const [location, setLocation] = useState(""); //initialize location with an empty string
    const [checkbox, setCheckbox] = useState(false); //initialize checkbox with false, so that it starts unchecked

    const handleSubmit = async (e) => { //should this const be fetchPost
        e.preventDefault(); //request to this endpoint fetches an arrary of post objects
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenIsAuthor}`//not sure if the token is correct
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
            // return result
            //show a success message?
            // if (result.error) throw result.error;
        } catch (err) {
            console.error("Oops! Something went wrong. Try again!", err);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>Add a New Post</h2>
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
        </>
    );
}