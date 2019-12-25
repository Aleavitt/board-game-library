import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import FormGroup from "react-bootstrap/FormGroup";

class EditGameModal extends Component {
  render() {
    const {
      onHide,
      editGameModalShow,
      game,
      handleFormChange,
      handleTagChange
    } = this.props;
    return (
      <Modal
        show={editGameModalShow}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.props.saveEdit}>
          <Modal.Body>
            <div className="container">
              <Form.Control
                className="mb-2"
                size="lg"
                type="text"
                placeholder={game.name}
                name="name"
                onChange={handleFormChange}
              />
              <Form.Control
                className="mb-2"
                type="text"
                placeholder={game.description}
                name="description"
                onChange={handleFormChange}
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
                      placeholder={game.length.min}
                      name="lengthMin"
                      onChange={handleFormChange}
                    ></Form.Control>
                  </Col>
                  <Col style={{ maxWidth: "100px" }}>
                    <Form.Control
                      style={{ width: "100px" }}
                      type="number"
                      step="any"
                      placeholder={game.length.max}
                      min={game.length.min}
                      name="lengthMax"
                      onChange={handleFormChange}
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
                      placeholder={game.numPlayers.min}
                      name="playerMin"
                      onChange={handleFormChange}
                    ></Form.Control>
                  </Col>
                  <Col style={{ maxWidth: "100px" }}>
                    <Form.Control
                      style={{ width: "100px" }}
                      type="number"
                      placeholder={game.numPlayers.max}
                      name="playerMax"
                      min={game.numPlayers.min}
                      onChange={handleFormChange}
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
                      placeholder={game.userRating}
                      onChange={handleFormChange}
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
                      placeholder={game.officialRating}
                      onChange={handleFormChange}
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
              <Form.Row>
                <div className="tagContainer">
                  <FormGroup
                    style={{
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    <Form.Label style={{ width: "100%", borderBottom: "1px" }}>
                      Tags
                    </Form.Label>
                    <div style={{ overflow: "auto" }}>
                      {this.props.userTags.map(tag => (
                        <Form.Check
                          custom
                          inline
                          key={"tagCheckbox" + tag}
                          label={tag}
                          type="checkbox"
                          tag={tag}
                          id={"editModalTagCheck" + tag}
                          onChange={handleTagChange}
                          checked={
                            !!this.props.game.tags
                              ? this.props.game.tags.includes(tag)
                              : null
                          }
                        />
                      ))}
                    </div>
                  </FormGroup>
                </div>
              </Form.Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success">
              Save
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => this.props.deleteGame()}
            >
              Delete Game
            </Button>
            <Button type="reset" variant="secondary">
              Reset Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default EditGameModal;
