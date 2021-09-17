import React, { Component } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';


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
                            <p>I am login tab</p>
                        </Tab>
                        <Tab eventKey='register' title='Register'>
                            <p>I am Register tab</p>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        )
    }
}

export default UserAuth;