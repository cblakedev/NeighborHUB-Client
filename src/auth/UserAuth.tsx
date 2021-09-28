import React, { Component } from 'react';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import 'bootstrap/dist/css/bootstrap.min.css';



type UserAuthProps = {
    updateToken: (newToken: string, role: string) => void
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
                            <UserLogin updateToken={this.props.updateToken} />
                        </Tab>
                        <Tab eventKey='register' title='Register'>
                            <UserRegister updateToken={this.props.updateToken} />
                        </Tab>
                        <Tab disabled eventKey='tenantInfo' title='Tenant Portal'></Tab>     
                    </Tabs>
                    
                </Row>
            </Container>
        )
    }
}

export default UserAuth;