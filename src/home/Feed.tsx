import React, { Component, VoidFunctionComponent } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsThreeDots } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

type FeedProps = {
    token: string | null
}

type FeedState = {
    modalShow: boolean
    post: string
    postData: PostsType | { [key: string]: undefined }
    isPostMenuOpen: boolean
}

type PostsType = {
    AllPosts: AllPostsType[]
    userId: number
    userRole: string
}

type AllPostsType = {
    AdminId: null | number
    Post: string
    User: { [key: string]: number | string }
    UserId: number | null
    createdAt: string
    id: number
    updatedAt: string
}

class Feed extends Component<FeedProps, FeedState> {
    constructor(props: FeedProps) {
        super(props)
        this.state = {
            modalShow: false,
            post: '',
            postData: {},
            isPostMenuOpen: false
        }
        this.postEditHandler = this.postEditHandler.bind(this)
    }

    handleClose = (): void => {
        this.setState({ modalShow: false })
    }

    handleShow = (e: React.MouseEvent): void => {
        this.setState({ modalShow: true })
    }

    handleFetch = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        fetch('http://localhost:5000/post/create', {
            method: 'POST',
            body: JSON.stringify({
                feed: {
                    Post: this.state.post
                }
            }),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.handleClose()
                this.componentDidMount()
            })
    }

    componentDidMount() {
        fetch('http://localhost:5000/post/allposts', {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    postData: data
                })

                console.log(data)
            })
    }

    postEditHandler = (e: any):void => {
        console.log('I was clicked!')
       let postMenu: any = document.querySelector('.postMenu');
       postMenu.classList.toggle('displayPostMenu')
    }

    render() {
        return (
            <Container className='mainFeedWrapper'>
                <Row className='feedWrapper'>
                    <Col className='postBox rounded-pill' onClick={(e) => this.handleShow(e)}>
                        <p>Start a post</p>
                    </Col>
                </Row>

                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            className='modalFeedText'
                            as="textarea"
                            placeholder="What do you want to talk about"
                            value={this.state.post}
                            onChange={(e) => this.setState({ post: e.target.value })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => this.handleFetch(e)}>
                            Post
                        </Button>
                    </Modal.Footer>
                </Modal>
                {this.state.postData.AllPosts
                    ?
                    this.state.postData.AllPosts.reverse().map((post, index) => {
                        return (
                            <Row key={post.id} className='feedposts'>
                                <Col className='postName'>
                                    <Row className='postNameRow'>
                                        <Col>{post.AdminId ? <h4>Admin-{post.AdminId}</h4> : <h4>{post.User.FirstName}</h4>}</Col>
                                        {post.UserId && this.state.postData.userRole === 'Tenant'
                                            ? post.UserId === this.state.postData.userId
                                                ? <Col onClick={(e)=> this.postEditHandler(e)} className='postMenuCtrl'><BsThreeDots /></Col>
                                                : undefined
                                            : undefined}
                                        {this.state.postData.userRole === 'Admin' ? <Col onClick={()=> this.postEditHandler} className='postMenuCtrl'><BsThreeDots /></Col> : undefined}
                                        <Col className='postMenu'> 
                                            <Row className='postMenuOptions'>
                                                <Col>Edit</Col>
                                                <Col>Delete</Col>
                                                <MdClose/>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='postBody'>
                                    <p>{post.Post}</p>
                                </Col>
                            </Row>
                        )
                    })
                    :
                    undefined}

            </Container>
        )
    }
}

export default Feed