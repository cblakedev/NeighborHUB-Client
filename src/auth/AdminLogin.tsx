import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import APIURL from '../helpers/environment';

type AdminLoginProps = {
    updateToken: (newToken: string, role: string) => void
}

type AdminLoginState = {
    validated: boolean,
    email: string,
    password: string,
    loginError: string,
    submitClicked: boolean
}

class AdminLogin extends Component<AdminLoginProps, AdminLoginState> {
    constructor(props: AdminLoginProps) {
        super(props)
        this.state = {
            validated: false,
            email: '',
            password: '',
            loginError: '',
            submitClicked: false
        }
    }

    handleFetch = (): void => {
        this.setState({
            loginError: ''
        });
        
        if (this.state.email && this.state.password) {
            this.setState({
                submitClicked: true
            })

            fetch(`${APIURL}admin/login`, {
                method: 'POST',
                body: JSON.stringify({
                    admin: {
                        Email: this.state.email,
                        Password: this.state.password
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    this.props.updateToken(data.sessionToken, data.user.Role)
                    this.setState({
                        email: '',
                        password: ''
                    })
                })
                .catch(err => {
                    this.setState({
                        loginError: 'Invalid email or password.',
                        submitClicked: false
                    })
                    console.log(err)
                })
        }
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({ validated: true });
        this.handleFetch();
    };


    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1 className='appTitle'>NeighborHUB</h1>
                        <h4 className='appUserAdmin'>Admin Portal</h4>
                    </Col>
                </Row>

                {/* Admin Login Form*/}
                <Row>
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom08'>
                            <Form.Control
                                required
                                type="email"
                                value={this.state.email}
                                placeholder="Email"
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                            {this.state.loginError ? <p className='loginValidator'>{this.state.loginError}</p> : undefined}
                        </Form.Group>
                        <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom09'>
                            <Form.Control
                                required
                                type="password"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                            {this.state.loginError ? <p className='loginValidator'>{this.state.loginError}</p> : undefined}
                        </Form.Group>
                        <Button type="submit" className={`${this.state.submitClicked ? "d-none" : ""} mt-3 loginSubmitBtn`}>
							Login
						</Button>
						<Button className={`${this.state.submitClicked ? "" : "d-none"} mt-3 loginSpinner disabled`}>
							<Spinner className="me-1" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							Loading...
						</Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default AdminLogin