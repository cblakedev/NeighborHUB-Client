import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAuth from '../src/auth/UserAuth'
import AdminAuth from '../src/auth/AdminAuth'

type AppProp = {

}

type AppState = {
  sessionToken: string
}

class App extends Component<AppProp, AppState> { 
  constructor(props: AppProp){
    super(props)
    this.state = {
      sessionToken: '',
    }
    this.updateToken = this.updateToken.bind(this)
  }
  

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken
    });
  }

  render() {
    return (
      <div className="App">
          <UserAuth token={this.updateToken}/>
      </div>
    );
  }

}

export default App;
