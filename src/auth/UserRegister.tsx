import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';



class UserRegister extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            validated: false
        }

    }

    handleSubmit = (e: any): void => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({validated: true});
    };


    render() {
        return (
            <Container>
                <Row>
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group as={Col} md='6' controlId='validationCustom01'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='6' controlId='validationCustom01'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                pattern='((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$'
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Requires at least 6 characters, one uppercase, one lowercase, one number, and one special character.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='4' controlId='validationCustom03'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First Name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter your first name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='4' controlId='validationCustom04'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last Name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter your last name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='4' controlId='validationCustom05'>
                            <Form.Label>Unit Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Unit Number"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter your room number.</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default UserRegister