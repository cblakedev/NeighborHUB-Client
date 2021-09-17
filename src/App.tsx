import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAuth from '../src/auth/UserAuth'

class App extends Component {  
  render() {
    return (
      <div className="App">
        <div>
          <UserAuth />
        </div>
      </div>
    );
  }

}

export default App;
