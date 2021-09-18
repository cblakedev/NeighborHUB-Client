import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

type AdminLoginProps = {
    token: (newToken: string) => void
}

type AdminLoginState = {
    validated: boolean,
    email: string,
    password: string
}

class AdminLogin extends Component<AdminLoginProps, AdminLoginState> {
    constructor(props: AdminLoginProps) {
        super(props)
        this.state = {
            validated: false,
            email: '',
            password: ''
        }
    }

    handleFetch = (): void => {
        fetch('http://localhost:5000/admin/login', {
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
            .then((data) => this.props.token(data.sessionToken))
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
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group as={Col} xs='12' controlId='validationCustom08'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                value={this.state.email}
                                placeholder="Email"
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs='12' controlId='validationCustom09'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter your password.</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className='mt-3'>Login</Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default AdminLogin