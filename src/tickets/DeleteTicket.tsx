import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import APIURL from '../helpers/environment';


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

        fetch(`${APIURL}ticket/deleteticket/${this.props.ticketId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.handleChangeCounter();
            })
    }

    render() {
        return (
            <div>
                {/* Handles the delete function of each ticket */}
                <div>
                    <span onClick={(e) => this.handleDelete(e)}><RiDeleteBinLine />Delete</span>
                </div>
            </div>
        )
    }
}

export default DeleteTicket