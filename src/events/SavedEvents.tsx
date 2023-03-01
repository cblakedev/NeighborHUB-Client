import React, { Component } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ImTicket } from 'react-icons/im';
import APIURL from '../helpers/environment';

type SavedEventsProps = {
    token: string | null
    eventChangeCounter: number
    eventUpdateCounter: () => void
}

type SavedEventsState = {
    userEvents: BookMarkedEvents[]
    eventName: string
    eventPoster: string
    eventDate: string
    eventTime: string
    eventUrl: string
    showModal: boolean
    eventId: number | undefined
}

type BookMarkedEvents = {
    AdminId: null | number
    EventDate: string
    EventName: string
    EventPoster: string
    EventTime: string
    EventUrl: string
    UserId: null | number
    createdAt: string
    id: number | undefined
    updatedAt: string
}

class SavedEvents extends Component<SavedEventsProps, SavedEventsState> {
    constructor(props: SavedEventsProps) {
        super(props)
        this.state = {
            userEvents: [],
            eventName: '',
            eventPoster: '',
            eventDate: '',
            eventTime: '',
            eventUrl: '',
            eventId: undefined,
            showModal: false
        }
    }

    handleCloseEvent = (): void => {
        this.setState({ showModal: false })
    }

    handleShowEvent = (e: React.MouseEvent): void => {
        this.setState({ showModal: true })
    }

    truncateString = (string: string, limit: number): string => {
        if (string.length > limit) {
            return string.substring(0, limit) + "..."
        } else {
            return string
        }
    }

    deleteEvent = (): void => {
        fetch(`${APIURL}event/deleteevent/${this.state.eventId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.eventUpdateCounter()
                this.handleCloseEvent()
            })
    }

    componentDidMount(): void {
        fetch(`${APIURL}event/myevents`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    userEvents: data.userEvents
                })
            })
    }

    componentDidUpdate(PrevProps: SavedEventsProps, PrevState: SavedEventsState): void {
        if (PrevProps.eventChangeCounter !== this.props.eventChangeCounter) {
            fetch(`${APIURL}event/myevents`, {
                method: 'GET',
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        userEvents: data.userEvents
                    })
                })
        }
    }

    render() {
        return (
            <Container className='mainFeedWrapper'>
                <Row className='feedWrapper'>
                    <Col>
                        <h2 className='savedEventsTitle'>
                            Saved Events
                        </h2>
                    </Col>
                </Row>

                {/* Saved events list */}
                <Row className='eventItemRow'>
                    {this.state.userEvents
                        ?
                        this.state.userEvents.map((event) => {
                            return (
                                <Col className='savedEventItem' key={event.id} sm={6}>
                                    <img src={event.EventPoster} alt='Event Poster' />
                                    <h4>{this.truncateString(event.EventName, 20)}</h4>
                                    <Button onClick={(e) => {
                                        this.setState({
                                            eventName: event.EventName,
                                            eventPoster: event.EventPoster,
                                            eventDate: event.EventDate,
                                            eventTime: event.EventTime,
                                            eventUrl: event.EventUrl,
                                            eventId: event.id
                                        }); this.handleShowEvent(e)
                                    }}>Event Info</Button>
                                </Col>
                            )
                        })
                        :
                        undefined}

                </Row>

                {/* Modal for each saved event */}
                <Modal className='eventModal' show={this.state.showModal} onHide={() => this.handleCloseEvent()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.eventName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className='eventModalImg' src={this.state.eventPoster} alt='Event Poster' />
                        <Row>
                            <Col className='eventModalDate'>
                                <h5>When:</h5>
                                <p>{this.state.eventDate}</p>
                            </Col>
                            <Col className='eventModalTime'>
                                <h5>Time:</h5>
                                <p>{this.state.eventTime}</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" href={this.state.eventUrl} target='_blank' onClick={(e) => this.handleCloseEvent()}>
                            <ImTicket />Get Tickets
                        </Button>
                        <Button variant="primary" onClick={(e) => this.deleteEvent()}>
                            <RiDeleteBinLine />Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}

export default SavedEvents