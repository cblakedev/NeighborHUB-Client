import React, { Component } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type EventsProps = {

}

type EventsState = {
    eventData: any
}

class Events extends Component<EventsProps, EventsState> {
    constructor(props: EventsProps) {
        super(props)
        this.state = {
            eventData: {}
        }
    }

    componentDidMount() {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?dmaId=303&sort=date,asc&size=50&apikey=4HGjWgd6muYekVCVQmKoYScIKKbzXbni`)
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                eventData: data
            })
            console.log(this.state.eventData)
        })
    }

    render() {
        return(
            <Container className='mainFeedWrapper'>
                <Row className='feedWrapper'>
                    <Col> 
                        <p>Poster goes here</p>
                        <h3>Event Name goes here</h3>
                        <p>Date goes here</p>
                        <p>Event url goes here</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Events



