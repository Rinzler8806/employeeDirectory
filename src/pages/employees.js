/* eslint-disable */

import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";



class Employees extends Component {
  state = {
    userData: [],
    value: "",
    search: ""
  }
  componentDidMount() {
    this.loadEmployees();
  }
  loadEmployees = () => {
    API.getMultipleUsers()
      .then(res => {
        console.log(res.data.results)
        this.setState({
          userData: res.data.results
        })
      })
  }

  change = (e) => {
    if (e.target.value==="location") {
      this.sortLocation()
    } else {this.sortFirstName()}
  }

  sortFirstName = () => {
    var sorted = this.state.userData.sort((a, b) => {
      if (a.name.first > b.name.first) return 1;
      else if (b.name.first > a.name.first) return -1;
      else return 0;
    });
    console.log(sorted)
    this.setState({ userData: sorted})
  }

  sortLocation = () => {
    var sorted = this.state.userData.sort((a, b) => {
      if (a.location.state > b.location.state) return 1;
      else if (b.location.state > a.location.state) return -1;
      else return 0;
    });
    console.log(sorted)
    this.setState({ userData: sorted})
  }

  handleInputChange = event => {
    console.log(event.target.value)
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.userData)
    var filter = this.state.userData.filter(user => {
      return user.name.first.toLowerCase() === this.state.search.toLowerCase()
    })
    console.log(filter)
    this.setState({ userData: filter })
  };
  render() {
    return (
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Employee Directory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <select id="lang" onChange={this.change} value={this.state.value}>
                <option value="">Sort</option>
                  <option value="location">Location</option>
                  <option value="firstName">First Name</option>
               </select>
            </Nav>
            <Form inline onSubmit={this.handleFormSubmit}>
              <FormControl onChange={this.handleInputChange} type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <h1 className="text-center">Find an employee</h1>
        <Row>{this.state.userData.map(employees => (
          <Col><Card
            key={employees.id.value}
            image={employees.picture.medium}
            first={employees.name.first}
            last={employees.name.last}
            location={employees.location.state}
          />
          </Col>
        ))}</Row>

      </Container>
    );
  }
}

export default Employees;