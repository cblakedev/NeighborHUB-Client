import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserType } from '../App';
import DeleteTicket from './DeleteTicket';
import { Spinner } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import Moment from 'react-moment';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import { FiSend } from 'react-icons/fi';
import APIURL from '../helpers/environment';

type TicketsProps = {
    token: string | null
    role: string | null
}

type TicketsState = {
    showModal: boolean
    validated: boolean
    ticketTitle: string
    unitNumber: string
    ticketDescription: string
    ticketData: ExistingTicket[]
    updateModalShow: boolean
    selectedTicketTitle: string
    selectedTicketDescription: string
    selectedUnitNumber: string
    selectedTicketId: number | undefined
    changeCounter: number
    isResolved: boolean
    resolving: boolean
}

type ExistingTicket = {
    AdminId: number | null
    TicketPost: string
    TicketTitle: string
    UnitNumber: string
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
            unitNumber: '',
            ticketDescription: '',
            ticketData: [],
            updateModalShow: false,
            selectedTicketTitle: '',
            selectedTicketDescription: '',
            selectedUnitNumber: '',
            selectedTicketId: undefined,
            changeCounter: 1,
            isResolved: false,
            resolving: false
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
            fetch(`${APIURL}ticket/create`, {
                method: 'POST',
                body: JSON.stringify({
                    ticket: {
                        TicketTitle: this.state.ticketTitle,
                        TicketPost: this.state.ticketDescription,
                        UnitNumber: this.state.unitNumber
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    this.handleClose();
                    this.setState({
                        ticketTitle: '',
                        ticketDescription: '',
                        unitNumber: ''
                    })
                    this.handleChangeCounter()
                })
        }
    }

    updateTicket = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (this.state.selectedTicketTitle && this.state.selectedTicketDescription) {
            if (this.props.role === 'Tenant') {
                fetch(`${APIURL}ticket/updateticket/${this.state.selectedTicketId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ticket: {
                            TicketTitle: this.state.selectedTicketTitle,
                            TicketPost: this.state.selectedTicketDescription,
                            UnitNumber: this.state.selectedUnitNumber
                        }
                    }),
                    headers: new Headers({
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${this.props.token}`
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            selectedTicketTitle: '',
                            selectedTicketDescription: '',
                            selectedUnitNumber: ''
                        })
                        this.handleUpdateClose()
                        this.handleChangeCounter()
                    })

            } else if (this.props.role === 'Admin') {
                fetch(`${APIURL}ticket/updateticket/${this.state.selectedTicketId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ticket: {
                            TicketTitle: this.state.selectedTicketTitle,
                            TicketPost: this.state.selectedTicketDescription,
                            UnitNumber: this.state.selectedUnitNumber,
                            isResolved: this.state.isResolved,
                            resolving: this.state.resolving
                        }
                    }),
                    headers: new Headers({
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${this.props.token}`
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            selectedTicketTitle: '',
                            selectedTicketDescription: '',
                            selectedUnitNumber: '',
                            resolving: false,
                            isResolved: false,
                        })
                        this.handleUpdateClose()
                        this.handleChangeCounter()
                    })
            }
        }
    }

    componentDidMount(): void {
        if (this.props.role === 'Tenant') {
            fetch(`${APIURL}ticket/mytickets`, {
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
                })

        } else if (this.props.role === 'Admin') {
            fetch(`${APIURL}ticket/admin/alltickets`, {
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
                })
        }
    }

    componentDidUpdate(prevProps: TicketsProps, prevState: TicketsState): void {
        if (prevState.changeCounter !== this.state.changeCounter) {
            if (this.props.role === 'Tenant') {
                fetch(`${APIURL}ticket/mytickets`, {
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
                fetch(`${APIURL}ticket/admin/alltickets`, {
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
    }

    render() {
        return (
            <Container className='mainFeedWrapper'>
                <Row className='feedWrapper'>
                    <Col xs={3} className='ticketFeedTitleWrapper'>
                        <h2>Tickets</h2>
                    </Col>
                    <Col className='createTicketCol'>
                        <Button className='createTicketBtn' variant='primary' onClick={this.handleShow}>
                            <IoIosCreate /> New Ticket
                        </Button>

                        {/* Create new ticket modal. */}
                        <Modal show={this.state.showModal} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Ticket</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='createTicketModalBody'>
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
                                    <Form.Group as={Col} md='12' className='mt-3' controlId='ticketcontrol2'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Unit'
                                            required
                                            value={this.state.unitNumber}
                                            onChange={(e) => this.setState({ unitNumber: e.target.value })}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">Unit number required.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} className='mt-3' controlId='ticketcontrol3'>
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
                                        <FiSend /> Submit Ticket
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>

                {/* Created or saved tickets list */}
                {this.state.ticketData
                    ?
                    this.state.ticketData.map((ticket) => {
                        return (
                            <Row key={ticket.id} className='ticketWrapper'>
                                <Col>
                                    <Row>
                                        <Col xs={10} className='ticketTitleCol'>
                                            <h4 >{ticket.TicketTitle}</h4>
                                            <span>Unit {ticket.UnitNumber} | <i><Moment className='ticketTimeStamp' fromNow>{ticket.createdAt}</Moment></i></span>
                                        </Col>
                                        <Col xs={2} className='ticketDropdownCol'>
                                            <Dropdown>
                                                <Dropdown.Toggle variant='light' id="postDropdown"><BsThreeDots /></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={(e) => {
                                                        this.handleUpdateShow(e);
                                                        this.setState({
                                                            selectedTicketTitle: ticket.TicketTitle,
                                                            selectedTicketDescription: ticket.TicketPost,
                                                            selectedUnitNumber: ticket.UnitNumber,
                                                            selectedTicketId: ticket.id
                                                        })
                                                    }}>
                                                        <AiOutlineEdit />Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item><DeleteTicket token={this.props.token} ticketId={ticket.id} handleChangeCounter={this.handleChangeCounter} /></Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                    <Row className='ticketPostWrapper'>
                                        <Col>
                                            <p>{ticket.TicketPost}</p>
                                        </Col>
                                    </Row>
                                    {
                                        ticket.resolving
                                            ?
                                            <span><Spinner className='resolvingIcon' animation="border" variant="warning" /> <i>Resolving ticket</i></span>
                                            :
                                            undefined
                                    }

                                    {
                                        ticket.isResolved
                                            ?
                                            <span className='isResolvedIcon'><FaCheckCircle /><i>Ticket Resolved</i></span>
                                            :
                                            undefined
                                    }
                                </Col>
                            </Row >
                        )
                    })
                    : undefined
                }

                {/* Modal for each ticket in the list */}
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
                            <Form.Group as={Col} className='mt-3' md='12'>
                                <Form.Control
                                    className='modalUnitNumber'
                                    value={this.state.selectedUnitNumber}
                                    onChange={(e) => this.setState({ selectedUnitNumber: e.target.value })}
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

                            {this.state.selectedTicketTitle && this.state.selectedTicketDescription && this.state.selectedUnitNumber
                                ?
                                <Button className='mt-3 ticketModalButton' variant="primary" type='submit'>
                                    <AiOutlineEdit />Edit
                                </Button>
                                :
                                <Button className='mt-3 ticketModalButton' variant="primary" type='submit' disabled>
                                    <AiOutlineEdit />Edit
                                </Button>
                            }

                            {this.props.role === 'Admin'
                                ?
                                <span>
                                    <Button className='mt-3 ticketModalButton' variant="primary" type='submit' onClick={(e) => this.setState({ resolving: true })}>Resolving Ticket</Button>
                                    <Button className='mt-3 ticketModalButton' variant="primary" type='submit' onClick={(e) => this.setState({ isResolved: true })}>Ticket Resolved</Button>
                                </span>
                                :
                                undefined}
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container >
        )
    }
}

export default Tickets