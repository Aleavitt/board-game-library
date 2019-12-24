import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import AddGameModal from "./addGameModal";
import InputGroup from "react-bootstrap/InputGroup";
import TagList from "./tagList";
//Stateless Functional Component - These don't ahve props by default. They are a parameter
// Can not use lifecycle hooks in Stateless Functional Components

class BGNavbar extends Component {
  state = { addTagInput: "" };
  handleTagChange = event => {
    event.target.setAttribute("checked", true);
  };
  render() {
    const {
      userId,
      handleFormChange,
      saveGame,
      games,
      onHide,
      setAddGameModalShow,
      handleSearchInput
    } = this.props;

    return (
      <Navbar collapseOnSelect expand="false" className="navbar bg-dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Accordion style={{ width: "calc(100% - 60px)" }}>
          <Accordion.Toggle
            className="m-2"
            as={Button}
            variant="primary"
            style={{ width: "100%" }}
            eventKey="0"
          >
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Search"
                onKeyUp={handleSearchInput}
                style={{ width: "100%" }}
              />
            </Form>
          </Accordion.Toggle>
          <Accordion.Collapse style={{ width: "100%" }} eventKey="0">
            <div className="accordion-collapse-wrapper">
              <TagList
                userTags={this.props.userTags}
                handleTagChange={this.props.handleTagSearch}
                game={{}}
              />
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="mr-auto">
            <Button
              className="m-2"
              variant="primary"
              onClick={this.props.addGame}
              style={{ width: "100%" }}
            >
              Add Game
            </Button>
            <Accordion>
              <Accordion.Toggle
                className="m-2"
                as={Button}
                variant="primary"
                style={{ width: "100%" }}
                eventKey="0"
              >
                Manage Tags
              </Accordion.Toggle>
              <Accordion.Collapse style={{ width: "100%" }} eventKey="0">
                <div className="accordion-collapse-wrapper">
                  <InputGroup className="m-2">
                    <Form.Control
                      type="text"
                      placeholder="Tag Name..."
                      onChange={event => {
                        this.setState({ addTagInput: event.target.value });
                      }}
                    />
                    <InputGroup.Append>
                      <Button
                        type="submit"
                        onClick={event =>
                          this.props.addTag(this.state.addTagInput)
                        }
                      >
                        Create
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <TagList
                    userTags={this.props.userTags}
                    handleTagChange={this.handleTagChange}
                    game={{}}
                  />
                </div>
              </Accordion.Collapse>
            </Accordion>
            <Button
              className="btn-danger btn float-left m-2"
              onClick={this.props.handleLogout}
              style={{ width: "100%" }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>

        <AddGameModal
          setAddGameModalShow={setAddGameModalShow}
          onHide={onHide}
          userId={userId}
          handleFormChange={handleFormChange}
          saveGame={saveGame}
          games={games}
        />
      </Navbar>
    );
  }
}

export default BGNavbar;
