import React from "react";
import { ThemeConsumer } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import { user, notification, clearMsg } from "../store/actions/authactions";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import Grid from "@material-ui/core/Grid";

import { Toast } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      msg: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user != this.props.user) {
      this.setState({
        ...this.state,
        user: this.props.user,
      });
    }
    if (prevState.msg != this.props.msg) {
      this.setState({
        ...this.state,
        notification: true,
        msg: this.props.msg,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.user(this.state.email, this.state.password);

    // console.log(this.props.notification)
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.props.loggedIn === true) {
      return <Redirect to="/about" />;
    }

    return (
      <>
        <div className="daily">
          <Col lg="5" md="7">
            <Card className="bg-secondary cal shadow border-0">
              <CardBody className="px-lg-5 py-lg-5 text-center">
                <div className="text-center text-muted mb-4">
                  <h3>Sign in</h3>
                </div>
                <Form
                  className="text-center"
                  role="form"
                  onSubmit={this.handleSubmit}
                >
                  <FormGroup className="mb-6	">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-unlock-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={this.onChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </div>
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: "1",
          }}
        >
          <Toast
            className="bg-white"
            show={this.props.notification}
            onClose={() => {
              this.props.clearMsg();
              this.setState({ ...this.state, notification: false });
            }}
            delay={3000}
            autohide={true}
          >
            {/* <Toast.Header  closeButton={true}>Login Failed</Toast.Header> */}
            <Toast.Body>{this.props.notification}</Toast.Body>
          </Toast>
        </div>
      </>
    );
  }
}
export function mapStateToProps(state) {
  return {
    user: state.auth.user,
    notification: state.auth.notification,
    msg: state.auth.msg,
    loggedIn: state.auth.loggedIn,
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    user: (email, password) => dispatch(user(email, password)),
    clearMsg: () => dispatch(clearMsg()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
