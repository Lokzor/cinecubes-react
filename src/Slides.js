import React, { Component } from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import './App.css';

export default class Slides extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: require('./Inputfiles/loan3A')
        }

        this.createTabs = this.createTabs.bind(this)
        this.generateTabBody = this.generateTabBody.bind(this)
        this.generateTable = this.generateTable.bind(this)

    }

    generateTable(table){

        let columns = []

        for(let i=0; i<table.length; i++){
            columns.push(Object.keys((table)[i]))
        }

        return (null)

    }

    generateTabBody(title, subtitle, notes , table){
        return (
            <Card>
            <Card.Body>
                <Card.Header as="h5">{title}</Card.Header>
                <Card.Text>
                        {
                            (table)?
                                //this.generateTable(table)
                                "Here goes the data table"
                                :
                                subtitle
                        }
                </Card.Text>
                <Card.Footer className="text-muted">{notes}</Card.Footer>
            </Card.Body>
            </Card>
        )
    }

    createTabs(){
        let arr = []
        let data = this.state.data

        Object.keys(data).sort().map((key) => {
            arr.push(data[key]);
        });

        return (
            arr.map((key,i) => key.hasOwnProperty('Notes') ? (
                    <Tab key={i} eventKey={i} title={key.Title}> {this.generateTabBody(key.Title,key.Subtitle,key.Notes,key.Table)}</Tab>
                ) : null
            )
        )
    }

    render(){
            return (
                <Tabs defaultActiveKey="0" id="uncontrolled-tab-example">
                    {this.createTabs()}
                </Tabs>
            );
    }
}