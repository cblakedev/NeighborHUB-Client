import React, { Component } from 'react';
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
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
import { GiHamburgerMenu } from 'react-icons/gi'

type HomeProps = {
    token: string | null
    clearToken: () => void
    role: string | null
}

type HomeState = {
    eventChangeCounter: number
    showCanvas: boolean
}

class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)
        this.state = {
            eventChangeCounter: 0,
            showCanvas: false
        }
        this.eventUpdateCounter = this.eventUpdateCounter.bind(this)
    }

    eventUpdateCounter = (): void => {
        this.setState({
            eventChangeCounter: this.state.eventChangeCounter + 1
        })
    }

    handleCanvasShow = (): void => {
        this.setState({
            showCanvas: true
        })
    }

    handleCanvasClose = (): void => {
        this.setState({
            showCanvas: false
        })
    }

    toggleMenu = (): void => {

    }

    render() {
        return (
            <div>
                <Router>
                    <Row className='headerBar g-0'>
                        <Col className='homeBtn'>
                            <span onClick={(e) => this.handleCanvasShow()}><GiHamburgerMenu /></span>
                            <h3 className='headerTitle'><a href='/'>NeighborHUB</a></h3>
                        </Col>

                        <Offcanvas className='navLinksCanvas' show={this.state.showCanvas} onHide={() => this.handleCanvasClose()}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>NeighborHUB</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className='navLinksCanvasBody'>
                                <Row>
                                    <Col className='homeCanvasLinks'>
                                        <ul className='navItems'>
                                            <li onClick={(e) => this.handleCanvasClose()}><Link to='/'><IoIosHome /> Home</Link></li>
                                            <li onClick={(e) => this.handleCanvasClose()}><Link to='/tickets'><GoIssueReopened /> Tickets</Link></li>
                                            <li onClick={(e) => this.handleCanvasClose()}><Link to='/savedEvents'><BiCalendarEvent /> Events</Link></li>
                                        </ul>
                                        <Row className='logoutBtnWrapper'>
                                            <Col>
                                                <Button onClick={() => this.props.clearToken()}><RiLogoutBoxLine />Logout</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Row>
                    <Container className='mainHomeWrapper'>
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
                            <Col className='routerViews' md={7}>
                                <Switch>
                                    <Route exact path='/'><Feed eventUpdateCounter={this.eventUpdateCounter} eventChangeCounter={this.state.eventChangeCounter} token={this.props.token} /></Route>
                                    <Route exact path='/tickets'><Tickets token={this.props.token} role={this.props.role} /></Route>
                                    <Route exact path='/savedEvents'><SavedEvents eventUpdateCounter={this.eventUpdateCounter} eventChangeCounter={this.state.eventChangeCounter} token={this.props.token} /></Route>
                                </Switch>
                            </Col>
                            <Col md={4} xl={3} className='eventViews'>
                                <Events eventUpdateCounter={this.eventUpdateCounter} eventChangeCounter={this.state.eventChangeCounter} token={this.props.token} />
                            </Col>
                        </Row>

                    </Container>
                </Router>
            </div>
        )
    }
}

export default Home