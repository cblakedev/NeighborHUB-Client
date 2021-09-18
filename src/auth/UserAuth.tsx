import React, { Component } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';


type UserAuthProps = {
}

type UserAuthState = {
}

class UserAuth extends Component<UserAuthProps, UserAuthState> {
    state: UserAuthState = {
       
    }




    render() {
        return (
            <Container className='main'>
                <Row>
                    <Tabs id="authTab" defaultActiveKey="login">
                        <Tab eventKey='login' title='Login'>
                            <UserLogin/>
                        </Tab>
                        <Tab eventKey='register' title='Register'>
                            <UserRegister/>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        )
    }
}

export default UserAuth;