import { useState } from 'react';
import { registerUser } from '../API'

const Register = () => {

  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    // makes sure your page does not refresh
    event.preventDefault();

    try {
      await registerUser(userName, password)
      
    } catch (error) {
      console.log(error);
      
    }
 }

  return ( 
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
          type="text" 
          placeholder="Enter your username"
          onChange={(event) => setuserName(event.target.value)}
          required
      
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input 
          type="text"  
          placeholder='************'
          onChange={(event) => setPassword(event.target.value)}
          required
           />
        </label>

        <button
        type='submit'
        >submit
          
        </button>

        {/* <label>
          Confirm Password:{" "}
          <input type="confirmpassword" name="confirmedpassword" value={'confirmedpassword'} />
        </label> */}

        </form>
    </div>
  )
}

export default Register