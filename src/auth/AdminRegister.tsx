import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import APIURL from '../helpers/environment';

type AdminRegisterProps = {
    updateToken: (newToken: string, role: string) => void
}

type AdminRegisterState = {
    validated: boolean
    email: string,
    password: string,
    confirmPassword: string,
    passwordError: string,
    firstName: string,
    lastName: string,
    duplicateEmailError: string

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
            confirmPassword: '',
            passwordError: '',
            duplicateEmailError: ''
        }
    }

    handleFetch = (): void => {
        const { email, password, firstName, lastName } = this.state

        if (email && password && firstName && lastName) {
            fetch(`${APIURL}admin/register`, {
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
                        confirmPassword: '',
                        passwordError: '',
                        firstName: '',
                        lastName: '',
                        duplicateEmailError: ''
                    })
                })
                .catch((err) => {
                    this.setState({
                        duplicateEmailError: 'Email already in use.'
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

        if (this.state.password === this.state.confirmPassword) {
            let pattern = /((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
            if (pattern.test(this.state.password)) {
                this.handleFetch();
            }
        } else {
            this.setState({
                passwordError: 'Password must match.'
            })
        }
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

                {/* Admin Register Form */}
                <Row>
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
                        <Row>
                            <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom10'>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                                {this.state.duplicateEmailError ? <p className='loginValidator'>{this.state.duplicateEmailError}</p> : undefined}
                                <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom11'>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    pattern='((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$'
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                                {this.state.password !== this.state.confirmPassword
                                    ?
                                    <p className='loginValidator'>{this.state.passwordError}</p>
                                    :
                                    <Form.Control.Feedback type='invalid'>Requires at least 6 characters, one uppercase, one lowercase, one number, and one special character.</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom14'>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Confirm Password"
                                    pattern='((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$'
                                    value={this.state.confirmPassword}
                                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                />
                                {this.state.password !== this.state.confirmPassword
                                    ?
                                    <p className='loginValidator'>{this.state.passwordError}</p>
                                    :
                                    <Form.Control.Feedback type='invalid'>Requires at least 6 characters, one uppercase, one lowercase, one number, and one special character.</Form.Control.Feedback>}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className='mt-3' as={Col} xs='6' controlId='validationCustom12'>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={(e) => this.setState({ firstName: e.target.value })}
                                />
                                <Form.Control.Feedback type='invalid'>Please enter your first name.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mt-3' as={Col} xs='6' controlId='validationCustom13'>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={(e) => this.setState({ lastName: e.target.value })}
                                />
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