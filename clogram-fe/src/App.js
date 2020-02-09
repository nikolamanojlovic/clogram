import React from 'react';
import './App.css';
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state => state.user);

  return (
    <div className="App">
      {user ? <p>filled</p> : <p>empty</p>}
    </div>
  );
}

export default App;
