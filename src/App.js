import React, { Component } from 'react';
import './App.css';
import FormStructured from "./FormStructured";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slides from "./Slides"
import Button from "react-bootstrap/Button";
import FormGeneral from "./FormGeneral";
import axios from "axios";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            query:''
        };

        this.requestData = this.requestData.bind(this);
        this.getQuery = this.getQuery.bind(this);
        this.sendDataRequest = this.sendDataRequest.bind(this)
    }

    requestData(){
        if(this.state.query){
            axios.get('http://localhost:8080/jsonrequest', {
                params: {
                    ID: this.state.query
                }
            })
                .then(function (response) {
                    //console.log("JSON response: " + JSON.stringify(response));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    getQuery(fullQuery){
        this.setState({
            query: fullQuery
        });
        console.log('This is the query string \n' + this.state.query);
    }

    sendDataRequest(){
        //console.log(this.state.query);
    }

    render() {
        return (
            <div className="App">
                <Container fluid='true'>
                    <Row>
                        <Col xs={4}>
                            <Row>
                                <FormStructured getQuery={this.getQuery}/>
                            </Row>
                            <Row>
                                <Col>
                                    <hr/>
                                </Col>
                            </Row>
                            <Row>
                                <FormGeneral getQuery={this.getQuery}/>
                            </Row>
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
