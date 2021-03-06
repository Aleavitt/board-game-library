import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import FormGroup from "react-bootstrap/FormGroup";

class AddGameModal extends Component {
  render() {
    const { lengthMin, playerMin, onHide, setAddGameModalShow } = this.props;
    return (
      <Modal
        show={setAddGameModalShow}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new game to your bookshelf
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.props.saveGame}>
          <Modal.Body>
            <div className="container">
              <Form.Control
                className="mb-2"
                size="lg"
                type="text"
                placeholder="Name"
                name="name"
                onChange={this.props.handleFormChange}
              />
              <Form.Control
                as="textarea"
                rows="3"
                className="mb-2"
                placeholder="Description"
                name="description"
                onChange={this.props.handleFormChange}
              />
              <Form.Group>
                <Form.Label className="float-left">
                  Game Length (Minutes)
                </Form.Label>
                <Form.Row>
                  <Col style={{ maxWidth: "100px" }}>
                    <Form.Control
                      style={{ width: "100px" }}
                      type="number"
                      step="any"
                      placeholder="Min"
                      name="lengthMin"
                      onChange={this.props.handleFormChange}
                    ></Form.Control>
                  </Col>
                  <Col style={{ maxWidth: "100px" }}>
                    <Form.Control
                      style={{ width: "100px" }}
                      type="number"
                      step="any"
                      placeholder="Max"
                      min={lengthMin}
                      name="lengthMax"
                      onChange={this.props.handleFormChange}
                    ></Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Label className="float-left"># of Players</Form.Label>
                <Form.Row>
                  <Col style={{ maxWidth: "100px" }}>
                    <Form.Control
                      style={{ width: "100px" }}
                      type="number"
                      placeholder="Min"
                      name="playerMin"
                      onChange={this.props.handleFormChange}
                    ></Form.Control>
                  </Col>
                  <Col style={{ maxWidth: "100px" }}>
                    <Form.Control
                      style={{ width: "100px" }}
                      type="number"
                      placeholder="Max"
                      name="playerMax"
                      min={playerMin}
                      onChange={this.props.handleFormChange}
                    ></Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Row>
                <FormGroup>
                  <Col className="mr-2" style={{ maxWidth: "100px" }}>
                    <Form.Label>Your Rating</Form.Label>
                    <Form.Control
                      style={{ width: "100px" }}
                      type="number"
                      step="any"
                      name="userRating"
                      onChange={this.props.handleFormChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col style={{ maxWidth: "100px" }}>
                    <Form.Label>Official Rating</Form.Label>
                    <Form.Control
                      style={{ width: "100px" }}
                      type="number"
                      step="any"
                      name="officialRating"
                      onChange={this.props.handleFormChange}
                    />
                  </Col>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <Form.Control
                  type="url"
                  name="backgroundURL"
                  onChange={this.props.handleFormChange}
                  placeholder="Background Image URL"
                />
              </Form.Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddGameModal;
