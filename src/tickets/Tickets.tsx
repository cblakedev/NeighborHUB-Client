import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type TicketsProps = {
    token: string | null
}

type TicketsState = {
    showModal: boolean
    validated: boolean
    ticketTitle: string
    ticketDescription: string
}

class Tickets extends Component<TicketsProps, TicketsState> {
    constructor(props: TicketsProps) {
        super(props)
        this.state = {
            showModal: false,
            validated: false,
            ticketTitle: '',
            ticketDescription: ''
        }
    }

    handleClose = (): void => {
        this.setState({
            showModal: false,
            ticketTitle: '',
            ticketDescription: ''
        })
    }

    handleShow = (): void => {
        this.setState({
            showModal: true
        })
    }

    handleCreate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({ validated: true });
        this.handleFetch()
    }

    handleFetch = (): void => {
        if (this.state.ticketTitle && this.state.ticketDescription) {
            fetch(`http://localhost:5000/ticket/create`, {
                method: 'POST',
                body: JSON.stringify({
                    ticket: {
                        TicketTitle: this.state.ticketTitle,
                        TicketPost: this.state.ticketDescription
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    this.handleClose();
                    this.setState({
                        ticketTitle: '',
                        ticketDescription: ''
                    })
                })
        }
    }


    render() {
        return (
            <Container className='mainFeedWrapper'>
                <Row className='feedWrapper'>
                    <Col>
                        <h1>Tickets</h1>
                    </Col>
                    <Col>
                        <Button className='createTicketBtn mt-2' variant='primary' onClick={this.handleShow}>
                            Create Ticket
                        </Button>
                        <Modal show={this.state.showModal} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Ticket</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleCreate(e)}>
                                    <Form.Group as={Col} md='12' controlId='ticketcontrol1'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Ticket Title'
                                            required
                                            value={this.state.ticketTitle}
                                            onChange={(e) => this.setState({ ticketTitle: e.target.value })}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">Ticket title required.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mt-3' controlId='ticketcontrol2'>
                                        <Form.Control
                                            as='textarea'
                                            type='text'
                                            placeholder='Ticket Description'
                                            style={{ height: '100px' }}
                                            required
                                            value={this.state.ticketDescription}
                                            onChange={(e) => this.setState({ ticketDescription: e.target.value })}
                                        />
                                        < Form.Control.Feedback > Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>Ticket description required.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type='submit' className='mt-3' variant='primary'>
                                        Submit Ticket
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        

                    </Col>
                </Row >
            </Container >
        )
    }
}

export default Tickets