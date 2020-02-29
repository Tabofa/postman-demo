import React, { Component } from "react";
import { Table, Button, ButtonGroup } from "reactstrap";
import { getAll, markAsDone, createNew, deleteById } from "../Tools/HttpCalls";
import AddField from "./AddField";

class ContentTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            errorInfo: null,
            todos: [],
            input: '',
        }
    }

    getAll = () => {
        getAll()
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
    }

    handleAdd = () => {
        createNew(this.state.input)
            .then((response) => {
                this.getAll()
            })
            this.setState({
                input: ''
            })
    }

    toggleDone = (id, done) => {
        markAsDone(id, done)
            .then(() => {
                this.getAll()
            })
    }

    componentDidMount() {
        this.getAll()
        .then(response => response.json())
        .then(data => {
            this.setState(data)
        })
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleDelete = (id) => {
        deleteById(id)
            .then(() => {
                this.getAll()
            })
    }

    goToUrl = id => {
        this.props.history.push('/edit/' + id)
    }

    generateTable = (data) => {
        return (
            <Table className='table'>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th className='actions'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td className='not-done'>{item.name}</td>
                                <td className='actions'>
                                    <ButtonGroup>
                                        <Button color="danger" size="sm" onClick={() => this.handleDelete(item._id)}>Delete</Button>
                                        <Button color='warning' size='sm' onClick={() => this.goToUrl(item._id)}>Edit</Button>
                                        <Button color={item.done ? 'info' : 'success'} size="sm" onClick={() => this.toggleDone(item._id, item.done)}>{item.done ? 'Not done' : 'Done'}</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    isDone = (data) => {
        let value = {
            done: [],
            notDone: []
        }

        data.forEach(e => {
            return (e.done ? value.done.push(e) : value.notDone.push(e))
        })
        return value
    }

    render() {
        let data = this.isDone(this.state.todos)

        return (
            <div>
                <h1>Todo demo-app</h1>
                <div className='part'>
                    {this.state.error ? this.state.errorInfo : ''}
                    <div className='input-field'>
                        <AddField
                            value={this.state.input}
                            onValueChange={this.handleChange}
                        />
                        <div>
                            <Button onClick={() => this.handleAdd()} color='primary'>Add</Button>
                        </div>
                    </div>

                    <div className='part'>
                        <h4>Ongoing tasks</h4>
                        {this.generateTable(data.notDone)}
                    </div>

                    <div className='part'>
                        <h4>Completed tasks</h4>
                        {this.generateTable(data.done)}
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentTable