import { useState } from 'react';

const Register = () => { 
  const [formData, setFormData] = useState({ //initialize formData with empty strings for username and password
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async(event) => { //register user
    event.preventDefault(); 

    //check if the passwords match
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match. Please try again.");
      return;
    }

    try {
      //send a POST request to the server for user registration 
      const response = await fetch(`https://strangers-things.herokuapp.com/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        //if the registration is successful the server should respond with a JSON Web Token
        const data = await response.json();
        const jwtToken = data.token;
        console.log("Registration is successful, JWT:", jwtToken);
      } else {
        console.error("Registration failed:", response.status);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h3>Register:</h3>

      <label>
      Username:
      <input type="text" name="username" value={formData.username} onChange={handleChange}/>
    </label>

    <hr />

    <label>
      Password:
      <input type="password" name="password" value={formData.password} onChange={handleChange}/>
    </label>
    
    <label>
      Confirm Password:
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
    </label>

    <button type="submit">Register</button>
  </form>
  );
};

export default Register;