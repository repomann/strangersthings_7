import { useState } from 'react';
import { login } from '../API';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn, token, setToken}) => {
  const navigate = useNavigate();

  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
  try {
    const response =  await login(userName, password) 
    if (response.success) {
      setIsLoggedIn(true)
      setToken(response.data.token)
      console.log(response)
      localStorage.setItem('token', response.data.token)
      navigate('/posts')
    }

  } catch (error) {
    console.log(error);
  }
}

  return (
   <div>
    <h2>Login</h2>
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
      Password:{" "}
      <input
      type="text"
      placeholder='*************'
      onChange={(event) => setPassword(event.target.value)}
      required
       />

      <button
      type='submit'
      >submit
        
      </button>
    </form>
   </div>
  )
}

export default Login