import React, { Component } from "react";
import { getById, updateById } from "../Tools/HttpCalls";
import AddField from "./AddField";
import { Button, Alert } from "reactstrap";

class EditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: {
                name: 'some name',
                done: false
            }
        }
    }

    componentDidMount() {
        this.getSpecific(this.props.match.params.id)
    }

    getSpecific = id => {
        getById(id)
            .then(response => {
                this.setState({
                    todo: response.data[0]
                })
            })
    }

    updateTask = () => {
        updateById(this.state.todo._id,
            {
                todo: this.state.todo.name,
                done: this.state.todo.done
            }
        )
            .then(() => {
                this.goToHome()
            })
    }

    goToHome = () => {
        this.props.history.push('/')
    }

    handleChange = (e) => {
        this.setState({
            todo: {
                ...this.state.todo,
                name: e.target.value
            }
        })
    }

    dateToReadable = (dateString) => {
        let pattern = /\d{4}-\d{2}-\d{2}/
        return pattern.exec(dateString)
    }

    timeToReadable = (timeString) => {
        let pattern = /\d\d:\d\d/
        return pattern.exec(timeString)
    }

    render() {
        return (
            <div>
                <h1>Edit task</h1>
                <div className='part'>
                    <div className='input-field'>
                        <div>
                            <AddField
                                onValueChange={this.handleChange}
                                value={this.state.todo.name}
                            />
                        </div>
                        <div>
                            <Button onClick={this.updateTask} color='primary'>Save</Button>
                        </div>
                    </div>
                    <div>
                        <Alert color='info'>
                            <div>
                                This task is {this.state.todo.done ? 'done!' : 'not done...'}
                            </div>
                            <div>
                                Created: {this.dateToReadable(this.state.todo.created)} {this.timeToReadable(this.state.todo.created)} {' | '}
                                Updated: {this.dateToReadable(this.state.todo.updated)} {this.timeToReadable(this.state.todo.updated)}
                            </div>
                        </Alert>
                    </div>
                </div>
                <Button onClick={() => this.goToHome()} color='primary'>Back</Button>
            </div>
        )
    }
}

export default EditPage