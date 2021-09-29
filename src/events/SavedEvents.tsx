import React, { Component } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type SavedEventsProps = {

}

type SavedEventsState = {

}

class SavedEvents extends Component<SavedEventsProps, SavedEventsState> {
    constructor(props: SavedEventsProps) {
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

export default SavedEvents