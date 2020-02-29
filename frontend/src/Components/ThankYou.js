import React, { Component } from "react";

class ThankYou extends Component {
    componentDidMount = () => {
        setTimeout(() => {
            this.props.history.push('/')
        }, 5000)
    }

    render() {
        return(
            <div>
                <h1>Thank you!</h1>
                <p>
                    Thank you for taking the time to send feedback! This will help me greatly in the future :)
                </p>
                <p>
                    You will be automatically redirected back to the start page
                </p>
            </div>
        )
    }
}

export default ThankYou