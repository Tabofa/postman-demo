import React, { Component } from "react";
import { viewFeedback } from "../Tools/HttpCalls";

class ViewFeedback extends Component {

    constructor(props) {
        super(props)
        this.state = {
            feedback: []
        }
    }
    componentDidMount = () => {
        viewFeedback()
            .then(response => {
                this.setState({
                    feedback: response.data
                })
            })
    }

    renderFeedback = () => {
        return this.state.feedback.map((item, i) => {
            return (<div key={i}>{item.question}: {item.answer}</div>)
        })
    }

    render() {
        return (
            <div className='table'>
                <h1>View feedback</h1>
                {this.state.feedback.map((question, i) => {
                    return (<div key={i}>{question._id}
                    <ul>
                            {question.answers.map((answer, i) => {
                                return (<li key={i}>{answer.answer} {answer.count}</li>)
                            })}
                        </ul>
                    </div>)
                })}
            </div>

        )
    }
}

export default ViewFeedback