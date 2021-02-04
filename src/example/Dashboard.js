import React, { Component } from "react";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardHeader from "reactstrap/lib/CardHeader";
import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Form from "reactstrap/lib/Form";
import Input from "reactstrap/lib/Input";
import 'react-dates/initialize';
// import TextField from '@material-ui/core/TextField';
import 'react-dates/lib/css/_datepicker.css';
import "./Example.css";
import DatePicker from 'react-datepicker';
import TextField from '@material-ui/core/TextField';

import { connect } from "react-redux";
import { Logout } from "../store/actions/authactions";
import Loader from "react-loader-spinner";
// import './Example.css'
import Paper from "@material-ui/core/Paper";
// import {fetchPosts,addPost} from './store/actions/actions'
// import Card from '@material-ui/core/Card';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";
import Label from "reactstrap/lib/Label";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import Row from "reactstrap/lib/Row";
import {
  addPost,
  fetchPosts,
  deletePost,
  editPost,
} from "../store/actions/actions";
import Table from "reactstrap/lib/Table";
import { Flag } from "react-bootstrap-icons";
import { Fade } from "@material-ui/core";


var today = new Date();
var date =
(today.getMonth() + 1) + "/" + today.getDate()+ "/" + today.getFullYear()  ;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_post_modal: false,
      add_post_modal: false,
      amount: "",
      description: "",
      type: "",
      id: "",
      startDate:null,
      created_by: "",
      created_at: "",
      userid: "",
      daily_entries: this.props.posts,
      Company_expense: this.props.posts,
      Company_expenditure: this.props.posts,
      loading: false,
      spinColor: "#fff",
      searchText:"",
      searchColumn:"",
      date:""
      };
  }
  
  
  componentDidMount = async () => {
    var user = await JSON.parse(localStorage.getItem("user"));
    this.setState({
      created_by: user.uid,
    });
    await this.setState({
      userid: user.uid,
    });
    this.props.fetchPosts(user.uid);
    console.log(this.state.daily_entries);
    console.log(this.state.Company_expense);
    console.log(this.state.Company_expenditure);
    const arr = this.state.daily_entries.filter(
      (daily_entry) => daily_entry.type === "Daily Income"
    );
    console.log(arr);
    const arr2 = this.state.daily_entries.filter(
      (item) => item.type === "Company Expence"
    );
    console.log(arr2);

    const arr3 = this.state.daily_entries.filter(
      (item) => item.type === "Expenditure"
    );
    console.log(arr3);
  };



  fetchPosts = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2000);
  };

  addPostToggle = () => {
    this.setState({
      add_post_modal: !this.state.add_post_modal,
     
    });
  };

  handlechange = (e ,value) => {
    console.log('this.state.date',this.state.date);
    this.setState({
      [e.target.name]: e.target.value,
    
    });
    console.log(e);
  };
  handleSubmit = (e) => {
    this.addPostToggle();
    e.preventDefault();
    this.props.addPost({
      amount: this.state.amount,
      description: this.state.description,
      type: this.state.type,
      created_by: this.state.created_by,
      uid: this.state.userid,
      created_at:
      (today.getMonth() + 1) + "/" + today.getDate()+ "/" + today.getFullYear()  
       
    });
    this.fetchPosts();
  };
  editPostToggle = () => {
    this.setState({
      edit_post_modal: !this.state.edit_post_modal,
      
    });
  };
  deletePosts(item) {
    this.props.deletePost(item);
  }

  handleInputType = (e) => {
    this.setState({
      type: e.target.value,

    });
    console.log(e);
  };

  render() {
    const { loading } = this.state;
   

    if (this.props.loggedIn === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {this.state.loading ? (
          <div
            style={{
              position: "absolute",
              width: "100%",
              hieght: "100%",
              marginTop: "20%",
              marginLeft: "40%",
            }}
          >
            <Loader type="Circle" color="black" height="60" width="100" />
          </div>
        ) : (
          <div>
            <container>
            <DatePicker className="mt-3" selected={this.state.startDate} onChange={date => this.setState({
                startDate: date,
                date:date
							})} required />
            

              <br />
              <Row>
                <Col className="text-right">
                  <Button
                    onClick={this.addPostToggle}
                    className="mb-2 text-right"
                    size="md"
                    color="danger"
                  >
                    Add Post
                  </Button>
                  <Link className="d-none d-md-inline-block" to="/">
                    <Button
                      onClick={() => {
                        this.props.Logout();
                      }}
                      size="ml"
                      color="warning"
                    >
                      Logout
                    </Button>
                  </Link>
                </Col>
              </Row>
            </container>

            <Modal
              isOpen={this.state.add_post_modal}
              toggle={this.addPostToggle}
            >
              <ModalHeader
              // toggle={this.addPostToggle}
              >
                <span className="text-danger">Daily Cal</span>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                  <Label>Amount</Label>
                  <Input
                    type="text"
                    htmlFor="Amount"
                 
                    className="post_title"
                    onChange={this.handlechange}
                    name="amount"
                    type="number"
                    min="0"
                    required={true}
                  ></Input>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    htmlFor="description"
                    rows={4}
                    className="post_description"
                    required
                    onChange={this.handlechange}
                    name="description"
                  ></Input>
                  <br />
                  <select
                    className="form-control"
                    name="city"
                    value={this.state.type}
                    onChange={this.handleInputType}
                  >
                    <option>Select Caluclator</option>
                    <option value="Daily Income">Daily Income</option>
                    <option value="Company Expence">Company Expense</option>
                    <option value="Expenditure">Expenditure</option>
                  </select>
                  <Row>
                    <Col className="text-right">
                      <Button
                        // onClick=
                        // {this.fetchPosts()}
                        className="mt-2"
                        type="submit"
                        size="md"
                        color="danger"
                      >
                        {loading && (
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        Add Post
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
            <Modal
              isOpen={this.state.edit_post_modal}
              toggle={this.editPostToggle}
            >
              <ModalHeader toggle={this.editPostToggle}>
                <span className="text-danger"> EDIT Daily Cal</span>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Label>Amount</Label>
                  <Input
                    type="text"
                    value={this.state.amount}
                    className="post_title"
                    onChange={this.handlechange}
                    name="amount"
                    
                    required
                  ></Input>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    rows={4}
                   
                    value={this.state.description}
                    className="post_description"
                    onChange={this.handlechange}
                    name="description"
                    required
                  ></Input>
                  <br />
                  <select
                    className="form-control"
                    name="city"
                    value={this.state.type}
                    onChange={this.handleInputType}
                  >
                    <option>Select Caluclator</option>
                    <option className="post_Daily_Income" value="Daily Income">
                      Daily Income
                    </option>
                    <option value="Company Expence">Company Expense</option>
                    <option value="Expenditure">Expenditure</option>
                  </select>
                  <Row>
                    <Col className="text-right">
                      <Button
                        className="mt-2"
                        onClick={() => {
                          this.props.editPost(this.state.id, {
                            amount: this.state.amount,
                            description: this.state.description,
                            type: this.state.type,
                            userid: this.state.userid,
                          });
                          this.editPostToggle();
                          this.fetchPosts();
                        }}
                        size="md"
                        color="danger"
                      >
                        {loading && (
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        {loading && <span>Update</span>}
                        {!loading && <span>Update</span>}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
            <Grid container spacing={5}>
              <Grid item xs={12} lg={4} md={12}>
                <Paper>Daily Income</Paper>

                <Card>
                  <CardBody>
                    <Table bordered>
                      <thead color="blue">
                        <tr>
                          <th>Income</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.posts
                          .filter((item) => item.type === "Daily Income" && item.created_at==="02/01/2021")
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td scope="row">{item.amount}</td>
                                <td scope="row">{item.description}</td> 
                                <td>
                                  <Button
                                    color="white"
                                    //  disabled={loading}
                                    onClick={() => {
                                      console.log(item.id);
                                      this.props.deletePost(
                                        item.id,
                                        this.state.userid
                                      );
                                      this.fetchPosts();
                                    }}
                                  >
                                    {loading && (
                                      <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                      />
                                    )}
                                    <i className="fas fa-trash" />{" "}
                                  </Button>
                                  {/* <Row>
        <Col className="text-right"> */}
                                  <Button
                                    color=""
                                    onClick={() => {
                                      this.setState({
                                        edit_post_modal: !this.state
                                          .edit_post_modal,
                                        amount: item.amount,
                                        description: item.description,
                                        id: item.id,
                                        type: item.type,
                                      });

                                      console.log(this.state.userid);
                                    }}
                                  >
                                    <i class="fas fa-edit"></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Grid>

              <Grid item xs={12} lg={4} md={12}>
                <Paper>Company Expense</Paper>

                <Card>
                  <CardBody>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>Income</th>
                          <th>Description</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.posts
                          .filter((item) => item.type=== "Company Expence")
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td scope="row">{item.amount}</td>
                                <td scope="row">{item.description}</td>
                                <td>
                                  <Button
                                    color="white"
                                    onClick={() => {
                                      this.props.deletePost(
                                        item.id,
                                        this.state.userid
                                      );
                                    }}
                                  >
                                   
                                    <i className="fas fa-trash" />
                                  </Button>
                                  <Button
                                    color="white"
                                    onClick={() => {
                                      this.setState({
                                        edit_post_modal: !this.state
                                          .edit_post_modal,
                                        amount: item.amount,
                                        description: item.description,
                                        id: item.id,
                                        type: item.type,
                                      });
                                    }}
                                  >
                                    <i class="fas fa-edit"></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4} md={12}>
                <Paper>Daily Expense</Paper>

                <Card>
                  <CardBody>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>Income</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.posts
                          .filter((item) => item.type === "Expenditure")
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td scope="row">{item.amount}</td>
                                <td scope="row">{item.description}</td>
                                <td>
                                  <Button
                                    color="white"
                                    onClick={() => {
                                      this.props.deletePost(
                                        item.id,
                                        this.state.userid
                                      );
                                    }}
                                  >
                                  
                                    <i className="fas fa-trash  " />
                                  </Button>
                                  <Button
                                    color="white"
                                    onClick={() => {
                                      this.setState({
                                        edit_post_modal: !this.state
                                          .edit_post_modal,
                                        amount: item.amount,
                                        description: item.description,
                                        type: item.type,
                                        id: item.id,
                                      });
                                    }}
                                  >
                                    <i class="fas fa-edit"></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    posts: state.posts.posts,
    userid: state.userid,
  };
};
export default connect(mapStateToProps, {
  fetchPosts,
  addPost,
  Logout,
  deletePost,
  editPost,
})(Dashboard);

