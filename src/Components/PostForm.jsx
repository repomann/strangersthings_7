import COHORTNAME from "../API";
import { useState } from "react";

export default function PostForm () {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] =useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    // "Authorization": `Bearer ${token}` //need to fix this Authorization code
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: true,
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

            //clear the form inputs after successful submission
            setTitle("");
            setDescription("");
            setPrice();
            setLocation("");
            // return result
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
                {/* <label>Willing to Deliver?:{""}
                    <input type="checkbox" checked={true} onChange={(e) => {handle the checkbox change here</label>}}>
                    </input>
                </label> */}
            </div>

            <button className="create" type="submit">Create</button>
        </form>
        </>
    );
}