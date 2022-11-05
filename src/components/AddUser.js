import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddUser = () => {
  const [user, setUser] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // const name = form.name.value;
    // const email = form.email.value;
    // console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("User Added Successfull");
          form.reset();
        }
      });
  };

  const handleInputBlare = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
  };
  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col lg="6" className="m-auto border p-3 border-primary rounded">
            <h4 className="text-center">Please Add a new User!</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  onBlur={handleInputBlare}
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  onBlur={handleInputBlare}
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  onBlur={handleInputBlare}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Button variant="primary" className="w-100" type="submit">
                Add User
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddUser;
