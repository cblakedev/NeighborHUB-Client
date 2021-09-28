import React, { Component } from 'react';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';


type AdminAuthProps = {
    updateToken: (newToken: string, role: string) => void
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
                            <AdminLogin updateToken={this.props.updateToken}/>
                        </Tab>
                        <Tab eventKey='register' title='Register'>
                            <AdminRegister updateToken={this.props.updateToken}/>
                        </Tab>
                        <Tab disabled eventKey='tenantInfo' title='Admin Portal'></Tab>
                    </Tabs>
                </Row>
            </Container>
        )
    }
}

export default AdminAuth;