import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const Update = () => {
  const storedUser = useLoaderData();
  const [user, setUser] = useState(storedUser);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/users/${storedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("User Update Successfull!");
          navigate("/");
        }
      });
  };

  const handleInputChange = (event) => {
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
            <h4 className="text-center">Update User</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={storedUser.name}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  defaultValue={storedUser.address}
                  onChange={handleInputChange}
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  defaultValue={storedUser.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Button variant="primary" className="w-100" type="submit">
                Update User
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Update;
