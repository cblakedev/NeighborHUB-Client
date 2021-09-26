import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserType } from '../App'
import DeleteTicket from './DeleteTicket'
import { NonNullExpression } from 'typescript';

type TicketsProps = {
    token: string | null
    role: string | null
}

type TicketsState = {
    showModal: boolean
    validated: boolean
    ticketTitle: string
    ticketDescription: string
    ticketData: ExistingTicket[]
    updateModalShow: boolean
    selectedTicketTitle: string
    selectedTicketDescription: string
    selectedTicketId: number | undefined
    changeCounter: number
}

type ExistingTicket = {
    AdminId: number | null
    TicketPost: string
    TicketTitle: string
    User: UserType
    UserId: number
    createdAt: string
    id: number
    isResolved: null | boolean
    resolving: null | boolean
    updatedAt: string
}


class Tickets extends Component<TicketsProps, TicketsState> {
    constructor(props: TicketsProps) {
        super(props)
        this.state = {
            showModal: false,
            validated: false,
            ticketTitle: '',
            ticketDescription: '',
            ticketData: [],
            updateModalShow: false,
            selectedTicketTitle: '',
            selectedTicketDescription: '',
            selectedTicketId: undefined,
            changeCounter: 1
        }
        this.handleChangeCounter = this.handleChangeCounter.bind(this)
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

    handleUpdateClose = (): void => {
        this.setState({ updateModalShow: false })
    }

    handleUpdateShow = (e: React.MouseEvent): any => {
        e.preventDefault()
        this.setState({ updateModalShow: true })
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

    handleChangeCounter = (): void => {
        this.setState({
            changeCounter: this.state.changeCounter + 1
        })
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
                    this.handleChangeCounter()
                })
        }
    }

    updateTicket = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        ////Start conditional operator here if an admin is updating info
        if (this.state.selectedTicketTitle && this.state.selectedTicketDescription) {
            fetch(`http://localhost:5000/ticket/updateticket/${this.state.selectedTicketId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ticket: {
                        TicketTitle: this.state.selectedTicketTitle,
                        TicketPost: this.state.selectedTicketDescription
                    }
                }),
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    this.setState({
                        selectedTicketTitle: '',
                        selectedTicketDescription: ''
                    })
                    this.handleUpdateClose()
                    this.handleChangeCounter()
                })
        }

    }

    componentDidMount(): void {
        if(this.props.role === 'Tenant') {
            fetch(`http://localhost:5000/ticket/mytickets`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                data.myTickets.sort(function (a: ExistingTicket, b: ExistingTicket): number {
                    return b.createdAt.localeCompare(a.createdAt);
                })

                this.setState({
                    ticketData: data.myTickets
                })
                console.log(data.myTickets)
            })
        } else if (this.props.role === 'Admin') {
            fetch(`http://localhost:5000/ticket/admin/alltickets`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                data.allTickets.sort(function (a: ExistingTicket, b: ExistingTicket): number {
                    return b.createdAt.localeCompare(a.createdAt);
                })
                this.setState({
                    ticketData: data.allTickets
                })
                console.log(data)
            })
        }
        
    }

    componentDidUpdate(prevProps: TicketsProps, prevState: TicketsState): void {
        if (prevState.changeCounter !== this.state.changeCounter) {
            fetch(`http://localhost:5000/ticket/mytickets`, {
                method: 'GET',
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    data.myTickets.sort(function (a: ExistingTicket, b: ExistingTicket): number {
                        return b.createdAt.localeCompare(a.createdAt);
                    })

                    this.setState({
                        ticketData: data.myTickets
                    })
                    console.log(data.myTickets)
                })
        }
    }

    render() {
        return (
            <Container className='mainFeedWrapper'>
                <Row className='feedWrapper'>
                    <Col>
                        <h2>Tickets</h2>
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
                {this.state.ticketData
                    ?
                    this.state.ticketData.map((ticket) => {
                        return (
                            <Row key={ticket.id} className='ticketWrapper'>
                                <Col>
                                    <Row>
                                        <Col className='ticketTitleCol'>
                                            <h4 >{ticket.TicketTitle}</h4>
                                        </Col>
                                        <Col className='ticketDropdownCol'>
                                            <Dropdown>
                                                <Dropdown.Toggle id="postDropdown"></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={(e) => {
                                                        this.handleUpdateShow(e);
                                                        this.setState({
                                                            selectedTicketTitle: ticket.TicketTitle,
                                                            selectedTicketDescription: ticket.TicketPost,
                                                            selectedTicketId: ticket.id
                                                        })
                                                    }}>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item><DeleteTicket token={this.props.token} ticketId={ticket.id} handleChangeCounter={this.handleChangeCounter}/></Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                    <Row className='ticketPostWrapper'>
                                        <Col>
                                            <p>{ticket.TicketPost}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row >
                        )
                    })
                    : undefined
                }
                <Modal show={this.state.updateModalShow} onHide={this.handleUpdateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => this.updateTicket(e)}>
                            <Form.Group as={Col} md='12'>
                                <Form.Control
                                    className='modalTitleText'
                                    value={this.state.selectedTicketTitle}
                                    onChange={(e) => this.setState({ selectedTicketTitle: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className='mt-3' as={Col} md='12'>
                                <Form.Control
                                    className='modalTicketText'
                                    as="textarea"
                                    value={this.state.selectedTicketDescription}
                                    onChange={(e) => this.setState({ selectedTicketDescription: e.target.value })}
                                />
                            </Form.Group>

                            {this.state.selectedTicketDescription && this.state.selectedTicketDescription
                                ?
                                <Button className='mt-3' variant="primary" type='submit'>
                                    Edit
                                </Button>
                                :
                                <Button className='mt-3' variant="primary" type='submit' disabled>
                                    Edit
                                </Button>
                            }
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container >
        )
    }
}

export default Tickets