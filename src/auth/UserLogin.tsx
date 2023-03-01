import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import APIURL from "../helpers/environment";

type UserLoginProps = {
	updateToken: (newToken: string, role: string) => void;
};

type UserLoginState = {
	validated: boolean;
	email: string;
	password: string;
	loginError: string;
    submitClicked: boolean;
};

class UserLogin extends Component<UserLoginProps, UserLoginState> {
	constructor(props: UserLoginProps) {
		super(props);
		this.state = {
			validated: false,
			email: "",
			password: "",
			loginError: "",
            submitClicked: false,
		};
	}

	handleFetch = (): void => {
		this.setState({
			loginError: "",
		});

		if (this.state.email && this.state.password) {
            this.setState({
                submitClicked: true
            })

			fetch(`${APIURL}user/login`, {
				method: "POST",
				body: JSON.stringify({
					user: {
						Email: this.state.email,
						Password: this.state.password,
					},
				}),
				headers: new Headers({
					"Content-Type": "application/json",
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					this.props.updateToken(data.sessionToken, data.user.Role);
					this.setState({
						email: "",
						password: "",
					});
				})
				.catch((err) => {
					this.setState({
						loginError: "Invalid email or password.",
                        submitClicked: false
					});
					console.log(err);
				});
		}
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		this.setState({ validated: true });
		this.handleFetch();
	};

	render() {
		return (
			<Container className="mainWrapper">
				<Row>
					<Col>
						<h1 className="appTitle">NeighborHUB</h1>
						<h4 className="appUser">Tenant Portal</h4>
					</Col>
				</Row>

				{/* User Login Form */}
				<Row className="loginWrapper">
					<Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
						<Form.Group className="mt-3" as={Col} md="12" controlId="validationCustom01">
							<Form.Control
								required
								type="email"
								value={this.state.email}
								placeholder="Email"
								onChange={(e) => this.setState({ email: e.target.value })}
							/>
							{this.state.loginError ? <p className="loginValidator">{this.state.loginError}</p> : undefined}
						</Form.Group>
						<Form.Group className="mt-3" as={Col} md="12" controlId="validationCustom02">
							<Form.Control
								required
								type="password"
								value={this.state.password}
								placeholder="Password"
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
							{this.state.loginError ? <p className="loginValidator">{this.state.loginError}</p> : undefined}
						</Form.Group>
						<Button type="submit" className={`${this.state.submitClicked ? "d-none" : ""} mt-3 loginSubmitBtn`}>
							Login
						</Button>
						<Button className={`${this.state.submitClicked ? "" : "d-none"} mt-3 loginSpinner disabled`}>
							<Spinner className="me-1" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							Loading...
						</Button>
					</Form>
				</Row>
			</Container>
		);
	}
}

export default UserLogin;
