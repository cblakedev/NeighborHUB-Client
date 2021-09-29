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

type HomeProps = {
    token: string | null
    clearToken: () => void
    role: string | null
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
                    <Col className='homeBtn'> <p>NeighborHUB</p></Col>
                    <Col className='signedInAs'><p>Signed in as Username</p></Col>
                </Row>
                <Container className='mainHomeWrapper'>
                    <Router>

                        <Row className='homeWrapper'>
                            <Col className='homeLinks'>
                                <ul className='navItems'>
                                    <li><Link to='/'><IoIosHome/> Home</Link></li>
                                    <li><Link to='/tickets'><GoIssueReopened /> Tickets</Link></li>
                                    <li><Link to='/savedEvents'><BiCalendarEvent /> Events</Link></li>
                                </ul>
                                <Row className='logoutBtnWrapper'>
                                    <Col>
                                        <Button onClick={() => this.props.clearToken()}>Logout</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className='routerViews' sm={6}>
                                <Switch>
                                    <Route exact path='/'><Feed token={this.props.token}/></Route>
                                    <Route exact path='/tickets'><Tickets token={this.props.token} role={this.props.role}/></Route>
                                    <Route exact path='/savedEvents'><SavedEvents /></Route>
                                </Switch>
                            </Col>
                            <Col className='eventViews'>
                                <Events />
                            </Col>
                        </Row>
                    </Router>
                </Container>
            </div>
        )
    }
}

export default Home