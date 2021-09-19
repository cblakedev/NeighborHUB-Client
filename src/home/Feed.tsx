import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type FeedProps = {

}

type FeedState = {

}

class Feed extends Component<FeedProps, FeedState> {
    constructor(props: FeedProps) {
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
                            Im the feed column
                        </p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Feed