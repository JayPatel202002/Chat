import './App.css'
import { useState } from 'react';

function App() {

  const [ user, setUser ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleClick = () =>{
    console.log(`${user} ${password}`);  
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
          value = {password}
          placeholder = "Enter your password"
          onChange={ e => setPassword(e.target.value)}
        /> 
      </form>
      <button type="button" onClick={handleClick}>
        submit
      </button>
    </div>
  );
}

export default App;

