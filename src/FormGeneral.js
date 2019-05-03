import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default class FormGeneral extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query:''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.setQuery = this.setQuery.bind(this)
    }

    handleInputChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    setQuery(){
        this.props.getQuery(this.state.query)
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form.Group controlId="textAreaGroup">
                            <Form.Label>Free form query</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="query"
                                rows="5"
                                placeholder="Enter query"
                                value = {this.state.query}
                                onChange = {this.handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="outline-secondary"
                            id="sendRequestButton"
                            name="sendRequest"
                            onClick={this.setQuery}
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}