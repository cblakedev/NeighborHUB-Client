import React, { Component } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    deleteEvent = (): void => {
        fetch(`http://localhost:5000/event/deleteevent/${this.state.eventId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.props.eventUpdateCounter()
                this.handleCloseEvent()
            })
    }

    componentDidMount(): void {
        fetch(`http://localhost:5000/event/myevents`, {
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
                console.log(this.state.userEvents)
            })
    }

    componentDidUpdate(PrevProps: SavedEventsProps, PrevState: SavedEventsState): void {
        if (PrevProps.eventChangeCounter !== this.props.eventChangeCounter) {
            fetch(`http://localhost:5000/event/myevents`, {
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
                    console.log(this.state.userEvents)
                })
        }
    }

    render() {
        return (
            <Container className='mainFeedWrapper'>
                <Row className='feedWrapper'>
                    <Col>
                        <h2>
                            Saved Events
                        </h2>
                    </Col>
                </Row>
                <Row className='eventItemRow'>
                    {this.state.userEvents
                        ?
                        this.state.userEvents.map((event) => {
                            return (
                                <Col sm={6}>
                                    <img src={event.EventPoster} />
                                    <h4>{event.EventName}</h4>
                                    <Button onClick={(e) => {
                                        this.setState({
                                            eventName: event.EventName,
                                            eventPoster: event.EventPoster,
                                            eventDate: event.EventDate,
                                            eventTime: event.EventTime,
                                            eventUrl: event.EventUrl,
                                            eventId: event.id
                                        }); this.handleShowEvent(e)
                                    }}>Learn More</Button>
                                </Col>
                            )
                        })
                        :
                        undefined}

                </Row>
                <Modal className='eventModal' show={this.state.showModal} onHide={() => this.handleCloseEvent()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.eventName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className='eventModalImg' src={this.state.eventPoster} />
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
                            Get Tickets
                        </Button>
                        <Button variant="primary" onClick={(e) => this.deleteEvent()}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}

export default SavedEvents