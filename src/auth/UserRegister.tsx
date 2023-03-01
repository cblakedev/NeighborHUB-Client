import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import APIURL from '../helpers/environment';

type UserRegisterProps = {
    updateToken: (newToken: string, role: string) => void
}

type UserRegisterState = {
    validated: boolean
    email: string,
    password: string,
    confirmPassword: string,
    passwordError: string,
    firstName: string,
    lastName: string,
    unitNumber: string,
    duplicateEmailError: string,
    submitClicked: boolean
}

class UserRegister extends Component<UserRegisterProps, UserRegisterState> {
    constructor(props: UserRegisterProps) {
        super(props)
        this.state = {
            validated: false,
            email: '',
            password: '',
            confirmPassword: '',
            passwordError: '',
            firstName: '',
            lastName: '',
            unitNumber: '',
            duplicateEmailError: '',
            submitClicked: false
        }
    }

    handleFetch = (): void => {
        const { email, password, firstName, lastName, unitNumber } = this.state

        if (email && password && firstName && lastName && unitNumber) {
            this.setState({
                submitClicked: true
            });

            fetch(`${APIURL}user/register`, {
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        Email: this.state.email,
                        Password: this.state.password,
                        FirstName: this.state.firstName,
                        LastName: this.state.lastName,
                        UnitNumber: this.state.unitNumber
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
                        unitNumber: '',
                        duplicateEmailError: ''
                    })
                })
                .catch((err) => {
                    this.setState({
                        duplicateEmailError: 'Email already in use.',
                        submitClicked: false
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
                        <h4 className='appUser'>Tenant Portal</h4>
                    </Col>
                </Row>

                {/* User Register Form */}
                <Row>
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
                        <Row>
                            <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom03'>
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
                            <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom04'>
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
                            <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom15'>
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
                            <Form.Group className='mt-3' as={Col} xs='6' controlId='validationCustom05'>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={(e) => this.setState({ firstName: e.target.value })}
                                />
                                <Form.Control.Feedback type='invalid'>Please enter your first name.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mt-3' as={Col} xs='6' controlId='validationCustom06'>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={(e) => this.setState({ lastName: e.target.value })}
                                />
                                <Form.Control.Feedback type='invalid'>Please enter your last name.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mt-3' as={Col} xs='6' controlId='validationCustom07'>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Unit Number"
                                    value={this.state.unitNumber}
                                    onChange={(e) => this.setState({ unitNumber: e.target.value })}
                                />
                                <Form.Control.Feedback type='invalid'>Please enter your room number.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit" className={`${this.state.submitClicked ? "d-none" : ""} mt-3 registerSubmitBtn`}>
							Register
						</Button>
						<Button className={`${this.state.submitClicked ? "" : "d-none"} mt-3 registerSpinner disabled`}>
							<Spinner className="me-1" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							Loading...
						</Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default UserRegister