import React, { Component } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';


type AdminAuthProps = {
}

type AdminAuthState = {
}

class AdminAuth extends Component<AdminAuthProps, AdminAuthState> {
    state: AdminAuthState = {
       
    }



    render() {
        return (
            <Container className='main'>
                <Row>
                    <Tabs id="authTab" defaultActiveKey="login">
                        <Tab eventKey='login' title='Login'>
                            <p>I am login tab for Admin</p>
                        </Tab>
                        <Tab eventKey='register' title='Register'>
                            <p>I am Register tab for Admin</p>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        )
    }
}

export default AdminAuth;