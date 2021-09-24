import React, { Component } from 'react';
import { Container, Row, Col, Modal, Button, Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeletePost from './DeletePost'

type FeedProps = {
    token: string | null
}

type FeedState = {
    modalShow: boolean
    post: string
    postData: PostsType
    changeCounter: number
    updateModalShow: boolean
    selectedPost: string
    selectedPostId: number | undefined
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
            post: '',
            postData: {} as PostsType,
            changeCounter: 0,
            updateModalShow: false,
            selectedPost: '',
            selectedPostId: undefined,
        }
        this.counterHandler = this.counterHandler.bind(this)
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

    counterHandler = (number: number): void => {
        this.setState({
            changeCounter: this.state.changeCounter + number
        })
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
                this.handleClose()
                this.componentDidMount()
                this.setState({
                    post: ''
                })
            })
    }

    handleUpdateFetch = (e: React.MouseEvent): any => {
        fetch(`http://localhost:5000/post/${this.state.selectedPostId}`, {
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
                this.counterHandler(1)
                this.handleUpdateClose()
                console.log(data)
            })
    }

    componentDidMount(): void {
        fetch('http://localhost:5000/post/allposts', {
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
                console.log(data)
            })
    }

    componentDidUpdate(prevProps: FeedProps, prevState: FeedState) {
        if (prevState.changeCounter !== this.state.changeCounter) {
            fetch('http://localhost:5000/post/allposts', {
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
                    console.log(data)
                })
        }
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
                    this.state.postData.AllPosts.map((post) => {
                        return (
                            <Row key={post.id} className='feedposts'>
                                <Col className='postName'>
                                    <Row className='postNameRow'>
                                        <Col>{post.AdminId ? <h4>Admin-{post.AdminId}</h4> : <h4>{post.User.FirstName}</h4>}</Col>
                                        {post.UserId && this.state.postData.userRole === 'Tenant'
                                            ? post.UserId === this.state.postData.userId
                                                ?
                                                <Col>
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="postDropdown"></Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={(e) => { this.handleUpdateShow(e); this.setState({ selectedPostId: post.id, selectedPost: post.Post }) }}>Edit</Dropdown.Item>
                                                            <Dropdown.Item><DeletePost token={this.props.token} post={post} counterHandler={this.counterHandler} /></Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                                : undefined
                                            : undefined}

                                        {this.state.postData.userRole === 'Admin'
                                            ?
                                            <Col>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="postDropdown"></Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={(e) => { this.handleUpdateShow(e); this.setState({ selectedPostId: post.id, selectedPost: post.Post }) }}>Edit</Dropdown.Item>
                                                        <Dropdown.Item><DeletePost token={this.props.token} post={post} counterHandler={this.counterHandler} /></Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            : undefined}
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

                <Modal show={this.state.updateModalShow} onHide={this.handleUpdateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            className='modalFeedText'
                            as="textarea"
                            value={this.state.selectedPost}
                            onChange={(e) => this.setState({ selectedPost: e.target.value })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleUpdateClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => this.handleUpdateFetch(e)}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        )
    }
}

export default Feed