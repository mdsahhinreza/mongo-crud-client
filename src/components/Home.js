import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);
  const handleDelete = (user) => {
    const agree = window.confirm(`Are you sure to delete ${user.name}`);
    if (agree) {
      // console.log(user);
      fetch(`http://localhost:5000/delete/user/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("User Deleted Succfully");
            const remainingdata = displayUsers.filter(
              (data) => data._id !== user._id
            );
            setDisplayUsers(remainingdata);
          }
        });
    }
    console.log(agree);
  };
  return (
    <div className="mt-5">
      <Container>
        <Row>
          <h4 className="text-center">User List</h4> <hr />
          <Col lg="12" className="">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#sl</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.map((user, sl) => (
                  <tr key={user._id}>
                    <td>{sl + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.address}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      <Link to={`/update/${user._id}`}>
                        <Button variant="primary" className="btn-sm me-2">
                          Update
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => handleDelete(user)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
