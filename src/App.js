import React, { Component } from 'react';
import './App.css';
import SearchDatabase from "./SearchDatabase";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slides from "./Slides"

class App extends Component {

    render() {
        return (
            <div className="App">
                <Container fluid='true'>
                    <Row>
                        <Col xs={4}>
                            <SearchDatabase/>
                        </Col>
                        <Col>
                            <Slides/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
