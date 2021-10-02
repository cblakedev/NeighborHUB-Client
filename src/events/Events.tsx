import React, { Component } from 'react';
import { Row, Col, Button, Dropdown, Modal, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillPlusCircle } from 'react-icons/ai'

type EventsProps = {
    token: string | null
    eventChangeCounter: number
    eventUpdateCounter: () => void
}

type EventsState = {
    eventData: any
    eventName: string
    eventPoster: string
    eventDate: string
    eventTime: string
    eventUrl: string
    showModal: boolean
}

class Events extends Component<EventsProps, EventsState> {
    constructor(props: EventsProps) {
        super(props)
        this.state = {
            eventData: {},
            eventName: '',
            eventPoster: '',
            eventDate: '',
            eventTime: '',
            eventUrl: '',
            showModal: false
        }
    }

    timeConvert = (date: string): string => {
        const time = new Date(date).toLocaleTimeString('en',
            { timeStyle: 'short', hour12: true, timeZone: 'UTC' });

        return time
    }

    dateConvert = (date: string): string => {
        const myDate = new Date(date);
        return `${(myDate.getMonth() + 1)}-${myDate.getDate()}-${myDate.getFullYear()}`
    }

    handleCloseEvent = (): void => {
        this.setState({ showModal: false })
    }

    handleShowEvent = (e: React.MouseEvent): void => {
        this.setState({ showModal: true })
    }

    saveEvent = () => {
        fetch(`http://localhost:5000/event/create`, {
            method: 'POST',
            body: JSON.stringify({
                event: {
                    EventPoster: this.state.eventPoster,
                    EventName: this.state.eventName,
                    EventDate: this.state.eventDate,
                    EventTime: this.state.eventTime,
                    EventUrl: this.state.eventUrl
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
                this.props.eventUpdateCounter()
                this.handleCloseEvent()
            })
    }


    componentDidMount() {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?dmaId=303&sort=date,asc&size=50&apikey=4HGjWgd6muYekVCVQmKoYScIKKbzXbni`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    eventData: data
                })
                console.log(this.state.eventData._embedded.events)
            })
    }

    render() {
        return (
            <>
                <h2>Upcoming Events</h2>
                {
                    this.state.eventData._embedded
                        ?
                        this.state.eventData._embedded.events.map((event: any) => {
                            return (
                                <Row className='eventWrapper'>
                                    <Col className='eventItemCol'>
                                        <img src={event.images[0].url} />
                                        <h4>{event.name}</h4>

                                        <Button onClick={(e) => {
                                            this.setState({
                                                eventName: event.name,
                                                eventPoster: event.images[0].url,
                                                eventDate: this.dateConvert(event.dates.start.dateTime),
                                                eventTime: this.timeConvert(event.dates.start.dateTime),
                                                eventUrl: event.url
                                            }); this.handleShowEvent(e)
                                        }}>Learn More</Button>


                                    </Col>
                                </Row>
                            )
                        })
                        :
                        undefined
                }

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
                        <Button variant="primary" onClick={(e) => this.saveEvent()}>
                            Bookmark
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Events



