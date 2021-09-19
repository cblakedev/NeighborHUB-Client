import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Feed from './Feed'
import Events from '../events/Events'
import Tickets from '../tickets/Tickets'

type HomeProps = {

}

type HomeState = {

}

class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <Row className='headerBar g-0'>
                    <Col className='homeBtn'> <p>Im the Header Bar</p></Col>
                    <Col className='signedInAs'><p>Signed in as Username</p></Col>
                </Row>
                <Container className='mainHomeWrapper'>
                    <Router>

                        <Row className='homeWrapper'>
                            <Col className='homeLinks'>
                                <ul className='navItems'>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/tickets'>Tickets</Link></li>
                                    <li><Link to='/events'>Events</Link></li>
                                </ul>
                                <Row>
                                    <Col>
                                        <Button>Logout</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className='routerViews' sm={6}>
                                <Switch>
                                    <Route exact path='/'><Feed /></Route>
                                    <Route exact path='/tickets'><Tickets /></Route>
                                    <Route exact path='/events'><Events /></Route>
                                </Switch>
                            </Col>
                            <Col className='eventViews'>
                                <p>Im the events column</p>
                            </Col>
                        </Row>
                    </Router>
                </Container>
            </div>
        )
    }
}

export default Home