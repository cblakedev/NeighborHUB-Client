import React, { Component } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';


type AdminAuthProps = {
    token: (newToken: string) => void
}

type AdminAuthState = {
}

class AdminAuth extends Component<AdminAuthProps, AdminAuthState> {
    constructor(props: AdminAuthProps) {
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
                            <AdminLogin token={this.props.token}/>
                        </Tab>
                        <Tab eventKey='register' title='Register'>
                            <AdminRegister token={this.props.token}/>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        )
    }
}

export default AdminAuth;