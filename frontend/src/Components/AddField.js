import React, { Component } from 'react'
import { Input } from "reactstrap";


class AddField extends Component {
    render() {
        return (
            <Input
                onChange={(event) => { this.props.onValueChange(event) }}
                value={this.props.value}
                placeholder='Write something'
            />
        )
    }
}

export default AddField