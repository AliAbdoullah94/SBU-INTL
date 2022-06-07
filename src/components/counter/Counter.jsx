import { Component } from "react";
import './Counter.css'
import PropTypes from 'prop-types';

class Counter extends Component {

    constructor(props) {
        super();

        this.state = {
            counter: 0
        }

        //this.increment = this.increment.bind(this);
    }

    render() {
        return (
            <div className="Counter">
                <div className="child">
                    <CounterButton op="+" by={1} editMethod={this.edit} />
                    <CounterButton op="-" by={1} editMethod={this.edit} />
                </div>
                <div className="child">
                    <CounterButton op="+" by={10} editMethod={this.edit} />
                    <CounterButton op="-" by={10} editMethod={this.edit} />
                </div>
                <div className="child">
                    <CounterButton op="+" by={5} editMethod={this.edit} />
                    <CounterButton op="-" by={5} editMethod={this.edit} />

                </div>
                <span className="count">{this.state.counter}</span>
            </div>
        );
    }

    edit = (by, op) => {
        if (op == "+") {
            this.setState(
                (prevState) => {
                    return { counter: prevState.counter + by }
                })
        }
        else {
            this.setState(
                (prevState) => {
                    return { counter: prevState.counter - by }
                }
            )
        }

    }
}

class CounterButton extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="Counter">
                <button onClick={this.edit}>{this.props.op}{this.props.by}</button>
            </div>
        )
    }

    edit = () => {
        console.log("edit");
        this.props.editMethod(this.props.by, this.props.op);
    }

}

CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}
export default Counter;