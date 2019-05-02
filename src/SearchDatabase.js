import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/es/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

export default class SearchDatabase extends Component{

    constructor(props){
        super(props)
        this.state = {
            value: '',
            valuemeasure: '',
            gammavalue: '',
            gammas: [],
            sigmavalue: '',
            sigmas: [],
            sigmavalue2: '',
            query:''
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectMeasure = this.handleSelectMeasure.bind(this)
        this.handleChangeMeasure = this.handleChangeMeasure.bind(this)

        this.handleChangeGamma = this.handleChangeGamma.bind(this)
        this.handleSelectGamma = this.handleSelectGamma.bind(this)
        this.addItemToList = this.addItemToList.bind(this)
        this.deleteItemFromList = this.deleteItemFromList.bind(this)

        this.handleChangeSigma = this.handleChangeSigma.bind(this)
        this.handleChangeSigma2 = this.handleChangeSigma2.bind(this)
        this.handleSelectSigma = this.handleSelectSigma.bind(this)
        this.addItemToListSigma = this.addItemToListSigma.bind(this)
        this.deleteItemFromListSigma = this.deleteItemFromListSigma.bind(this)

        this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
        this.requestData = this.requestData.bind(this)

    }

    queryConstruction(eventKey){
        //console.log(eventKey.currentTarget.textContent)
    }

    handleSelect(event){
        this.setState({value: event})
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    handleSelectMeasure(event){
        this.setState({valuemeasure: event})
    }

    handleChangeMeasure(event){
        this.setState({valuemeasure: event.target.value})
    }

    handleSelectGamma(event){
        this.setState({gammavalue: event})
    }

    handleChangeGamma(event){
        this.setState({gammavalue: event.target.value})
    }

    addItemToList(event){
        let newStateArray = [...this.state.gammas];
        newStateArray.push(this.state.gammavalue);
        this.setState(() => {
            return {
                gammas: newStateArray
            };
        });
    }

    deleteItemFromList(event,index){
        let prevStateArray = [...this.state.gammas];

        if(index!==-1){
            prevStateArray.splice(index,1)
            this.setState(() => {
                return {
                    gammas: prevStateArray
                };
            });
        }
    }

    renderListItems(){
       return(this.state.gammas.map((gamma,index)  =>
           <ListGroup.Item
               key={index}
               value={gamma}
               onClick={(event) => this.deleteItemFromList(event,index)}
           > {gamma}
           </ListGroup.Item>
       ))
    }

    handleSelectSigma(event){
        this.setState({sigmavalue: event})
    }

    handleChangeSigma(event){
        this.setState({sigmavalue: event.target.value})
    }

    handleChangeSigma2(event){
        this.setState({sigmavalue2: event.target.value})
    }

    addItemToListSigma(event){
        var newStateArray = [...this.state.sigmas];
        newStateArray.push(this.state.sigmavalue);
        this.setState(() => {
            return {
                sigmas: newStateArray
            };
        });
    }

    deleteItemFromListSigma(event,index){
        var prevStateArray = [...this.state.sigmas];

        if(index!==-1){
            prevStateArray.splice(index,1)
            this.setState(() => {
                return {
                    sigmas: prevStateArray
                };
            });
        }
    }

    renderListItemsSigma(){
        return(this.state.sigmas.map((sigma,index)  =>
            <ListGroup.Item
                key={index}
                value={sigma}
                onClick={(event) => this.deleteItemFromListSigma(event,index)}
            > {sigma}
            </ListGroup.Item>
        ))
    }

    handleTextAreaChange(event){
        this.setState({query: event.target.value})
    }

    requestData(){
        axios.get('http://localhost:8080/goodbyeson', {
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

    render(){

        const render = this.renderListItems()
        const render2 = this.renderListItemsSigma()

        return (
            <Container>
                <Container>
                    <Row>
                        <Col>
                            <InputGroup className="namegroup">
                                <FormControl
                                    id="input-group-form-1"
                                    placeholder="Cube Name"
                                />
                                    <FormControl
                                        id="input-group-form-2"
                                        placeholder="Name"
                                    />

                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="functiondropdown">
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title="Function"
                                    id="input-group-dropdown-1"
                                    onSelect={this.handleSelect}
                                >
                                    <Dropdown.Item eventKey="Average">Average</Dropdown.Item>
                                    <Dropdown.Item eventKey="Percentage">Percentage</Dropdown.Item>
                                </DropdownButton>

                                <FormControl
                                    id="input-group-form-3"
                                    onChange={this.handleChange}
                                    value = {this.state.value}
                                    placeholder="Enter aggregate function"
                                />
                            </InputGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="measuredropdown">
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title="Measure"
                                    id="input-group-dropdown-2"
                                    onSelect={this.handleSelectMeasure}
                                >
                                    <Dropdown.Item eventKey="Amount">Amount</Dropdown.Item>
                                    <Dropdown.Item eventKey="Placeholder">Placeholder</Dropdown.Item>
                                </DropdownButton>

                                <FormControl
                                    id="input-group-form-4"
                                    onChange={this.handleChangeMeasure}
                                    value = {this.state.valuemeasure}
                                    placeholder="Enter measure"
                                />

                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="gammadropdown">
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title="Gamma"
                                    id="input-group-dropdown-3"
                                    onSelect={this.handleSelectGamma}
                                >
                                    <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
                                    <Dropdown.Item eventKey="Account">Account</Dropdown.Item>
                                </DropdownButton>

                                <FormControl
                                    id="input-group-form-4"
                                    onChange={this.handleChangeGamma}
                                    value = {this.state.gammavalue}

                                />

                                <InputGroup.Append>
                                    <Form.Control as="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </Form.Control>
                                    <Button
                                        variant="outline-secondary"
                                        id="addbutton"
                                        onClick={this.addItemToList}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col><ListGroup>
                            {render}
                        </ListGroup></Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="sigmadropdown">
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title="Sigma"
                                    id="input-group-dropdown-4"
                                    onSelect={this.handleSelectSigma}
                                >
                                    <Dropdown.Item eventKey="Status">Status</Dropdown.Item>
                                    <Dropdown.Item eventKey="Account">Account</Dropdown.Item>
                                </DropdownButton>
                                <FormControl
                                    id="input-group-form-5"
                                    onChange={this.handleChangeSigma}
                                    value = {this.state.sigmavalue}
                                />
                                <InputGroup.Append>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Form.Control>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className='sigma2dropdown'>
                                <FormControl
                                    id="input-group-form-5"
                                    placeholder="Add field"
                                    onChange={this.handleChangeSigma2}
                                    value = {this.state.sigmavalue2}
                                />
                                <InputGroup.Append>
                                    <Form.Control as="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </Form.Control>
                                    <Button
                                        variant="outline-secondary"
                                        id="addbuttonsigma"
                                        onClick={this.addItemToListSigma}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ListGroup>
                                {render2}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <hr/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group controlId="ControlTextarea1">
                                <Form.Label>Free form query</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    placeholder="Enter query"
                                    value = {this.state.query}
                                    onChange = {this.handleTextAreaChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant="outline-secondary"
                                id="axiosbutton"
                                onClick={this.requestData}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Container>



            );
    }
}