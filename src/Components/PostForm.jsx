import COHORTNAME from "../API";
import { useState } from "react";

export default function PostForm () {

    const fetchPosts = async () => {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORTNAME}/posts`)
            const result = await response.json();
            console.log(result);
            return result
        } catch (err) {
            console.error("Oops! Try again!");
        }
    }

    return (
        <>
        </>
    );
}