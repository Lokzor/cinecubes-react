import React, { Component } from 'react';
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

export default class FormStructured extends Component{

    constructor(props){
        super(props);
        this.state = {
            cubeName: '',
            name: '',
            functionName: '',
            measureName: '',
            gammaTableName: '',
            gammaTableLevel: 'lvl',
            gammas: [],
            sigmaTableName: '',
            sigmaTableLevel: 'lvl',
            sigmas: [],
            sigmaCellName: '',
            sigmaCellLevel: 'lvl',
            query:''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownMenuSelection = this.handleDropdownMenuSelection.bind(this);
        this.addItemToList = this.addItemToList.bind(this);
        this.deleteItemFromList = this.deleteItemFromList.bind(this);
        this.createQueryString = this.createQueryString.bind(this);
        this.setQuery = this.setQuery.bind(this);
    }

    handleInputChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleDropdownMenuSelection(event, fieldName){
        this.setState({ [fieldName] : event})
    }

    addItemToList(event, tableName, tableLevel, cellName, table){
        let newStateList = this.state[table];
        let value = '';
        if(cellName){
            value = this.state[tableName] + ' lvl:' + this.state[tableLevel] + "='" + this.state[cellName] + "'";
            console.log(value)
        }
        else{
            value = this.state[tableName] + ' lvl:' + this.state[tableLevel];
            console.log(value)
        }
        newStateList.push(value);
        this.setState(() => {
            return {
                [table]: newStateList
            };
        });
    }

    renderListItems(event, listName){
        return(this.state[listName].map((row,index)  =>
            <ListGroup.Item
                key={index}
                value={row}
                onClick={(event) => this.deleteItemFromList(event,index,listName)}
            > {row}
            </ListGroup.Item>
        ))
    }

    deleteItemFromList(event, index, listName){
        let prevStateList = this.state[listName];

        if(index!==-1){
            prevStateList.splice(index,1);
            this.setState(() => {
                return {
                    [listName]: prevStateList
                };
            });
        }
    }

    createQueryString(){
        if (this.state.cubeName &&
            this.state.name &&
            this.state.functionName &&
            this.state.measureName &&
            this.state.gammas &&
            this.state.sigmas) {

            //todo Refactoring
            let gammaQueryClause = this.state.gammas.map((entry) => {
                entry = entry.toLowerCase();
                let split = entry.split(" ");
                let concacated = split[0] + "_dim" + "." + split[1].replace(/:/g,"");
                return concacated
            });

            let sigmaQueryClause = this.state.sigmas.map((entry) => {
                entry = entry.toLowerCase();
                let split = entry.split(" ");
                let concacated = split[0] + "_dim" + "." + split[1].replace(/:/g,"");
                return concacated
            });

            this.setState({
                query:
                    ("Cubaname:" + this.state.cubeName + "\n" +
                        "Name:" + this.state.name + "\n" +
                        "AggrFunc:" + this.state.functionName + "\n" +
                        "Measure:" + this.state.measureName.toLowerCase() + "\n" +
                        "Gamma:" + gammaQueryClause.join(",")  + "\n" +
                        "Sigma:" + sigmaQueryClause.join(",") + "\n")
            });
        }
        else{
            console.log("error while creating query")
        }
    }

    setQuery(){
        this.createQueryString();
        if(this.state.query)
            this.props.getQuery(this.state.query)
    }

    render(){

        return (
            <Container>
                <Row>
                    <Col>
                        <InputGroup className="cubeNameTextFieldGroup">
                            <FormControl
                                id="cubeNameTextField"
                                name="cubeName"
                                placeholder="Enter cube name"
                                value = {this.state.cubeName}
                                onChange={this.handleInputChange}
                            />
                            <FormControl
                                id="nameTextField"
                                name="name"
                                placeholder="Enter name"
                                value = {this.state.name}
                                onChange={this.handleInputChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className="functionFieldGroup">
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="Function"
                                id="functionDropdownMenu"
                                onSelect={(event) =>this.handleDropdownMenuSelection(event, 'functionName')}
                            >
                                <Dropdown.Item eventKey="Average">Average</Dropdown.Item>
                                <Dropdown.Item eventKey="Placeholder">Percentage</Dropdown.Item>
                            </DropdownButton>

                            <FormControl
                                id="functionNameTextField"
                                name="functionName"
                                placeholder="Enter aggregate function"
                                value = {this.state.functionName}
                                onChange={this.handleInputChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className="measureFieldGroup">
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="Measure"
                                id="measureDropdownMenu"
                                onSelect={(event) =>this.handleDropdownMenuSelection(event, 'measureName')}
                            >
                                <Dropdown.Item eventKey="Amount">Amount</Dropdown.Item>
                                <Dropdown.Item eventKey="Placeholder">Placeholder</Dropdown.Item>
                            </DropdownButton>

                            <FormControl
                                id="measureNameTextField"
                                name="measureName"
                                placeholder="Enter measure"
                                value = {this.state.measureName}
                                onChange={this.handleInputChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className="gammaFieldGroup">
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="Gamma"
                                id="gammaDropdownMenu"
                                onSelect={(event) =>this.handleDropdownMenuSelection(event, 'gammaTableName')}
                            >
                                <Dropdown.Item eventKey="Account">Account</Dropdown.Item>
                                <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
                                <Dropdown.Item eventKey="Placeholder">Placeholder</Dropdown.Item>
                            </DropdownButton>

                            <FormControl
                                id="gammaArrayNameTextField"
                                name="gammaTableName"
                                placeholder="Enter table name"
                                onChange={this.handleInputChange}
                                value = {this.state.gammaTableName}
                            />

                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={this.state.gammaTableLevel}
                                id="gammaDropdownLevelMenu"
                                onSelect={(event) =>this.handleDropdownMenuSelection(event, 'gammaTableLevel')}
                            >
                                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            </DropdownButton>

                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    id="addGammaTable"
                                    onClick={(event) =>this.addItemToList(event, 'gammaTableName', 'gammaTableLevel', null , 'gammas')}
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
                            {((event) => this.renderListItems(event,'gammas'))()}
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className="sigmaTableFieldGroup">
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="Sigma"
                                id="sigmaTableName"
                                onSelect={(event) =>this.handleDropdownMenuSelection(event, 'sigmaTableName')}
                            >
                                <Dropdown.Item eventKey="Account">Account</Dropdown.Item>
                                <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
                                <Dropdown.Item eventKey="Status">Status</Dropdown.Item>
                                <Dropdown.Item eventKey="Placeholder">Placeholder</Dropdown.Item>
                            </DropdownButton>

                            <FormControl
                                id="sigmaArrayNameTextField"
                                name="sigmaTableName"
                                placeholder="Enter table name"
                                value = {this.state.sigmaTableName}
                                onChange={this.handleInputChange}

                            />
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={this.state.sigmaTableLevel}
                                id="sigmaDropdownTableLevelMenu"
                                onSelect={(event) =>this.handleDropdownMenuSelection(event, 'sigmaTableLevel')}
                            >
                                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className='sigmaCellFieldGroup'>
                            <FormControl
                                id="sigmaCellNameTextField"
                                name="sigmaCellName"
                                placeholder="Enter cell name"
                                onChange={this.handleInputChange}
                                value = {this.state.sigmaCellName}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    id="addSigmaTable"
                                    onClick={(event) =>this.addItemToList(event, 'sigmaTableName', 'sigmaTableLevel', 'sigmaCellName' , 'sigmas')}
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
                            {((event) => this.renderListItems(event,'sigmas'))()}
                        </ListGroup>
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