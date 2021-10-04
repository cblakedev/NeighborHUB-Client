import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminAuth from './AdminAuth';
import UserAuth from './UserAuth';

type AuthProps = {
    updateToken: (newToken: string, role: string) => void
}

type AuthState = {

}

class Auth extends Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <Container>
                <Router>
                    <Row className='authBtnRow'>
                        <Col className='authBtnCol'>
                            <Button className='userBtn'><Link to='/'>Tenant Login</Link></Button>
                            <Button className='adminBtn'><Link to='/tickets'>Admin Login</Link></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Switch>
                            <Route exact path='/'><UserAuth updateToken={this.props.updateToken} /></Route>
                            <Route exact path='/tickets'><AdminAuth updateToken={this.props.updateToken} /></Route>
                        </Switch>
                    </Row>
                </Router>
            </Container>
        )
    }
}

export default Auth