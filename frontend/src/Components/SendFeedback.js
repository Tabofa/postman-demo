import React, { Component } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { sendFeedback } from "../Tools/HttpCalls";

class SendFeedback extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            question: []
        }
    }

    sendFeedback = () => {
        sendFeedback(this.state.question)
        this.props.history.push('/thankyou')
    }

    onChange = (e) => {
        let incommingAnswer = {
            question: e.target.name,
            answer: e.target.value
        }

        let stateQuestions = this.state.question

        for(let i = 0; i < stateQuestions.length; i++) {
            if(stateQuestions[i].question === incommingAnswer.question) {
                stateQuestions.splice(i)
            }
        }
        stateQuestions.push(incommingAnswer)
        this.setState({
            ...this.state,
            question: [...stateQuestions]
        })
    }

    question = (questionName, legend, questions) => {
        return(
            <FormGroup tag="fieldset" className='table'>
                <legend>{legend}</legend>
                        {questions.map((item,i) => {
                            return(
                                <FormGroup check key={i}>
                                    <Label check>
                                        <Input type="radio" name={legend} value={item} onChange={(e) => this.onChange(e)} /> {item}
                                    </Label>
                                </FormGroup>    
                            )
                        })}
            </FormGroup>
        )
    }

    render() {
        return(
            <div>
                <h1>This is the feedback section</h1>

                {this.question('content', 'What did you think about the content?', ['Easy to understand', 'Difficult to understand'])}

                {this.question('difficulty', 'What did you think about the level of difficulty?', ['Too difficult', 'Just right', 'Too easy'])}

                {this.question('practical', 'What did you think about the practical elements?', ['Too difficult', 'Just right', 'Too easy'])}

                <FormGroup>
                    <legend className='table'>Anything you want to add?</legend>
                    <Input type="textarea" name="Anything you want to add?" rows={10} onChange={(e) => this.onChange(e)} />
                </FormGroup>

                <Button color='primary' onClick={() => this.sendFeedback()}>Submit feedback</Button>

            </div>
        )
    }
}

export default SendFeedback