import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


type DeleteTicketProps = {
    token: string | null
    ticketId: number
    handleChangeCounter: () => void
}

type DeleteTicketState = {

}

class DeleteTicket extends Component<DeleteTicketProps, DeleteTicketState> {
    constructor(props: DeleteTicketProps) {
        super(props)
        this.state = {

        }
    }

    handleDelete = (e: React.MouseEvent): void => {
        e.preventDefault()

        fetch(`http://localhost:5000/ticket/deleteticket/${this.props.ticketId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.props.handleChangeCounter();
            })
    }

    render() {
        return (
            <div>
                <div>
                    <span onClick={(e) => this.handleDelete(e)}>Delete</span>
                </div>
            </div>
        )
    }
}

export default DeleteTicket