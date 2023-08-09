import COHORTNAME from "../API";
import { useState } from "react";

export default function PostForm () {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [location, setLocation] =useState("");

    const fetchPosts = async () => {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    author: author,
                    description: description,
                    location: location,
                    message: message,
                    price: price,
                    title: title,
                    willDeliver: "true",
                    active: "true",
                    createdAt: "post inserted into database",
                    updatedAt: "post updated",
                })
            })
            const result = await response.json();
            console.log(result);
            setTitle("");
            setDescription("");
            setPrice();
            setLocation("");
            return result
            // if (result.error) throw result.error;
        } catch (err) {
            console.error("Oops! Something went wrong. Try again!", err);
        }
    };

    return (
        <>
        <form>
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
                <select>
                    {/* need checkbox for willDeliver here */}
                </select>
            </div>

            <button className="create" type="submit">Create</button>
        </form>
        </>
    );
}