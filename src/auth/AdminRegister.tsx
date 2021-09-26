import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

type AdminRegisterProps = {
    updateToken: (newToken: string, role: string) => void
}

type AdminRegisterState = {
    validated: boolean
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

class AdminRegister extends Component<AdminRegisterProps, AdminRegisterState> {
    constructor(props: AdminRegisterProps) {
        super(props)
        this.state = {
            validated: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        }
    }

    handleFetch = (): void => {
        const { email, password, firstName, lastName } = this.state
        
        if (email && password && firstName && lastName) {
            fetch('http://localhost:5000/admin/register', {
                method: 'POST',
                body: JSON.stringify({
                    admin: {
                        Email: this.state.email,
                        Password: this.state.password,
                        FirstName: this.state.firstName,
                        LastName: this.state.lastName
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
                        password: '',
                        firstName: '',
                        lastName: '',
                    })
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
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
                        <Row>
                            <Form.Group as={Col} xs='12' controlId='validationCustom10'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs='12' controlId='validationCustom11'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    pattern='((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$'
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Requires at least 6 characters, one uppercase, one lowercase, one number, and one special character.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} xs='6' controlId='validationCustom12'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={(e) => this.setState({ firstName: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Please enter your first name.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs='6' controlId='validationCustom13'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={(e) => this.setState({ lastName: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Please enter your last name.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit" className='mt-3'>Register</Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default AdminRegister