import React, { Component } from 'react';
import { Container, Row, Col, Modal, Button, Form, Dropdown, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeletePost from './DeletePost';
import { BsThreeDots } from 'react-icons/bs';
import Moment from 'react-moment';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import Events from '../events/Events';
import { BiCalendarEvent } from 'react-icons/bi';
import APIURL from '../helpers/environment';


type FeedProps = {
    token: string | null
    eventChangeCounter: number
    eventUpdateCounter: () => void
}

type FeedState = {
    modalShow: boolean
    validated: boolean
    post: string
    postData: PostsType
    changeCounter: number
    updateModalShow: boolean
    selectedPost: string
    selectedPostId: number | undefined
    showCanvas: boolean
}

export interface PostsType {
    AllPosts: AllPostsType[]
    userId: number
    userRole: string
}

export interface AllPostsType {
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
            validated: false,
            post: '',
            postData: {} as PostsType,
            changeCounter: 0,
            updateModalShow: false,
            selectedPost: '',
            selectedPostId: undefined,
            showCanvas: false
        }
        this.handleChangeCounter = this.handleChangeCounter.bind(this)
    }

    handleClose = (): void => {
        this.setState({ modalShow: false })
    }

    handleShow = (e: React.MouseEvent): void => {
        this.setState({ modalShow: true })
    }

    handleUpdateClose = (): void => {
        this.setState({ updateModalShow: false })
    }

    handleUpdateShow = (e: React.MouseEvent): any => {
        e.preventDefault()
        this.setState({ updateModalShow: true })

    }

    handleChangeCounter = (): void => {
        this.setState({
            changeCounter: this.state.changeCounter + 1
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

    handleCreate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({ validated: true });
        this.handleFetch()
    }

    handleFetch = (): void => {
        if (this.state.post) {
            fetch(`${APIURL}post/create`, {
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
                    this.handleClose()
                    this.handleChangeCounter()
                    this.setState({
                        post: ''
                    })
                })
        }
    }

    handleUpdateFetch = (e: React.MouseEvent): any => {
        fetch(`${APIURL}post/${this.state.selectedPostId}`, {
            method: 'PUT',
            body: JSON.stringify({
                feed: {
                    Post: this.state.selectedPost
                }
            }),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.handleChangeCounter()
                this.handleUpdateClose()
            })
    }

    componentDidMount(): void {
        fetch(`${APIURL}post/allposts`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                data.AllPosts.sort(function (a: AllPostsType, b: AllPostsType): number {
                    return b.createdAt.localeCompare(a.createdAt);
                })
                this.setState({
                    postData: data
                })
            })
    }

    componentDidUpdate(prevProps: FeedProps, prevState: FeedState) {
        if (prevState.changeCounter !== this.state.changeCounter) {
            fetch(`${APIURL}post/allposts`, {
                method: 'GET',
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    data.AllPosts.sort(function (a: AllPostsType, b: AllPostsType): number {
                        return b.createdAt.localeCompare(a.createdAt);
                    })
                    this.setState({
                        postData: data
                    })
                });
        }
    }

    render() {
        return (
            <Container className='mainFeedWrapper'>

                {/* Create new post bar. */}
                <Row className='feedWrapper'>
                    <Col className='postBox rounded-pill' onClick={(e) => this.handleShow(e)}>
                        <p>Start a post</p>
                    </Col>

                    {/* Responsive events button that activates for smaller viewports. */}
                    <Row className='eventCanvasBtnRow'>
                        <Col className='eventCanvasBtnCol'>
                            <Button className='eventCanvasBtn' variant="outline-success" onClick={() => this.handleCanvasShow()}><BiCalendarEvent />Events</Button>
                        </Col>
                    </Row>
                </Row>

                {/* Create new post modal */}
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modalFeedBody'>
                        <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleCreate(e)}>
                            <Form.Group controlId='postfeedcontrol'>
                                <Form.Control
                                    required
                                    className='modalFeedText'
                                    as="textarea"
                                    placeholder="What do you want to talk about"
                                    value={this.state.post}
                                    onChange={(e) => this.setState({ post: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Post text required.</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" className='mt-3' type='submit'>
                                <IoIosCreate /> Post
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* All mapped posts within the feed. */}
                {this.state.postData.AllPosts
                    ?
                    this.state.postData.AllPosts.map((post) => {
                        return (
                            <Row key={post.id} className='feedposts'>
                                <Col>
                                    <Row>
                                        <Col xs={10} className='postNameCol'>
                                            {post.AdminId ? <h4>Admin-{post.AdminId}</h4> : <h4>{post.User.FirstName}</h4>}
                                            <i><Moment className='postTimeStamp' fromNow>{post.createdAt}</Moment></i>
                                        </Col>
                                        {post.UserId && this.state.postData.userRole === 'Tenant'
                                            ? post.UserId === this.state.postData.userId
                                                ?
                                                <Col xs={2} className='postDropdownCol'>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant='light' id="postDropdown"><BsThreeDots /></Dropdown.Toggle> {/* Dropdown menu for each post */}
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={(e) => { this.handleUpdateShow(e); this.setState({ selectedPostId: post.id, selectedPost: post.Post }) }}><AiOutlineEdit />Edit</Dropdown.Item>
                                                            <Dropdown.Item><DeletePost token={this.props.token} post={post} handleChangeCounter={this.handleChangeCounter} /></Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                                : undefined
                                            : undefined}

                                        {this.state.postData.userRole === 'Admin'
                                            ?
                                            <Col xs={2} className='postDropdownCol'>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant='light' id="postDropdown"><BsThreeDots /></Dropdown.Toggle> {/* Dropdown menu for each post */}
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={(e) => { this.handleUpdateShow(e); this.setState({ selectedPostId: post.id, selectedPost: post.Post }) }}><AiOutlineEdit />Edit</Dropdown.Item>
                                                        <Dropdown.Item><DeletePost token={this.props.token} post={post} handleChangeCounter={this.handleChangeCounter} /></Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            : undefined}
                                    </Row>

                                    {/* Body of each post. */}
                                    <Row className='postBody'>
                                        <Col>
                                            <p>{post.Post}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    })
                    :
                    undefined}

                {/* Update modal for each post. */}
                <Modal show={this.state.updateModalShow} onHide={() => this.handleUpdateClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='feedModalBody'>
                        <Form.Control
                            className='modalFeedText'
                            as="textarea"
                            value={this.state.selectedPost}
                            onChange={(e) => this.setState({ selectedPost: e.target.value })}
                        />
                        {this.state.selectedPost
                            ?
                            <Button className='mt-3' variant="primary" onClick={(e) => this.handleUpdateFetch(e)}>
                                <AiOutlineEdit />Edit
                            </Button>
                            :
                            <Button className='mt-3' variant="primary" disabled>
                                <AiOutlineEdit />Edit
                            </Button>
                        }
                    </Modal.Body>
                </Modal>

                {/* Responsive canvas that activates for smaller viewports. Toggleable by responsive events button. */}
                <Offcanvas placement='end' show={this.state.showCanvas} onHide={() => this.handleCanvasClose()}>
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                        <Events eventUpdateCounter={this.props.eventUpdateCounter} eventChangeCounter={this.props.eventChangeCounter} token={this.props.token} />
                    </Offcanvas.Body>
                </Offcanvas>

            </Container>
        )
    }
}

export default Feed