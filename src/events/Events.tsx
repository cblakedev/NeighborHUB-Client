import React, { Component } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type EventsProps = {

}

type EventsState = {

}

class Events extends Component<EventsProps, EventsState> {
    constructor(props: EventsProps) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <Container className='mainFeedWrapper'>
                <Row className='feedWrapper'>
                    <Col> 
                        <p>
                            Im the events column
                        </p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Events



