import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { IoIosHome } from 'react-icons/io'
import { GoIssueReopened } from 'react-icons/go'
import { BiCalendarEvent } from 'react-icons/bi'
import Feed from './Feed'
import SavedEvents from '../events/SavedEvents'
import Tickets from '../tickets/Tickets'
import Events from '../events/Events'
import { RiLogoutBoxLine } from 'react-icons/ri'

type HomeProps = {
    token: string | null
    clearToken: () => void
    role: string | null
}

type HomeState = {
    eventChangeCounter: number
}

class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)
        this.state = {
            eventChangeCounter: 0
        }
        this.eventUpdateCounter = this.eventUpdateCounter.bind(this)
    }

    eventUpdateCounter = (): void => {
        this.setState({
            eventChangeCounter: this.state.eventChangeCounter + 1
        })
    }

    render() {
        return (
            <div>
                <Row className='headerBar g-0'>
                    <Col className='homeBtn'> <p>NeighborHUB</p></Col>
                    <Col className='signedInAs'><p>Signed in as Username</p></Col>
                </Row>
                <Container className='mainHomeWrapper'>
                    <Router>

                        <Row className='homeWrapper'>
                            <Col className='homeLinks'>
                                <ul className='navItems'>
                                    <li><Link to='/'><IoIosHome /> Home</Link></li>
                                    <li><Link to='/tickets'><GoIssueReopened /> Tickets</Link></li>
                                    <li><Link to='/savedEvents'><BiCalendarEvent /> Events</Link></li>
                                </ul>
                                <Row className='logoutBtnWrapper'>
                                    <Col>
                                        <Button onClick={() => this.props.clearToken()}><RiLogoutBoxLine />Logout</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className='routerViews' sm={7}>
                                <Switch>
                                    <Route exact path='/'><Feed token={this.props.token} /></Route>
                                    <Route exact path='/tickets'><Tickets token={this.props.token} role={this.props.role} /></Route>
                                    <Route exact path='/savedEvents'><SavedEvents eventUpdateCounter={this.eventUpdateCounter} eventChangeCounter={this.state.eventChangeCounter} token={this.props.token} /></Route>
                                </Switch>
                            </Col>
                            <Col sm={3} className='eventViews'>
                                <Events eventUpdateCounter={this.eventUpdateCounter} eventChangeCounter={this.state.eventChangeCounter} token={this.props.token} />
                            </Col>
                        </Row>
                    </Router>
                </Container>
            </div>
        )
    }
}

export default Home