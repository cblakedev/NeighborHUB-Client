import React, { Component } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import 'bootstrap/dist/css/bootstrap.min.css';


type UserAuthProps = {
    token: (newToken: string) => void
}

type UserAuthState = {
}

class UserAuth extends Component<UserAuthProps, UserAuthState> {
    constructor(props: UserAuthProps) {
        super(props)
        this.state = {
       
        }
    }
    
    render() {
        return (
            <Container className='mainAuthWrapper'>
                <Row className='authWrapper'>
                    <Tabs id="authTab" defaultActiveKey="login">
                        <Tab eventKey='login' title='Login'>
                            <UserLogin token={this.props.token}/>
                        </Tab>
                        <Tab eventKey='register' title='Register'>
                            <UserRegister token={this.props.token}/>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        )
    }
}

export default UserAuth;