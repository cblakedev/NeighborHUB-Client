import React, { Component } from 'react'
import { AllPostsType } from './Feed'

type DeletePostProps = {
    post: AllPostsType
    token: string | null
    counterHandler: (number: number) => void
}

type DeletePostState = {

}

class DeletePost extends Component<DeletePostProps, DeletePostState> {
    constructor(props: DeletePostProps) {
        super(props)
        this.state = {
        }
    }

    handleDelete = (e: React.MouseEvent): void => {
        fetch(`http://localhost:5000/post/deletepost/${this.props.post.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.counterHandler(1)
                console.log(data)
            })
    }


    render() {
        return (
            <div>
                <span onClick={(e) => this.handleDelete(e)}>Delete</span>
            </div>
        )
    }
}

export default DeletePost