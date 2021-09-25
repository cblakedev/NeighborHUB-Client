import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAuth from '../src/auth/UserAuth'
import AdminAuth from '../src/auth/AdminAuth'
import Home from '../src/home/Home'

type AppProp = {

}

type AppState = {
  sessionToken: string | null
}

export interface UserType {
  id: number
  Email: string 
  Password: string
  FirstName: string
  LastName: string
  UnitNumber?: string
  Role: string
  createdAt: string
  updatedAt: string
}

class App extends Component<AppProp, AppState> {
  constructor(props: AppProp) {
    super(props)
    this.state = {
      sessionToken: '',
    }
    this.updateToken = this.updateToken.bind(this)
    this.clearToken = this.clearToken.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        sessionToken: localStorage.getItem('token')
      })
    }
  }

  clearToken = (): void => {
    localStorage.clear()
    this.setState({ sessionToken: '' })
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken,
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.sessionToken === localStorage.getItem('token') ? <Home token={this.state.sessionToken} clearToken={this.clearToken} /> : <UserAuth updateToken={this.updateToken} />}
      </div>
    );
  }

}

export default App;
