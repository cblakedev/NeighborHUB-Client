import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillPlusCircle } from 'react-icons/ai'

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

    timeConvert = (date: string): string => {
        const time = new Date(date).toLocaleTimeString('en',
            { timeStyle: 'short', hour12: true, timeZone: 'UTC' });

        return time
    }

    dateConvert = (date: string): string => {
        const myDate = new Date(date);
        return `${(myDate.getMonth() + 1)}-${myDate.getDate()}-${myDate.getFullYear()}`
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
                                        <span><h5>Date:</h5> {this.dateConvert(event.dates.start.dateTime)}, </span>
                                        <span><h5>Time:</h5> {this.timeConvert(event.dates.start.dateTime)}</span>
                                        <div className='eventBtns'>
                                            <Button href={event.url}>Get Tickets</Button>
                                            <span><AiFillPlusCircle /></span>
                                        </div>

                                    </Col>
                                </Row>
                            )
                        })
                        :
                        undefined
                }

            </>
        )
    }
}

export default Events



