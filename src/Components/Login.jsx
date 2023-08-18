
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(false);

  const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.target;

    const formData = new FormData(form);
    formJson = Object.fromEntries(formData.entries());
  }

  return (
   <form onSubmit={handleSubmit}>
    <label for="userName">UserName</label>
    <input type="username" placeholder="username" id="username" name="username"/>

    <label for="password">Password</label>
    <input type="password" placeholder="**************" id="password" name="password"/>

    <button type="Submit">Submit</button>
    <button>do not have an account? register here</button>
   </form>
  
  )
}

export default Login