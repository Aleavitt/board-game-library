import React, { Component } from "react";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";

class TagList extends Component {
  render() {
    return (
      <div className="tagContainer">
        <FormGroup
          style={{ width: "100%", textAlign: "center", color: "white" }}
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
                id={"tagListCheck" + tag}
                onChange={this.props.handleTagChange}
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
    );
  }
}

export default TagList;
