import React from 'react';
import './styles/App.css';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Node MySQL Docker App</h1>
      </header>
      <main>
        <UserList />
      </main>
      <footer>
        <p>Simple web application with React, Node.js, and MySQL</p>
      </footer>
    </div>
  );
}

export default App;