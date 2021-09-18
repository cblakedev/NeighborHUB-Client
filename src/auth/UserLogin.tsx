import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';



class UserLogin extends Component<any, any> {
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
                        <Form.Group as={Col} md='12' controlId='validationCustom01'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='12' controlId='validationCustom01'>
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
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default UserLogin