import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type TicketsProps = {

}

type TicketsState = {

}

class Tickets extends Component<TicketsProps, TicketsState> {
    constructor(props: TicketsProps) {
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
                            Im the tickets column
                        </p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Tickets