import '../App.css'

import { useState } from 'react';

function Auth() {

  const [ user, setUser ] = useState("");
  const [ pwd, setPassword ] = useState("");

  const handleClick = async() =>{
    let accessToken = '';
    const response = await fetch('http://localhost:8080/auth', {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user, pwd })
    })
    const data = await response.json();
   accessToken = data.accessToken;
   console.log({accessToken});

  }

  
  return (
    <div className="App">
      <form>
        <p>UserID</p>
        <input 
          type="text"
          value = {user}
          placeholder = "Enter your userID"
          onChange={ e => setUser(e.target.value)}
        />
        <p>Password</p>
        <input 
          type="password"
          value = {pwd}
          placeholder = "Enter your pwd"
          onChange={ e => setPassword(e.target.value)}
        /> 
      </form>
      <button type="button" onClick={handleClick}>
        submit
      </button>
    </div>
  );
}

export default Auth;

