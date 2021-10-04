import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../src/auth/Auth'
import Home from '../src/home/Home'
import WebFont from 'webfontloader'
import { Spinner } from 'react-bootstrap'

type AppProp = {

}

type AppState = {
  sessionToken: string | null
  userRole: string | null
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
      userRole: ''

    }
    this.updateToken = this.updateToken.bind(this)
    this.clearToken = this.clearToken.bind(this)
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Poppins', 'Lato']
      }
    });

    if (localStorage.getItem('token') && localStorage.getItem('role')) {
      this.setState({
        sessionToken: localStorage.getItem('token'),
        userRole: localStorage.getItem('role')
      })      
    }
  }

  clearToken = (): void => {
    localStorage.clear()
    this.setState({
      sessionToken: '',
      userRole: ''
    })
  }

  updateToken = (newToken: string, newRole: string): void => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole)
    this.setState({
      sessionToken: newToken,
      userRole: newRole
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.sessionToken === localStorage.getItem('token') ? <Home token={this.state.sessionToken} role={this.state.userRole} clearToken={this.clearToken} /> : <Auth updateToken={this.updateToken}/>}
      </div>
    );
  }

}

export default App;
