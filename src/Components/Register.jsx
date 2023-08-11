import { useState } from 'react';
const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = new formData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson)
  }
  return <form method="post" onSubmit={handleSubmit}>
    <h3>Register:</h3>

    <label>
      Username:
      <input Name="username" defaultValue={""} />
    </label>

    <hr />

    <label>
      Password:{" "}
      <input type="password" name="mypassword" value={'known password'} />
    </label>
    
    <label>
      Confirm Password:{" "}
      <input type="confirmpassword" name="confirmedpassword" value={'confirmedpassword'} />
    </label>


  </form>
 
}

export default Register